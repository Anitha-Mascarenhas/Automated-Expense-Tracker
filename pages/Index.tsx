import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import DashboardMetrics from '@/components/DashboardMetrics';
import EmailNotifications, { EmailNotification } from '@/components/EmailNotifications';
import ExpenseTable, { Expense } from '@/components/ExpenseTable';
import AutomationLog, { LogEntry } from '@/components/AutomationLog';
import FileUpload from '@/components/FileUpload';

const users = [
  { name: 'John Smith', email: 'john.smith@company.com' },
  { name: 'Sarah Johnson', email: 'sarah.johnson@company.com' },
  { name: 'Michael Chen', email: 'michael.chen@company.com' },
];

const categories = ['Food', 'Transportation', 'Shopping', 'Entertainment', 'Utilities', 'Healthcare'];

const descriptions: Record<string, string[]> = {
  Food: ['Starbucks Coffee', 'Subway Lunch', 'Pizza Delivery', 'Grocery Shopping', 'Restaurant Dinner'],
  Transportation: ['Uber Ride', 'Gas Station', 'Parking Fee', 'Metro Card', 'Taxi Service'],
  Shopping: ['Amazon Purchase', 'Target Store', 'Best Buy Electronics', 'Clothing Store', 'Online Shopping'],
  Entertainment: ['Netflix Subscription', 'Movie Tickets', 'Concert Tickets', 'Gaming Purchase', 'Spotify Premium'],
  Utilities: ['Electric Bill', 'Water Bill', 'Internet Service', 'Phone Bill', 'Gas Bill'],
  Healthcare: ['Pharmacy', 'Doctor Visit', 'Dental Checkup', 'Health Insurance', 'Medical Supplies'],
};

export default function Index() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [emails, setEmails] = useState<EmailNotification[]>([]);
  const [sheetsProcessed, setSheetsProcessed] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();

  const addLog = (message: string, status: LogEntry['status']) => {
    const newLog: LogEntry = {
      id: Date.now().toString(),
      message,
      timestamp: new Date().toLocaleTimeString(),
      status,
    };
    setLogs((prev) => [newLog, ...prev]);
  };

  const generateRandomExpenses = (fileName: string): Expense[] => {
    const numExpenses = Math.floor(Math.random() * 3) + 3; // 3-5 expenses
    const newExpenses: Expense[] = [];
    const today = new Date();

    for (let i = 0; i < numExpenses; i++) {
      const user = users[Math.floor(Math.random() * users.length)];
      const category = categories[Math.floor(Math.random() * categories.length)];
      const description = descriptions[category][Math.floor(Math.random() * descriptions[category].length)];
      const amount = Math.random() * 150 + 10; // $10-$160

      const expenseDate = new Date(today);
      expenseDate.setDate(today.getDate() - Math.floor(Math.random() * 7));

      newExpenses.push({
        id: `${Date.now()}-${i}`,
        date: expenseDate.toLocaleDateString(),
        category,
        description,
        amount,
        user: user.name,
      });
    }

    return newExpenses;
  };

  const generateEmailNotifications = (newExpenses: Expense[]) => {
    const userExpenseMap = new Map<string, Expense[]>();

    newExpenses.forEach((expense) => {
      const existing = userExpenseMap.get(expense.user) || [];
      userExpenseMap.set(expense.user, [...existing, expense]);
    });

    const newEmails: EmailNotification[] = [];

    userExpenseMap.forEach((userExpenses, userName) => {
      const user = users.find((u) => u.name === userName);
      if (!user) return;

      const totalSpent = userExpenses.reduce((sum, exp) => sum + exp.amount, 0);

      const categoryMap = new Map<string, number>();
      userExpenses.forEach((exp) => {
        categoryMap.set(exp.category, (categoryMap.get(exp.category) || 0) + exp.amount);
      });

      const categories = Array.from(categoryMap.entries()).map(([name, amount]) => ({
        name,
        amount,
      }));

      newEmails.push({
        id: `email-${Date.now()}-${userName}`,
        recipient: user.email,
        userName: user.name,
        totalSpent,
        categories,
        timestamp: new Date().toLocaleTimeString(),
        status: 'sent',
      });
    });

    return newEmails;
  };

  const simulateWorkflow = async (fileName: string) => {
    setIsProcessing(true);

    // Step 1: Reading file
    addLog(`Reading file: ${fileName}`, 'processing');
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Step 2: Extracting data
    addLog('Extracting expense data from Excel sheets', 'processing');
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Step 3: Generate expenses
    const newExpenses = generateRandomExpenses(fileName);
    addLog(`Found ${newExpenses.length} expense entries`, 'info');
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Step 4: Processing and categorizing
    addLog('Categorizing expenses by user and category', 'processing');
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Step 5: Calculating totals
    addLog('Calculating daily totals and averages', 'processing');
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Step 6: Update expenses
    setExpenses(newExpenses);
    addLog('Expense data updated successfully', 'success');
    await new Promise((resolve) => setTimeout(resolve, 800));

    // Step 7: Generate and send emails
    addLog('Generating personalized expense reports', 'processing');
    await new Promise((resolve) => setTimeout(resolve, 1500));

    const newEmails = generateEmailNotifications(newExpenses);
    
    for (const email of newEmails) {
      addLog(`Sending email to ${email.recipient}`, 'processing');
      await new Promise((resolve) => setTimeout(resolve, 1000));
      addLog(`Email delivered to ${email.userName} (${email.recipient})`, 'success');
      await new Promise((resolve) => setTimeout(resolve, 500));
    }

    setEmails((prev) => [...newEmails, ...prev]);

    // Step 8: Complete
    setSheetsProcessed((prev) => prev + 1);
    addLog('Workflow completed successfully', 'success');
    
    setIsProcessing(false);

    toast({
      title: 'Automation Complete',
      description: `Processed ${newExpenses.length} expenses and sent ${newEmails.length} email notifications`,
    });
  };

  const handleFileUpload = (file: File) => {
    toast({
      title: 'File Uploaded',
      description: `Starting automation workflow for ${file.name}`,
    });

    simulateWorkflow(file.name);
  };

  const handleClearExpenses = () => {
    setExpenses([]);
    setEmails([]);
    setLogs([]);
    setSheetsProcessed(0);
    toast({
      title: 'Data Cleared',
      description: 'All expenses and logs have been reset',
    });
  };

  const totalSpent = expenses.reduce((sum, exp) => sum + exp.amount, 0);
  const dailyAverage = expenses.length > 0 ? totalSpent / users.length : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              ETP - Expense Tracker Pro
            </h1>
            <p className="text-muted-foreground mt-1">
              UiPath-Based Automated Daily Expense Tracking System
            </p>
          </div>
          <div className="flex items-center gap-3">
            {expenses.length > 0 && (
              <Button variant="outline" onClick={handleClearExpenses} className="gap-2">
                <Trash2 className="h-4 w-4" />
                Clear All Data
              </Button>
            )}
            <Badge variant={isProcessing ? 'default' : 'secondary'} className="text-sm px-3 py-1">
              {isProcessing ? '🤖 Robot Active' : '⚙️ Ready'}
            </Badge>
          </div>
        </div>

        {/* Metrics */}
        <DashboardMetrics
          totalSpent={totalSpent}
          dailyAverage={dailyAverage}
          sheetsProcessed={sheetsProcessed}
          emailsSent={emails.length}
        />

        {/* File Upload */}
        <FileUpload onFileUpload={handleFileUpload} isProcessing={isProcessing} />

        {/* Main Content Grid */}
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Email Notifications */}
          <EmailNotifications emails={emails} />

          {/* Automation Log */}
          <AutomationLog logs={logs} />
        </div>

        {/* Expense Table */}
        <ExpenseTable expenses={expenses} />
      </div>
    </div>
  );
}