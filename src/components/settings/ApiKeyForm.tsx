import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertCircle } from 'lucide-react';

export default function ApiKeyForm() {
  const { openAIKey, setOpenAIKey } = useAuth();
  const [apiKey, setApiKey] = useState(openAIKey || '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setOpenAIKey(apiKey);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>OpenAI API Key</CardTitle>
        <CardDescription>
          Add your OpenAI API key to enable email classification
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="apiKey">API Key</Label>
              <Input
                id="apiKey"
                type="password"
                placeholder="sk-..."
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
              />
              <p className="text-sm text-muted-foreground flex items-center gap-1">
                <AlertCircle className="h-3 w-3" />
                Your API key is stored locally and is never sent to our servers
              </p>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit">Save API Key</Button>
        </CardFooter>
      </form>
    </Card>
  );
}