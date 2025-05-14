import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { toast } from '@/hooks/use-toast';

type User = {
  name: string;
  email: string;
  picture: string;
  accessToken: string;
};

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  isLoading: boolean;
  openAIKey: string;
  setOpenAIKey: (key: string) => void;
  login: () => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthContextProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [openAIKey, setOpenAIKey] = useState<string>('');

  useEffect(() => {
    // Check if user is already authenticated
    const savedUser = localStorage.getItem('gmail_user');
    const savedOpenAIKey = localStorage.getItem('openai_key');
    
    if (savedUser) {
      setUser(JSON.parse(savedUser));
      setIsAuthenticated(true);
    }
    
    if (savedOpenAIKey) {
      setOpenAIKey(savedOpenAIKey);
    }
    
    setIsLoading(false);
    
    // Load Google API
    loadGoogleAPI();
  }, []);

  const loadGoogleAPI = () => {
    const script = document.createElement('script');
    script.src = 'https://accounts.google.com/gsi/client';
    script.async = true;
    script.defer = true;
    document.head.appendChild(script);
    
    script.onload = () => {
      window.google?.accounts.id.initialize({
        client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID || '',
        callback: handleCredentialResponse,
        scope: 'https://www.googleapis.com/auth/gmail.readonly',
      });
    };
  };

  const handleCredentialResponse = (response: any) => {
    if (response.credential) {
      // Parse the JWT token to get user info
      const base64Url = response.credential.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split('')
          .map(function (c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
          })
          .join('')
      );

      const { name, email, picture } = JSON.parse(jsonPayload);
      
      const user = {
        name,
        email,
        picture,
        accessToken: response.credential,
      };
      
      setUser(user);
      setIsAuthenticated(true);
      localStorage.setItem('gmail_user', JSON.stringify(user));
      
      toast({
        title: 'Logged in successfully',
        description: `Welcome back, ${name}!`,
      });
    }
  };

  const login = () => {
    if (window.google?.accounts.id) {
      window.google.accounts.id.prompt();
    } else {
      toast({
        title: 'Google API not loaded',
        description: 'Please try again in a moment',
        variant: 'destructive',
      });
    }
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('gmail_user');
    toast({
      title: 'Logged out',
      description: 'You have been logged out successfully',
    });
  };

  const updateOpenAIKey = (key: string) => {
    setOpenAIKey(key);
    localStorage.setItem('openai_key', key);
    toast({
      title: 'OpenAI Key Updated',
      description: 'Your OpenAI API key has been saved',
    });
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user,
        isLoading,
        openAIKey,
        setOpenAIKey: updateOpenAIKey,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthContextProvider');
  }
  return context;
};

// Add TypeScript definitions for Google's auth library
declare global {
  interface Window {
    google?: {
      accounts: {
        id: {
          initialize: (config: any) => void;
          prompt: () => void;
          renderButton: (element: HTMLElement, options: any) => void;
        };
      };
    };
  }
}