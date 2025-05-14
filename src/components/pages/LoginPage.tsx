import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Mail, Shield } from 'lucide-react';

export default function LoginPage() {
  const { login } = useAuth();

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] px-4">
      <div className="flex flex-col items-center mb-8 text-center">
        <Mail className="h-16 w-16 text-primary mb-4" />
        <h1 className="text-4xl font-bold tracking-tight">MailSense</h1>
        <p className="text-xl text-muted-foreground mt-2">
          Intelligent email classification powered by AI
        </p>
      </div>

      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Sign in to your account</CardTitle>
          <CardDescription>
            Connect your Gmail account to get started with email classification
          </CardDescription>
        </CardHeader>
        <CardContent className="flex justify-center">
          <Button onClick={login} size="lg" className="w-full">
            <svg
              className="mr-2 h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="24"
              height="24"
            >
              <path
                fill="currentColor"
                d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5.36 14.8c-1.44.96-3.12 1.2-4.8 1.2-1.68 0-3.36-.24-4.8-1.2-1.44-.96-2.4-2.4-2.4-4.8 0-2.4.96-3.84 2.4-4.8 1.44-.96 3.12-1.2 4.8-1.2 1.68 0 3.36.24 4.8 1.2 1.44.96 2.4 2.4 2.4 4.8 0 2.4-.96 3.84-2.4 4.8z"
              />
              <path
                fill="currentColor"
                d="M6.4 13.6h2.4v-2.4H6.4v2.4zm4.8 0h2.4v-2.4h-2.4v2.4zm4.8 0h2.4v-2.4h-2.4v2.4z"
              />
            </svg>
            Sign in with Google
          </Button>
        </CardContent>
        <CardFooter className="justify-center flex-col text-center text-sm text-muted-foreground">
          <div className="flex items-center justify-center mb-2">
            <Shield className="h-4 w-4 mr-1" />
            <span>We only request read access to your emails</span>
          </div>
          <p>Your data remains private and is stored only on your device</p>
        </CardFooter>
      </Card>
    </div>
  );
}