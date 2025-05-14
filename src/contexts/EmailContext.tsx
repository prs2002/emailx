import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/hooks/use-toast';
import { EmailData } from '@/types/email';

interface EmailContextType {
  emails: EmailData[];
  isLoading: boolean;
  error: string | null;
  fetchEmails: () => Promise<void>;
  classifyEmails: () => Promise<void>;
}

const EmailContext = createContext<EmailContextType | undefined>(undefined);

export function EmailContextProvider({ children }: { children: ReactNode }) {
  const [emails, setEmails] = useState<EmailData[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const { isAuthenticated, user } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      const cachedEmails = localStorage.getItem('gmail_emails');
      if (cachedEmails) {
        setEmails(JSON.parse(cachedEmails));
      }
    }
  }, [isAuthenticated]);

  const fetchEmails = async () => {
    if (!isAuthenticated || !user) {
      setError('You must be logged in to fetch emails');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/emails');
      if (!response.ok) throw new Error('Failed to fetch emails');
      
      const emails = await response.json();
      setEmails(emails);
      localStorage.setItem('gmail_emails', JSON.stringify(emails));
      
      toast({
        title: 'Emails Fetched',
        description: `Successfully fetched ${emails.length} emails`,
      });
    } catch (err) {
      setError('Failed to fetch emails');
      toast({
        title: 'Error',
        description: 'Failed to fetch emails. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const classifyEmails = async () => {
    if (emails.length === 0) {
      toast({
        title: 'No emails to classify',
        description: 'Please fetch emails first',
        variant: 'destructive',
      });
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/classify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(emails),
      });
      
      if (!response.ok) throw new Error('Failed to classify emails');
      
      const classifiedEmails = await response.json();
      setEmails(classifiedEmails);
      localStorage.setItem('gmail_emails', JSON.stringify(classifiedEmails));
      
      toast({
        title: 'Emails Classified',
        description: 'All emails have been classified successfully',
      });
    } catch (err) {
      setError('Failed to classify emails');
      toast({
        title: 'Error',
        description: 'Failed to classify emails. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <EmailContext.Provider
      value={{
        emails,
        isLoading,
        error,
        fetchEmails,
        classifyEmails,
      }}
    >
      {children}
    </EmailContext.Provider>
  );
}

export const useEmails = () => {
  const context = useContext(EmailContext);
  if (context === undefined) {
    throw new Error('useEmails must be used within an EmailContextProvider');
  }
  return context;
};