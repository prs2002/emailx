import { EmailData } from '@/types/email';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { formatDistanceToNow } from 'date-fns';

interface EmailListProps {
  emails: EmailData[];
  onSelectEmail: (email: EmailData) => void;
  selectedEmailId: string | undefined;
}

export default function EmailList({
  emails,
  onSelectEmail,
  selectedEmailId,
}: EmailListProps) {
  // Get unique categories
  const categories = Array.from(
    new Set(emails.map((email) => email.category))
  );

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'important':
        return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300';
      case 'promotional':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300';
      case 'social':
        return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300';
      case 'marketing':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-300';
      case 'spam':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300';
    }
  };

  return (
    <div className="border rounded-lg overflow-hidden">
      <ScrollArea className="h-[calc(100vh-20rem)]">
        <div className="space-y-2 p-2">
          {categories.map((category) => (
            <div key={category} className="space-y-1">
              <div className="sticky top-0 bg-background z-10 px-2 py-1 border-b">
                <Badge variant="outline" className={getCategoryColor(category)}>
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </Badge>
              </div>

              {emails
                .filter((email) => email.category === category)
                .map((email) => (
                  <div
                    key={email.id}
                    className={cn(
                      'flex flex-col px-4 py-3 rounded-md cursor-pointer transition-colors',
                      selectedEmailId === email.id
                        ? 'bg-primary/10'
                        : 'hover:bg-muted',
                      !email.isRead && 'font-semibold'
                    )}
                    onClick={() => onSelectEmail(email)}
                  >
                    <div className="flex justify-between items-start mb-1">
                      <span className="font-medium truncate">
                        {email.from.split('@')[0]}
                      </span>
                      <span className="text-xs text-muted-foreground whitespace-nowrap ml-2">
                        {formatDistanceToNow(new Date(email.date), {
                          addSuffix: true,
                        })}
                      </span>
                    </div>
                    <span className="text-sm truncate">{email.subject}</span>
                    <span className="text-xs text-muted-foreground truncate mt-1">
                      {email.body.substring(0, 60)}...
                    </span>
                  </div>
                ))}
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}