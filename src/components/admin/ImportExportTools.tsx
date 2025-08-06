import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Download, Upload, FileJson, FileSpreadsheet, Archive } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface Reflection {
  id?: string;
  ayah_number: number;
  ayah_text: string;
  symbolic_title: string;
  reflection_text: string;
  is_featured?: boolean;
  created_at?: string;
  participant_id?: string | null;
}

export const ImportExportTools = ({ reflections }: { reflections: Reflection[] }) => {
  const [importing, setImporting] = useState(false);
  const [exporting, setExporting] = useState(false);
  const { toast } = useToast();

  const exportToJSON = () => {
    try {
      setExporting(true);
      const dataStr = JSON.stringify(reflections, null, 2);
      const dataBlob = new Blob([dataStr], { type: 'application/json' });
      const url = URL.createObjectURL(dataBlob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `kahf-reflections-${new Date().toISOString().split('T')[0]}.json`;
      link.click();
      URL.revokeObjectURL(url);
      
      toast({
        title: "تم التصدير",
        description: "تم تصدير التأملات بصيغة JSON بنجاح",
      });
    } catch (error) {
      console.error('Error exporting JSON:', error);
      toast({
        title: "خطأ",
        description: "فشل في تصدير JSON",
        variant: "destructive",
      });
    } finally {
      setExporting(false);
    }
  };

  const exportToCSV = () => {
    try {
      setExporting(true);
      // Convert reflections to CSV format
      const headers = ["ayah_number", "ayah_text", "symbolic_title", "reflection_text", "is_featured", "created_at"];
      const csvRows = [
        headers.join(','), // Header row
        ...reflections.map(reflection => {
          return headers.map(header => {
            const value = reflection[header as keyof Reflection];
            // Handle string values that might contain commas
            return typeof value === 'string' ? `"${value.replace(/"/g, '""')}"` : value;
          }).join(',');
        })
      ];
      
      const csvString = csvRows.join('\n');
      const dataBlob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(dataBlob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `kahf-reflections-${new Date().toISOString().split('T')[0]}.csv`;
      link.click();
      URL.revokeObjectURL(url);
      
      toast({
        title: "تم التصدير",
        description: "تم تصدير التأملات بصيغة CSV بنجاح",
      });
    } catch (error) {
      console.error('Error exporting CSV:', error);
      toast({
        title: "خطأ",
        description: "فشل في تصدير CSV",
        variant: "destructive",
      });
    } finally {
      setExporting(false);
    }
  };

  const exportToZip = async () => {
    try {
      setExporting(true);
      // This would require a ZIP library like JSZip
      // For simplicity, we'll just show a toast message
      toast({
        title: "ميزة قيد التطوير",
        description: "سيتم إضافة تصدير ZIP قريبًا",
      });
    } catch (error) {
      console.error('Error exporting ZIP:', error);
      toast({
        title: "خطأ",
        description: "فشل في تصدير ZIP",
        variant: "destructive",
      });
    } finally {
      setExporting(false);
    }
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      setImporting(true);
      const fileExtension = file.name.split('.').pop()?.toLowerCase();
      
      if (fileExtension === 'json') {
        const text = await file.text();
        const data = JSON.parse(text) as Reflection[];
        await importReflections(data);
      } else if (fileExtension === 'csv') {
        const text = await file.text();
        const data = parseCSV(text);
        await importReflections(data);
      } else {
        throw new Error('Unsupported file format');
      }
      
      // Reset the input
      event.target.value = '';
      
      toast({
        title: "تم الاستيراد",
        description: "تم استيراد التأملات بنجاح",
      });
    } catch (error) {
      console.error('Error importing file:', error);
      toast({
        title: "خطأ",
        description: "فشل في استيراد الملف",
        variant: "destructive",
      });
    } finally {
      setImporting(false);
    }
  };

  const parseCSV = (csvText: string): Reflection[] => {
    const lines = csvText.split('\n');
    const headers = lines[0].split(',');
    
    return lines.slice(1).map(line => {
      const values = line.split(',');
      const reflection: any = {};
      
      headers.forEach((header, index) => {
        let value = values[index];
        
        // Remove quotes if present
        if (value && value.startsWith('"') && value.endsWith('"')) {
          value = value.slice(1, -1).replace(/""/g, '"');
        }
        
        // Convert to appropriate type
        if (header === 'ayah_number') {
          reflection[header] = parseInt(value);
        } else if (header === 'is_featured') {
          reflection[header] = value === 'true';
        } else {
          reflection[header] = value;
        }
      });
      
      return reflection as Reflection;
    });
  };

  const importReflections = async (reflections: Reflection[]) => {
    // Remove any IDs to avoid conflicts
    const cleanedReflections = reflections.map(({ id, ...rest }) => rest);
    
    const { error } = await supabase
      .from('reflections')
      .insert(cleanedReflections);
    
    if (error) throw error;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-arabic">استيراد وتصدير التأملات</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold mb-3 font-arabic">تصدير</h3>
            <div className="flex flex-wrap gap-3">
              <Button 
                onClick={exportToJSON} 
                variant="outline" 
                disabled={exporting || reflections.length === 0}
                className="font-arabic"
              >
                <FileJson className="mr-2 h-4 w-4" />
                تصدير JSON
              </Button>
              <Button 
                onClick={exportToCSV} 
                variant="outline" 
                disabled={exporting || reflections.length === 0}
                className="font-arabic"
              >
                <FileSpreadsheet className="mr-2 h-4 w-4" />
                تصدير CSV
              </Button>
              <Button 
                onClick={exportToZip} 
                variant="outline" 
                disabled={exporting || reflections.length === 0}
                className="font-arabic"
              >
                <Archive className="mr-2 h-4 w-4" />
                تصدير ZIP
              </Button>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-3 font-arabic">استيراد</h3>
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="file-upload" className="font-arabic">
                اختر ملف JSON أو CSV
              </Label>
              <Input
                id="file-upload"
                type="file"
                accept=".json,.csv"
                onChange={handleFileUpload}
                disabled={importing}
                className="font-arabic"
              />
              <p className="text-sm text-muted-foreground">
                سيتم إضافة التأملات المستوردة إلى القائمة الحالية
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};