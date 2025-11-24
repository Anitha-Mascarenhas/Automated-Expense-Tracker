import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';

export interface Expense {
  id: string;
  date: string;
  category: string;
  description: string;
  amount: number;
  user: string;
}

interface ExpenseTableProps {
  expenses: Expense[];
}

const categoryColors: Record<string, string> = {
  Food: 'bg-orange-100 text-orange-800 hover:bg-orange-100',
  Transportation: 'bg-blue-100 text-blue-800 hover:bg-blue-100',
  Shopping: 'bg-purple-100 text-purple-800 hover:bg-purple-100',
  Entertainment: 'bg-pink-100 text-pink-800 hover:bg-pink-100',
  Utilities: 'bg-green-100 text-green-800 hover:bg-green-100',
  Healthcare: 'bg-red-100 text-red-800 hover:bg-red-100',
  Other: 'bg-gray-100 text-gray-800 hover:bg-gray-100',
};

export default function ExpenseTable({ expenses }: ExpenseTableProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Transactions</CardTitle>
        <CardDescription>Latest expense entries from uploaded sheets</CardDescription>
      </CardHeader>
      <CardContent>
        {expenses.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <p>No expenses recorded yet</p>
            <p className="text-sm mt-1">Upload a file to see transactions</p>
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>User</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Description</TableHead>
                <TableHead className="text-right">Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {expenses.map((expense) => (
                <TableRow key={expense.id}>
                  <TableCell className="font-medium">{expense.date}</TableCell>
                  <TableCell>{expense.user}</TableCell>
                  <TableCell>
                    <Badge variant="secondary" className={categoryColors[expense.category]}>
                      {expense.category}
                    </Badge>
                  </TableCell>
                  <TableCell>{expense.description}</TableCell>
                  <TableCell className="text-right font-semibold">
                    ${expense.amount.toFixed(2)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
}