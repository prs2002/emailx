import { useAuth } from '@/contexts/AuthContext';
import Dashboard from '@/components/pages/Dashboard';
import LoginPage from '@/components/pages/LoginPage';
import Loading from '@/components/ui/loading';

export default function HomePage() {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loading />
      </div>
    );
  }

  return isAuthenticated ? <Dashboard /> : <LoginPage />;
}