import { EmailData } from '@/types/email';

export async function GET(request: Request) {
  try {
    // This is a mock implementation. In a real app, you would:
    // 1. Get the user's access token from the request
    // 2. Use it to fetch emails from Gmail API
    // 3. Return the actual emails
    const mockEmails: EmailData[] = Array.from({ length: 15 }, (_, i) => ({
      id: `email-${i}`,
      from: `sender${i}@example.com`,
      to: 'user@example.com',
      subject: `Email Subject ${i}`,
      body: `This is the body of email ${i}. It contains some sample text to demonstrate how the email would look in the application.`,
      date: new Date(Date.now() - i * 3600000).toISOString(),
      isRead: Math.random() > 0.5,
      category: 'uncategorized',
    }));

    return new Response(JSON.stringify(mockEmails), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to fetch emails' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}