import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/components/auth/AuthProvider";
import { Check, X, Star, Trash2, Download } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface Duaa {
  id: string;
  text: string;
  author_name: string | null;
  is_approved: boolean;
  is_featured: boolean;
  created_at: string;
}

export const DuaasAdminDashboard = () => {
  const [duaas, setDuaas] = useState<Duaa[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    fetchDuaas();
  }, []);

  const fetchDuaas = async () => {
    try {
      const { data, error } = await supabase
        .from('duaas')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setDuaas(data || []);
    } catch (error) {
      console.error('Error fetching duaas:', error);
      toast({
        title: "خطأ",
        description: "فشل في تحميل الدعوات",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (id: string) => {
    try {
      const { error } = await supabase
        .from('duaas')
        .update({ is_approved: true })
        .eq('id', id);

      if (error) throw error;

      setDuaas(prev => prev.map(duaa => 
        duaa.id === id 
          ? { ...duaa, is_approved: true }
          : duaa
      ));

      toast({
        title: "تم الموافقة",
        description: "تم نشر الدعاء بنجاح",
      });
    } catch (error) {
      console.error('Error approving duaa:', error);
      toast({
        title: "خطأ",
        description: "فشل في تحديث الدعاء",
        variant: "destructive",
      });
    }
  };

  const handleReject = async (id: string) => {
    if (!confirm("هل أنت متأكدة من رفض هذا الدعاء؟")) return;

    try {
      const { error } = await supabase
        .from('duaas')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setDuaas(prev => prev.filter(duaa => duaa.id !== id));
      toast({
        title: "تم الرفض",
        description: "تم رفض الدعاء بنجاح",
      });
    } catch (error) {
      console.error('Error rejecting duaa:', error);
      toast({
        title: "خطأ",
        description: "فشل في رفض الدعاء",
        variant: "destructive",
      });
    }
  };

  const handleToggleFeatured = async (id: string, currentStatus: boolean) => {
    try {
      const { error } = await supabase
        .from('duaas')
        .update({ is_featured: !currentStatus })
        .eq('id', id);

      if (error) throw error;

      setDuaas(prev => prev.map(duaa => 
        duaa.id === id 
          ? { ...duaa, is_featured: !currentStatus }
          : duaa
      ));

      toast({
        title: "تم التحديث",
        description: !currentStatus ? "تم تمييز الدعاء" : "تم إلغاء تمييز الدعاء",
      });
    } catch (error) {
      console.error('Error updating duaa:', error);
      toast({
        title: "خطأ",
        description: "فشل في تحديث الدعاء",
        variant: "destructive",
      });
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("هل أنت متأكدة من حذف هذا الدعاء؟")) return;

    try {
      const { error } = await supabase
        .from('duaas')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setDuaas(prev => prev.filter(duaa => duaa.id !== id));
      toast({
        title: "تم الحذف",
        description: "تم حذف الدعاء بنجاح",
      });
    } catch (error) {
      console.error('Error deleting duaa:', error);
      toast({
        title: "خطأ",
        description: "فشل في حذف الدعاء",
        variant: "destructive",
      });
    }
  };

  const exportToJSON = () => {
    const dataStr = JSON.stringify(duaas, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `kahf-duaas-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);
    
    toast({
      title: "تم التصدير",
      description: "تم تصدير الدعوات بصيغة JSON بنجاح",
    });
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("ar-SA", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  if (loading) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">جاري تحميل الدعوات...</p>
        </div>
      </div>
    );
  }

  const pendingDuaas = duaas.filter(duaa => !duaa.is_approved);
  const approvedDuaas = duaas.filter(duaa => duaa.is_approved);

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <h2 className="text-2xl font-arabic font-bold">إدارة الدعوات</h2>
        <Button onClick={exportToJSON} variant="outline" className="font-arabic">
          <Download className="mr-2 h-4 w-4" />
          تصدير الدعوات
        </Button>
      </div>

      <Tabs defaultValue="pending" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="pending" className="font-arabic">
            بانتظار الموافقة {pendingDuaas.length > 0 && `(${pendingDuaas.length})`}
          </TabsTrigger>
          <TabsTrigger value="approved" className="font-arabic">
            الدعوات المنشورة {approvedDuaas.length > 0 && `(${approvedDuaas.length})`}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="pending" className="space-y-4">
          {pendingDuaas.length === 0 ? (
            <Alert>
              <AlertDescription>
                لا توجد دعوات بانتظار الموافقة.
              </AlertDescription>
            </Alert>
          ) : (
            pendingDuaas.map((duaa, index) => (
              <motion.div
                key={duaa.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <Card>
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between items-start">
                          <Badge variant="outline" className="mb-2">
                            بانتظار الموافقة
                          </Badge>
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              variant="default"
                              className="bg-green-600 hover:bg-green-700"
                              onClick={() => handleApprove(duaa.id)}
                            >
                              <Check className="h-4 w-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="destructive"
                              onClick={() => handleReject(duaa.id)}
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                        <div className="p-3 bg-primary/5 rounded-lg border-r-2 border-primary/40 my-3">
                          <p className="text-lg leading-relaxed font-arabic">
                            {duaa.text}
                          </p>
                        </div>
                        <div className="flex justify-between items-center text-xs text-muted-foreground mt-2">
                          <span>{formatDate(duaa.created_at)}</span>
                          {duaa.author_name && <span>بقلم: {duaa.author_name}</span>}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))
          )}
        </TabsContent>

        <TabsContent value="approved" className="space-y-4">
          {approvedDuaas.length === 0 ? (
            <Alert>
              <AlertDescription>
                لا توجد دعوات منشورة.
              </AlertDescription>
            </Alert>
          ) : (
            approvedDuaas.map((duaa, index) => (
              <motion.div
                key={duaa.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <Card>
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between items-start">
                          {duaa.is_featured ? (
                            <Badge className="bg-primary/10 text-primary mb-2">
                              <Star className="mr-1 h-3 w-3" />
                              دعاء مميز
                            </Badge>
                          ) : (
                            <Badge variant="outline" className="mb-2">
                              منشور
                            </Badge>
                          )}
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              variant={duaa.is_featured ? "default" : "outline"}
                              onClick={() => handleToggleFeatured(duaa.id, duaa.is_featured)}
                            >
                              <Star className="h-4 w-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="destructive"
                              onClick={() => handleDelete(duaa.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                        <div className="p-3 bg-primary/5 rounded-lg border-r-2 border-primary/40 my-3">
                          <p className="text-lg leading-relaxed font-arabic">
                            {duaa.text}
                          </p>
                        </div>
                        <div className="flex justify-between items-center text-xs text-muted-foreground mt-2">
                          <span>{formatDate(duaa.created_at)}</span>
                          {duaa.author_name && <span>بقلم: {duaa.author_name}</span>}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};