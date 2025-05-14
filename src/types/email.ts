export interface EmailData {
  id: string;
  from: string;
  to: string;
  subject: string;
  body: string;
  date: string;
  isRead: boolean;
  category: 'important' | 'promotional' | 'social' | 'marketing' | 'spam' | 'uncategorized';
}