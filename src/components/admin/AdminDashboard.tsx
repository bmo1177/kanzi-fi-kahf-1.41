import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/components/auth/AuthProvider";
import { Download, Edit, Trash2, Star, LogOut, FileText } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";
import jsPDF from "jspdf";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DuaasAdminDashboard } from "./DuaasAdminDashboard";

interface Reflection {
  id: string;
  ayah_number: number;
  ayah_text: string;
  symbolic_title: string;
  reflection_text: string;
  is_featured: boolean;
  created_at: string;
  participants?: {
    name: string;
  };
}

export const AdminDashboard = () => {
  const [reflections, setReflections] = useState<Reflection[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    fetchReflections();
  }, []);

  const fetchReflections = async () => {
    try {
      const { data, error } = await supabase
        .from('reflections')
        .select(`
          *,
          participants (
            name
          )
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setReflections(data || []);
    } catch (error) {
      console.error('Error fetching reflections:', error);
      toast({
        title: "خطأ",
        description: "فشل في تحميل التأملات",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleToggleFeatured = async (id: string, currentStatus: boolean) => {
    try {
      const { error } = await supabase
        .from('reflections')
        .update({ is_featured: !currentStatus })
        .eq('id', id);

      if (error) throw error;

      setReflections(prev => prev.map(reflection => 
        reflection.id === id 
          ? { ...reflection, is_featured: !currentStatus }
          : reflection
      ));

      toast({
        title: "تم التحديث",
        description: !currentStatus ? "تم إضافة التأمل للمميزة" : "تم إزالة التأمل من المميزة",
      });
    } catch (error) {
      console.error('Error updating reflection:', error);
      toast({
        title: "خطأ",
        description: "فشل في تحديث التأمل",
        variant: "destructive",
      });
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("هل أنت متأكدة من حذف هذا التأمل؟")) return;

    try {
      const { error } = await supabase
        .from('reflections')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setReflections(prev => prev.filter(reflection => reflection.id !== id));
      toast({
        title: "تم الحذف",
        description: "تم حذف التأمل بنجاح",
      });
    } catch (error) {
      console.error('Error deleting reflection:', error);
      toast({
        title: "خطأ",
        description: "فشل في حذف التأمل",
        variant: "destructive",
      });
    }
  };

  const exportToJSON = () => {
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
  };

  const exportToPDF = async () => {
    try {
      // Create a new PDF document with RTL support
      const pdf = new jsPDF({
        orientation: 'p',
        unit: 'mm',
        format: 'a4',
        putOnlyUsedFonts: true,
        floatPrecision: 16
      });
      
      // Add Arabic font support
      // Note: In a real implementation, you would need to add Amiri font
      // This is a placeholder that uses the default font
      pdf.setFont("Amiri", "normal");
      pdf.setR2L(true); // Enable right-to-left text
      
      // Add decorative border
      const pageWidth = pdf.internal.pageSize.width;
      const pageHeight = pdf.internal.pageSize.height;
      const margin = 10;
      
      // Gold border
      pdf.setDrawColor(218, 165, 32); // Gold color
      pdf.setLineWidth(0.5);
      pdf.rect(margin, margin, pageWidth - 2 * margin, pageHeight - 2 * margin);
      
      // Inner decorative border
      pdf.setDrawColor(218, 165, 32, 0.5); // Gold with transparency
      pdf.setLineWidth(0.2);
      pdf.rect(margin + 3, margin + 3, pageWidth - 2 * (margin + 3), pageHeight - 2 * (margin + 3));
      
      // Title with decorative elements
      pdf.setFontSize(28);
      pdf.setTextColor(139, 69, 19); // Brown color for title
      pdf.text('✨ كنوز سورة الكهف ✨', pageWidth / 2, 30, { align: 'center' });
      
      // Subtitle
      pdf.setFontSize(14);
      pdf.setTextColor(0, 0, 0);
      pdf.text(`تاريخ التصدير: ${new Date().toLocaleDateString('ar-SA')}`, pageWidth / 2, 40, { align: 'center' });
      
      let yPosition = 60;
      
      reflections.forEach((reflection, index) => {
        // Check if we need a new page
        if (yPosition > 250) {
          pdf.addPage();
          
          // Add border to new page
          pdf.setDrawColor(218, 165, 32);
          pdf.setLineWidth(0.5);
          pdf.rect(margin, margin, pageWidth - 2 * margin, pageHeight - 2 * margin);
          
          // Inner decorative border
          pdf.setDrawColor(218, 165, 32, 0.5);
          pdf.setLineWidth(0.2);
          pdf.rect(margin + 3, margin + 3, pageWidth - 2 * (margin + 3), pageHeight - 2 * (margin + 3));
          
          yPosition = 30;
        }
        
        // Reflection number and title with decorative element
        pdf.setFontSize(16);
        pdf.setTextColor(139, 69, 19);
        pdf.text(`✨ ${index + 1}. ${reflection.symbolic_title}`, pageWidth - 20, yPosition, { align: 'right' });
        yPosition += 10;
        
        // Ayah number and text
        pdf.setFontSize(12);
        pdf.setTextColor(0, 0, 0);
        pdf.text(`آية رقم: ${reflection.ayah_number}`, pageWidth - 20, yPosition, { align: 'right' });
        yPosition += 8;
        
        // Ayah text with special formatting
        pdf.setTextColor(0, 102, 102); // Teal color for Quranic text
        const ayahLines = pdf.splitTextToSize(reflection.ayah_text, pageWidth - 40);
        pdf.text(ayahLines, pageWidth - 20, yPosition, { align: 'right' });
        yPosition += ayahLines.length * 7;
        
        // Participant name if available
        if (reflection.participants?.name) {
          pdf.setTextColor(100, 100, 100); // Gray for author name
          pdf.text(`بقلم: ${reflection.participants.name}`, pageWidth - 20, yPosition, { align: 'right' });
          yPosition += 8;
        }
        
        // Reflection text
        pdf.setTextColor(0, 0, 0);
        const textLines = pdf.splitTextToSize(reflection.reflection_text, pageWidth - 40);
        pdf.text(textLines, pageWidth - 20, yPosition, { align: 'right' });
        yPosition += textLines.length * 6 + 10;
        
        // Add decorative separator
        pdf.setDrawColor(218, 165, 32, 0.5);
        pdf.setLineWidth(0.2);
        pdf.line(30, yPosition - 5, pageWidth - 30, yPosition - 5);
        yPosition += 15;
      });
      
      pdf.save(`kahf-reflections-${new Date().toISOString().split('T')[0]}.pdf`);
      
      toast({
        title: "تم التصدير",
        description: "تم تصدير التأملات بصيغة PDF بنجاح",
      });
    } catch (error) {
      console.error('Error exporting PDF:', error);
      toast({
        title: "خطأ",
        description: "فشل في تصدير PDF",
        variant: "destructive",
      });
    }
  };

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      toast({
        title: "تم تسجيل الخروج",
        description: "تم تسجيل خروجك بنجاح",
      });
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-subtle flex items-center justify-center" dir="rtl">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">جاري تحميل لوحة التحكم...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-subtle" dir="rtl">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-arabic font-bold gradient-text mb-2">
              لوحة تحكم الإدارة
            </h1>
            <p className="text-muted-foreground">
              مرحباً {user?.email} - إدارة تأملات سورة الكهف
            </p>
          </div>
          <Button variant="outline" onClick={handleLogout} className="font-arabic">
            <LogOut className="mr-2 h-4 w-4" />
            تسجيل خروج
          </Button>
        </div>

        {/* Admin Tabs */}
        <Tabs defaultValue="reflections" className="mb-8">
          <TabsList className="mb-6">
            <TabsTrigger value="reflections" className="font-arabic">
              التأملات
            </TabsTrigger>
            <TabsTrigger value="duaas" className="font-arabic">
              الدعوات
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="reflections">
            {/* Export Controls */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="font-arabic">تصدير التأملات</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button onClick={exportToJSON} variant="outline" className="font-arabic">
                    <Download className="mr-2 h-4 w-4" />
                    تصدير JSON
                  </Button>
                  <Button onClick={exportToPDF} variant="outline" className="font-arabic">
                    <FileText className="mr-2 h-4 w-4" />
                    تصدير PDF
                  </Button>
                </div>
                <p className="text-sm text-muted-foreground mt-2">
                  إجمالي التأملات: {reflections.length}
                </p>
              </CardContent>
            </Card>

            {/* Reflections List */}
            <div className="space-y-6">
              {reflections.length === 0 ? (
                <Alert>
                  <AlertDescription>
                    لا توجد تأملات مسجلة حتى الآن.
                  </AlertDescription>
                </Alert>
              ) : (
                reflections.map((reflection, index) => (
                  <motion.div
                    key={reflection.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <Card className="elegant-card">
                      <CardHeader>
                        <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <CardTitle className="font-arabic text-lg">
                                {reflection.symbolic_title}
                              </CardTitle>
                              {reflection.is_featured && (
                                <Badge variant="secondary" className="bg-primary/10 text-primary">
                                  <Star className="mr-1 h-3 w-3" />
                                  مميز
                                </Badge>
                              )}
                            </div>
                            <p className="text-sm text-muted-foreground">
                              آية رقم {reflection.ayah_number} • 
                              {reflection.participants?.name && ` بقلم: ${reflection.participants.name} • `}
                              {new Date(reflection.created_at).toLocaleDateString('ar-SA')}
                            </p>
                          </div>
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              variant={reflection.is_featured ? "default" : "outline"}
                              onClick={() => handleToggleFeatured(reflection.id, reflection.is_featured)}
                            >
                              <Star className="h-4 w-4" />
                            </Button>
                            <Button size="sm" variant="outline">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button 
                              size="sm" 
                              variant="destructive"
                              onClick={() => handleDelete(reflection.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div>
                            <h4 className="font-semibold font-arabic mb-2">نص الآية:</h4>
                            <p className="text-primary font-arabic leading-loose">
                              {reflection.ayah_text}
                            </p>
                          </div>
                          <div>
                            <h4 className="font-semibold font-arabic mb-2">التأمل:</h4>
                            <p className="leading-relaxed">{reflection.reflection_text}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="duaas">
            <DuaasAdminDashboard />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};