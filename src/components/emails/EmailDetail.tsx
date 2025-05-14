import { EmailData } from '@/types/email';
import { Badge } from '@/components/ui/badge';
import { formatDate } from '@/lib/format';
import { getCategoryColor } from '@/lib/email-utils';

interface EmailDetailProps {
  email: EmailData;
}

export default function EmailDetail({ email }: EmailDetailProps) {
  return (
    <div className="border rounded-lg p-6 animate-in fade-in-50 duration-300">
      <div className="flex flex-col space-y-4">
        <div className="flex justify-between items-start">
          <h2 className="text-xl font-bold">{email.subject}</h2>
          <Badge className={getCategoryColor(email.category)}>
            {email.category.charAt(0).toUpperCase() + email.category.slice(1)}
          </Badge>
        </div>

        <div className="flex flex-col space-y-1 text-sm">
          <div className="flex items-center justify-between">
            <div>
              <span className="font-semibold">From:</span> {email.from}
            </div>
            <div className="text-muted-foreground">
              {formatDate(new Date(email.date))}
            </div>
          </div>
          <div>
            <span className="font-semibold">To:</span> {email.to}
          </div>
        </div>

        <div className="pt-4 border-t mt-2">
          <div className="prose dark:prose-invert max-w-none">
            <p>{email.body}</p>
          </div>
        </div>
      </div>
    </div>
  );
}