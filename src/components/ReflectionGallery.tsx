import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { Skeleton } from "@/components/ui/skeleton";

interface Reflection {
  id: string;
  ayah_number: number;
  ayah_text: string;
  symbolic_title: string;
  reflection_text: string;
  created_at: string;
  participants?: {
    name: string;
  } | null;
}

export const ReflectionGallery = () => {
  const [reflections, setReflections] = useState<Reflection[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchReflections();
  }, []);

  const fetchReflections = async () => {
    try {
      const { data, error } = await supabase
        .from("reflections")
        .select(`
          *,
          participants (
            name
          )
        `)
        .order("created_at", { ascending: false });

      if (error) throw error;
      setReflections(data || []);
    } catch (error) {
      console.error("Error fetching reflections:", error);
    } finally {
      setLoading(false);
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

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background to-muted p-4" dir="rtl">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <Skeleton className="h-12 w-64 mx-auto mb-4" />
            <Skeleton className="h-6 w-96 mx-auto" />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <Card key={i} className="h-64">
                <CardHeader>
                  <Skeleton className="h-6 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-20 w-full" />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted p-4" dir="rtl">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-4">
            ركن الكنوز
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            تأملات الأخريات في سورة الكهف
          </p>
          
          {reflections.length > 0 && (
            <div className="bg-primary/10 border border-primary/20 rounded-lg p-4 mb-8 max-w-2xl mx-auto">
              <h3 className="text-lg font-semibold text-primary mb-2">
                ✨ أجمل كنز لهذا الأسبوع
              </h3>
              <p className="text-sm text-muted-foreground">
                {reflections[0]?.symbolic_title}
              </p>
            </div>
          )}
        </div>

        {reflections.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📿</div>
            <h3 className="text-2xl font-semibold mb-2">لا توجد كنوز بعد</h3>
            <p className="text-muted-foreground">كوني أول من يشارك كنزها من سورة الكهف</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {reflections.map((reflection, index) => (
              <Card 
                key={reflection.id} 
                className={`
                  group hover:shadow-xl transition-all duration-300 border-0 bg-card/80 backdrop-blur-sm
                  ${index === 0 ? 'ring-2 ring-primary/30 shadow-lg' : ''}
                `}
              >
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="secondary" className="text-xs">
                      الآية {reflection.ayah_number}
                    </Badge>
                    {index === 0 && (
                      <Badge className="bg-gradient-to-r from-primary to-accent text-white">
                        ⭐ كنز الأسبوع
                      </Badge>
                    )}
                  </div>
                  
                  <CardTitle className="text-lg leading-relaxed text-primary">
                    {reflection.symbolic_title}
                  </CardTitle>
                  
                  <div className="text-xs text-muted-foreground flex items-center gap-2">
                    <span>{formatDate(reflection.created_at)}</span>
                    {reflection.participants?.name && (
                      <>
                        <span>•</span>
                        <span>{reflection.participants.name}</span>
                      </>
                    )}
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  <div className="p-3 bg-muted/30 rounded-lg border-r-2 border-primary/40">
                    <p className="text-sm leading-relaxed font-arabic text-muted-foreground whitespace-pre-wrap overflow-wrap-break-word">
                      {reflection.ayah_text}
                    </p>
                  </div>
                  
                  <p className="text-sm leading-relaxed whitespace-pre-wrap overflow-wrap-break-word group-hover:line-clamp-none transition-all duration-300">
                    {reflection.reflection_text}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
        
        <div className="text-center mt-12 p-6 bg-muted/30 rounded-lg border border-primary/20">
          <p className="text-sm text-muted-foreground">
            "وَاصْبِرْ نَفْسَكَ مَعَ الَّذِينَ يَدْعُونَ رَبَّهُم بِالْغَدَاةِ وَالْعَشِيِّ يُرِيدُونَ وَجْهَهُ"
          </p>
          <p className="text-xs text-muted-foreground mt-2">
            تحت إشراف المعلمة: نور الإيمان
          </p>
        </div>
      </div>
    </div>
  );
};