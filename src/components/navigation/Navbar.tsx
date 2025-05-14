import { useAuth } from '@/contexts/AuthContext';
import ThemeToggle from '@/components/ui/theme-toggle';
import UserMenu from '@/components/navigation/UserMenu';
import { Button } from '@/components/ui/button';
import { Mail } from 'lucide-react';

export default function Navbar() {
  const { isAuthenticated, login } = useAuth();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center max-w-6xl">
        <div className="mr-4 flex items-center gap-2">
          <Mail className="h-6 w-6 text-primary" />
          <span className="font-semibold text-xl">MailSense</span>
        </div>
        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="flex items-center space-x-2">
            <ThemeToggle />
            {isAuthenticated ? (
              <UserMenu />
            ) : (
              <Button onClick={login} variant="default">
                Sign In with Google
              </Button>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
}