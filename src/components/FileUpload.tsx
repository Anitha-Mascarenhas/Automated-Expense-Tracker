import { useCallback, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Upload, FileSpreadsheet } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface FileUploadProps {
  onFileUpload: (file: File) => void;
  isProcessing: boolean;
}

export default function FileUpload({ onFileUpload, isProcessing }: FileUploadProps) {
  const [isDragging, setIsDragging] = useState(false);
  const { toast } = useToast();

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);

      const files = Array.from(e.dataTransfer.files);
      const excelFile = files.find(
        (file) =>
          file.name.endsWith('.xlsx') ||
          file.name.endsWith('.xls') ||
          file.name.endsWith('.csv')
      );

      if (excelFile) {
        onFileUpload(excelFile);
      } else {
        toast({
          title: 'Invalid file type',
          description: 'Please upload an Excel file (.xlsx, .xls, or .csv)',
          variant: 'destructive',
        });
      }
    },
    [onFileUpload, toast]
  );

  const handleFileSelect = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        onFileUpload(file);
      }
    },
    [onFileUpload]
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle>Upload Expense Sheet</CardTitle>
        <CardDescription>Upload Excel files to trigger automation workflow</CardDescription>
      </CardHeader>
      <CardContent>
        <div
          className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
            isDragging
              ? 'border-primary bg-primary/5'
              : 'border-muted-foreground/25 hover:border-primary/50'
          } ${isProcessing ? 'opacity-50 pointer-events-none' : ''}`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <FileSpreadsheet className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
          <h3 className="text-lg font-semibold mb-2">
            {isProcessing ? 'Processing...' : 'Drop your Excel file here'}
          </h3>
          <p className="text-sm text-muted-foreground mb-4">
            Supports .xlsx, .xls, and .csv formats
          </p>
          <div className="flex items-center justify-center gap-2">
            <Button
              variant="outline"
              disabled={isProcessing}
              onClick={() => document.getElementById('file-input')?.click()}
            >
              <Upload className="h-4 w-4 mr-2" />
              Select Files
            </Button>
          </div>
          <input
            id="file-input"
            type="file"
            accept=".xlsx,.xls,.csv"
            className="hidden"
            onChange={handleFileSelect}
            disabled={isProcessing}
          />
        </div>
      </CardContent>
    </Card>
  );
}