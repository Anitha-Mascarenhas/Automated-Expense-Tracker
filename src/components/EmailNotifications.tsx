import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Mail, CheckCircle2, Clock } from 'lucide-react';

export interface EmailNotification {
  id: string;
  recipient: string;
  userName: string;
  totalSpent: number;
  categories: { name: string; amount: number }[];
  timestamp: string;
  status: 'sent' | 'pending';
}

interface EmailNotificationsProps {
  emails: EmailNotification[];
}

export default function EmailNotifications({ emails }: EmailNotificationsProps) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Mail className="h-5 w-5" />
              Email Notifications
            </CardTitle>
            <CardDescription>Daily expense reports sent to users</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {emails.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <Mail className="h-12 w-12 mx-auto mb-2 opacity-50" />
              <p>No emails sent yet</p>
            </div>
          ) : (
            emails.map((email) => (
              <div
                key={email.id}
                className="border rounded-lg p-4 space-y-3 hover:bg-accent/50 transition-colors"
              >
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <p className="font-semibold">{email.userName}</p>
                      <Badge variant={email.status === 'sent' ? 'default' : 'secondary'}>
                        {email.status === 'sent' ? (
                          <CheckCircle2 className="h-3 w-3 mr-1" />
                        ) : (
                          <Clock className="h-3 w-3 mr-1" />
                        )}
                        {email.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{email.recipient}</p>
                  </div>
                  <p className="text-xs text-muted-foreground">{email.timestamp}</p>
                </div>

                <div className="bg-muted/50 rounded p-3 space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Total Daily Expense:</span>
                    <span className="text-lg font-bold text-primary">
                      ${email.totalSpent.toFixed(2)}
                    </span>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs font-medium text-muted-foreground">Category Breakdown:</p>
                    {email.categories.map((cat, idx) => (
                      <div key={idx} className="flex justify-between text-sm">
                        <span>{cat.name}</span>
                        <span className="font-medium">${cat.amount.toFixed(2)}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
}