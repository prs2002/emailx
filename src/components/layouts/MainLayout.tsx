import { useAuth } from '@/contexts/AuthContext';
import Dashboard from '@/components/pages/Dashboard';
import LoginPage from '@/components/pages/LoginPage';
import Navbar from '@/components/navigation/Navbar';
import Loading from '@/components/ui/loading';

export default function MainLayout() {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loading />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container py-6 max-w-6xl">
        {isAuthenticated ? <Dashboard /> : <LoginPage />}
      </main>
    </div>
  );
}