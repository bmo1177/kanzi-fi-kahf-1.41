import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { motion, AnimatePresence } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Star } from "lucide-react";

interface Duaa {
  id: string;
  text: string;
  author_name: string | null;
  created_at: string;
  is_featured: boolean;
}

const DuaaPage = () => {
  const [duaas, setDuaas] = useState<Duaa[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [duaaText, setDuaaText] = useState("");
  const [authorName, setAuthorName] = useState("");
  const { toast } = useToast();

  useEffect(() => {
    fetchDuaas();
  }, []);

  const fetchDuaas = async () => {
    try {
      const { data, error } = await supabase
        .from("duaas")
        .select("*")
        .eq("is_approved", true) // Only fetch approved duaas
        .order("is_featured", { ascending: false }) // Featured duaas first
        .order("created_at", { ascending: false }); // Then newest first

      if (error) throw error;
      setDuaas(data || []);
    } catch (error) {
      console.error("Error fetching duaas:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!duaaText.trim()) return;

    setSubmitting(true);
    try {
      const { error } = await supabase.from("duaas").insert({
        text: duaaText.trim(),
        author_name: authorName.trim() || null,
        is_approved: false, // Requires admin approval
      });

      if (error) throw error;

      toast({
        title: "تم إرسال دعائك بنجاح",
        description: "سيتم مراجعته ونشره قريباً، جزاك الله خيرًا على مشاركتك",
      });

      setDuaaText("");
      setAuthorName("");
    } catch (error) {
      console.error("Error submitting duaa:", error);
      toast({
        title: "حدث خطأ",
        description: "يرجى المحاولة مرة أخرى",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("ar-SA", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted p-4" dir="rtl">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-12">
          <motion.h1 
            className="text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            لوحة الدعاء
          </motion.h1>
          <motion.p 
            className="text-xl text-muted-foreground mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            شاركي دعائك ورسالة أمل للأخريات
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Card className="mb-12 elegant-card border-0 shadow-glow">
            <CardContent className="pt-6">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="duaa" className="block text-lg font-arabic mb-2">
                    دعاؤك أو رسالتك
                  </label>
                  <Textarea
                    id="duaa"
                    value={duaaText}
                    onChange={(e) => setDuaaText(e.target.value)}
                    placeholder="اكتبي دعاءك أو رسالة أمل للأخريات..."
                    className="min-h-32 text-right font-arabic leading-loose bg-background/50 backdrop-blur-sm resize-none"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="author" className="block text-lg font-arabic mb-2">
                    اسمك (اختياري)
                  </label>
                  <Input
                    id="author"
                    value={authorName}
                    onChange={(e) => setAuthorName(e.target.value)}
                    placeholder="يمكنك ترك هذا الحقل فارغاً للمشاركة بدون اسم"
                    className="h-12 text-right font-arabic bg-background/50 backdrop-blur-sm"
                  />
                </div>

                <div className="flex justify-center pt-4">
                  <Button
                    type="submit"
                    size="lg"
                    disabled={submitting || !duaaText.trim()}
                    className="bg-gradient-primary hover:shadow-glow disabled:opacity-50 px-8 py-4 h-auto text-lg font-arabic transition-all duration-300"
                  >
                    {submitting ? "جاري الإرسال..." : "شاركي دعائك 🤲"}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </motion.div>

        <div className="space-y-6 mb-12">
          <h2 className="text-2xl font-bold text-center mb-6 font-arabic">
            دعوات المشاركات
          </h2>

          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
              <p className="mt-4 text-muted-foreground">جاري تحميل الدعوات...</p>
            </div>
          ) : duaas.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🤲</div>
              <h3 className="text-2xl font-semibold mb-2">لا توجد دعوات بعد</h3>
              <p className="text-muted-foreground">كوني أول من يشارك دعاءها</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <AnimatePresence>
                {duaas.map((duaa, index) => (
                  <motion.div
                    key={duaa.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    whileHover={{ y: -5 }}
                  >
                    <Card className="bg-card/80 backdrop-blur-sm hover:shadow-md transition-all duration-300">
                      <CardContent className="p-6">
                        <div className="space-y-3">
                          {duaa.is_featured && (
                            <Badge variant="secondary" className="bg-primary/10 text-primary mb-2">
                              <Star className="mr-1 h-3 w-3" />
                              دعاء مميز
                            </Badge>
                          )}
                          <div className="p-3 bg-primary/5 rounded-lg border-r-2 border-primary/40">
                            <p className="text-lg leading-relaxed font-arabic">
                              {duaa.text}
                            </p>
                          </div>

                          <div className="flex justify-between items-center text-xs text-muted-foreground">
                            <span>{formatDate(duaa.created_at)}</span>
                            {duaa.author_name && <span>{duaa.author_name}</span>}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DuaaPage;