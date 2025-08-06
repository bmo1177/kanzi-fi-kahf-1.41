import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { SURAT_AL_KAHF_AYAHS } from "@/data/ayahs";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const formSchema = z.object({
  ayah_number: z.string().min(1, "يرجى اختيار رقم الآية"),
  ayah_text: z.string().min(1, "نص الآية مطلوب"),
  symbolic_title: z.string().min(1, "العنوان الرمزي مطلوب"),
  reflection_text: z.string().min(10, "يجب أن يكون التأمل 10 أحرف على الأقل"),
  name: z.string().optional(),
});

type FormData = z.infer<typeof formSchema>;

export const ReflectionForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedAyah, setSelectedAyah] = useState<{ number: number; text: string } | null>(null);
  const [randomAyah, setRandomAyah] = useState<{ number: number; text: string } | null>(null);
  const { toast } = useToast();

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      ayah_number: "",
      ayah_text: "",
      symbolic_title: "",
      reflection_text: "",
      name: "",
    },
  });

  const handleAyahSelection = (ayahNumber: string) => {
    const ayah = SURAT_AL_KAHF_AYAHS.find(a => a.number.toString() === ayahNumber);
    if (ayah) {
      setSelectedAyah(ayah);
      form.setValue("ayah_number", ayahNumber);
      form.setValue("ayah_text", ayah.text);
    }
  };

  const getRandomAyah = () => {
    const randomIndex = Math.floor(Math.random() * SURAT_AL_KAHF_AYAHS.length);
    const ayah = SURAT_AL_KAHF_AYAHS[randomIndex];
    setRandomAyah(ayah);
  };
  
  const useRandomAyah = () => {
    if (randomAyah) {
      setSelectedAyah(randomAyah);
      form.setValue("ayah_number", randomAyah.number.toString());
      form.setValue("ayah_text", randomAyah.text);
    }
  };

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    
    try {
      // First create the participant if name is provided
      let participantId = null;
      if (data.name && data.name.trim()) {
        const { data: participantData, error: participantError } = await supabase
          .from("participants")
          .insert({ name: data.name.trim() })
          .select()
          .single();
        
        if (participantError) throw participantError;
        participantId = participantData.id;
      }

      // Create the reflection
      const { error: reflectionError } = await supabase
        .from("reflections")
        .insert({
          ayah_number: parseInt(data.ayah_number),
          ayah_text: data.ayah_text,
          symbolic_title: data.symbolic_title,
          reflection_text: data.reflection_text,
          participant_id: participantId,
        });

      if (reflectionError) throw reflectionError;

      toast({
        title: "تم إرسال تأملك بنجاح! ✨",
        description: "شكراً لك على مشاركة كنزك معنا",
      });

      form.reset();
      setSelectedAyah(null);
    } catch (error) {
      console.error("Error submitting reflection:", error);
      toast({
        title: "حدث خطأ",
        description: "يرجى المحاولة مرة أخرى",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="max-w-4xl mx-auto"
    >
      <Card className="elegant-card border-0 shadow-glow">
        <CardHeader className="text-center pb-6">
          <CardTitle className="text-2xl md:text-3xl font-arabic gradient-text">
            شاركي كنزك المكتشف
          </CardTitle>
          <CardDescription className="text-base text-muted-foreground">
            اختاري آية من سورة الكهف وشاركينا ما اكتشفتِه من كنوز
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          {/* Random Ayah Feature */}
          <div className="mb-6 p-4 rounded-xl bg-muted/30 border border-muted">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-arabic font-semibold text-primary">
                أو اختاري آية عشوائية للتأمل
              </h3>
              <Sparkles className="h-5 w-5 text-primary" />
            </div>
            <div className="flex gap-3">
              <Button
                type="button"
                onClick={getRandomAyah}
                variant="outline"
                className="font-arabic"
              >
                اختيار آية عشوائية
              </Button>
              {randomAyah && (
                <Button
                  type="button"
                  onClick={useRandomAyah}
                  className="font-arabic bg-primary/10 hover:bg-primary/20 text-primary"
                >
                  استخدام الآية {randomAyah.number}
                </Button>
              )}
            </div>
            {randomAyah && (
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="link" className="font-arabic text-sm mt-2 p-0">
                    معاينة الآية المختارة
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle className="font-arabic text-right">
                      آية {randomAyah.number}
                    </DialogTitle>
                  </DialogHeader>
                  <DialogDescription className="font-arabic text-lg leading-loose text-right">
                    {randomAyah.text}
                  </DialogDescription>
                </DialogContent>
              </Dialog>
            )}
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* Ayah Selection */}
              <FormField
                control={form.control}
                name="ayah_number"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-lg font-arabic">اختاري رقم الآية</FormLabel>
                    <Select 
                      onValueChange={(value) => {
                        field.onChange(value);
                        handleAyahSelection(value);
                      }}
                      value={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="w-full h-12 text-right font-arabic bg-background/50 backdrop-blur-sm">
                          <SelectValue placeholder="اختاري رقم الآية..." />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="max-h-60 bg-background/95 backdrop-blur-md border-border/50">
                        {SURAT_AL_KAHF_AYAHS.map((ayah) => (
                          <SelectItem 
                            key={ayah.number} 
                            value={ayah.number.toString()}
                            className="text-right font-arabic hover:bg-primary/10"
                          >
                            <div className="flex flex-col items-end gap-1">
                              <span className="font-semibold">آية {ayah.number}</span>
                              <span className="text-sm text-muted-foreground truncate max-w-xs">
                                {ayah.text.slice(0, 50)}...
                              </span>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Selected Ayah Display */}
              {selectedAyah && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  transition={{ duration: 0.3 }}
                  className="p-4 rounded-xl bg-primary/5 border border-primary/20"
                >
                  <h3 className="font-arabic font-semibold text-primary mb-2">
                    آية {selectedAyah.number}
                  </h3>
                  <p className="font-arabic text-lg leading-loose text-foreground">
                    {selectedAyah.text}
                  </p>
                </motion.div>
              )}

              {/* Symbolic Title */}
              <FormField
                control={form.control}
                name="symbolic_title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-lg font-arabic">العنوان الرمزي لكنزك</FormLabel>
                    <FormControl>
                      <Input 
                        {...field} 
                        placeholder="مثال: كنز الصبر، كنز التوكل..."
                        className="h-12 text-right font-arabic bg-background/50 backdrop-blur-sm"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Reflection Text */}
              <FormField
                control={form.control}
                name="reflection_text"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-lg font-arabic">تأملك وما اكتشفتِه</FormLabel>
                    <FormControl>
                      <Textarea 
                        {...field}
                        placeholder="شاركينا ما لمس قلبك في هذه الآية، وما اكتشفتِه من كنوز..."
                        className="min-h-32 text-right font-arabic leading-loose bg-background/50 backdrop-blur-sm resize-none"
                        rows={6}
                      />
                    </FormControl>
                    <div className="mt-2 p-3 rounded-lg bg-muted/30 border-r-2 border-primary/40">
                      <p className="text-sm text-muted-foreground font-arabic">
                        <span className="font-semibold text-primary">إرشادات للتأمل:</span>
                        <br />
                        ما الذي علّمتكِ إياه هذه الآية؟
                        <br />
                        كيف وجدتِ صلتها بحياتك؟
                      </p>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Name (Optional) */}
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-lg font-arabic">اسمك (اختياري)</FormLabel>
                    <FormControl>
                      <Input 
                        {...field} 
                        placeholder="يمكنك ترك هذا الحقل فارغاً للمشاركة بدون اسم"
                        className="h-12 text-right font-arabic bg-background/50 backdrop-blur-sm"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Submit Button */}
              <div className="flex justify-center pt-4">
                <Button
                  type="submit"
                  size="lg"
                  disabled={isSubmitting}
                  className="bg-gradient-primary hover:shadow-glow disabled:opacity-50 px-8 py-4 h-auto text-lg font-arabic transition-all duration-300"
                >
                  {isSubmitting ? "جاري الإرسال..." : "شاركي كنزك ✨"}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </motion.div>
  );
};