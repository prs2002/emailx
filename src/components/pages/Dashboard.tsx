import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useEmails } from '@/contexts/EmailContext';
import EmailList from '@/components/emails/EmailList';
import EmailDetail from '@/components/emails/EmailDetail';
import ApiKeyForm from '@/components/settings/ApiKeyForm';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { RefreshCw, AlertCircle } from 'lucide-react';
import Loading from '@/components/ui/loading';
import { EmailData } from '@/types/email';

export default function Dashboard() {
  const { openAIKey } = useAuth();
  const { emails, isLoading, error, fetchEmails, classifyEmails } = useEmails();
  const [selectedEmail, setSelectedEmail] = useState<EmailData | null>(null);

  const handleEmailSelect = (email: EmailData) => {
    setSelectedEmail(email);
  };

  const handleFetchEmails = async () => {
    await fetchEmails();
    setSelectedEmail(null);
  };

  const handleClassifyEmails = async () => {
    await classifyEmails();
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Your Inbox</h1>
          <p className="text-muted-foreground">
            View and classify your recent emails
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            onClick={handleFetchEmails}
            disabled={isLoading}
            variant="outline"
            className="flex items-center gap-2"
          >
            {isLoading ? <Loading size="small" /> : <RefreshCw className="h-4 w-4" />}
            Fetch Emails
          </Button>
          <Button
            onClick={handleClassifyEmails}
            disabled={isLoading || emails.length === 0}
          >
            Classify Emails
          </Button>
        </div>
      </div>

      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {!openAIKey && (
        <Alert className="bg-amber-50 text-amber-900 dark:bg-amber-900/20 dark:text-amber-200">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            Add your OpenAI API key to enable email classification
          </AlertDescription>
        </Alert>
      )}

      <Tabs defaultValue="emails">
        <TabsList>
          <TabsTrigger value="emails">Emails</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>
        <TabsContent value="emails" className="space-y-4">
          {emails.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <Mail className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium">No emails to display</h3>
              <p className="text-muted-foreground mb-4">
                Click the "Fetch Emails" button to get your recent emails
              </p>
              <Button onClick={handleFetchEmails} disabled={isLoading}>
                {isLoading ? <Loading size="small" className="mr-2" /> : null}
                Fetch Emails
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <EmailList
                emails={emails}
                onSelectEmail={handleEmailSelect}
                selectedEmailId={selectedEmail?.id}
              />
              <div className="md:col-span-2">
                {selectedEmail ? (
                  <EmailDetail email={selectedEmail} />
                ) : (
                  <div className="flex flex-col items-center justify-center h-full min-h-[300px] border rounded-lg p-8 text-center">
                    <h3 className="text-lg font-medium">No email selected</h3>
                    <p className="text-muted-foreground">
                      Select an email from the list to view its details
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}
        </TabsContent>
        <TabsContent value="settings">
          <ApiKeyForm />
        </TabsContent>
      </Tabs>
    </div>
  );
}

// Import Mail icon
import { Mail } from 'lucide-react';