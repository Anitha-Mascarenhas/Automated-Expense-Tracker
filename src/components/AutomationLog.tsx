import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { CheckCircle2, Clock, AlertCircle, Loader2 } from 'lucide-react';

export interface LogEntry {
  id: string;
  message: string;
  timestamp: string;
  status: 'success' | 'processing' | 'error' | 'info';
}

interface AutomationLogProps {
  logs: LogEntry[];
}

const statusConfig = {
  success: {
    icon: CheckCircle2,
    color: 'text-green-600',
    bgColor: 'bg-green-50',
    badge: 'default' as const,
  },
  processing: {
    icon: Loader2,
    color: 'text-blue-600',
    bgColor: 'bg-blue-50',
    badge: 'secondary' as const,
  },
  error: {
    icon: AlertCircle,
    color: 'text-red-600',
    bgColor: 'bg-red-50',
    badge: 'destructive' as const,
  },
  info: {
    icon: Clock,
    color: 'text-gray-600',
    bgColor: 'bg-gray-50',
    badge: 'outline' as const,
  },
};

export default function AutomationLog({ logs }: AutomationLogProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>UiPath Automation Log</CardTitle>
        <CardDescription>Real-time workflow execution status</CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[400px] pr-4">
          {logs.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <Clock className="h-12 w-12 mx-auto mb-2 opacity-50" />
              <p>No activity yet</p>
              <p className="text-sm mt-1">Upload a file to start automation</p>
            </div>
          ) : (
            <div className="space-y-3">
              {logs.map((log) => {
                const config = statusConfig[log.status];
                const Icon = config.icon;
                return (
                  <div
                    key={log.id}
                    className={`flex items-start gap-3 p-3 rounded-lg ${config.bgColor} border`}
                  >
                    <Icon
                      className={`h-5 w-5 mt-0.5 ${config.color} ${
                        log.status === 'processing' ? 'animate-spin' : ''
                      }`}
                    />
                    <div className="flex-1 space-y-1">
                      <p className="text-sm font-medium">{log.message}</p>
                      <p className="text-xs text-muted-foreground">{log.timestamp}</p>
                    </div>
                    <Badge variant={config.badge} className="text-xs">
                      {log.status}
                    </Badge>
                  </div>
                );
              })}
            </div>
          )}
        </ScrollArea>
      </CardContent>
    </Card>
  );
}