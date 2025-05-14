import { ThemeProvider } from '@/components/ThemeProvider';
import { EmailContextProvider } from '@/contexts/EmailContext';
import { AuthContextProvider } from '@/contexts/AuthContext';
import { Toaster } from '@/components/ui/toaster';
import Navbar from '@/components/navigation/Navbar';

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <ThemeProvider defaultTheme="system" storageKey="ui-theme">
      <AuthContextProvider>
        <EmailContextProvider>
          <div className="min-h-screen bg-background">
            <Navbar />
            <main className="container py-6 max-w-6xl">
              {children}
            </main>
            <Toaster />
          </div>
        </EmailContextProvider>
      </AuthContextProvider>
    </ThemeProvider>
  );
}