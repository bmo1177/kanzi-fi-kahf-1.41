import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { SURAT_AL_KAHF_AYAHS } from "@/data/ayahs";

interface AyahStat {
  ayah_number: number;
  count: number;
}

interface WordCloudItem {
  text: string;
  value: number;
}

const StatsPage = () => {
  const [totalReflections, setTotalReflections] = useState<number>(0);
  const [ayahStats, setAyahStats] = useState<AyahStat[]>([]);
  const [wordCloudData, setWordCloudData] = useState<WordCloudItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // Get total reflections
        const { count } = await supabase
          .from("reflections")
          .select("*", { count: "exact", head: true });

        setTotalReflections(count || 0);

        // Get ayah statistics
        const { data: ayahData } = await supabase
          .from("reflections")
          .select("ayah_number")
          .order("ayah_number");

        if (ayahData) {
          // Count occurrences of each ayah
          const ayahCounts: Record<number, number> = {};
          ayahData.forEach(item => {
            ayahCounts[item.ayah_number] = (ayahCounts[item.ayah_number] || 0) + 1;
          });

          // Convert to array for chart
          const stats = Object.entries(ayahCounts).map(([ayah, count]) => ({
            ayah_number: parseInt(ayah),
            count: count as number,
          }));

          setAyahStats(stats);
        }

        // Get symbolic titles for word cloud
        const { data: titlesData } = await supabase
          .from("reflections")
          .select("symbolic_title");

        if (titlesData) {
          // Simple word frequency counter (in a real app, you'd use a more sophisticated Arabic text analysis)
          const words: Record<string, number> = {};
          titlesData.forEach(item => {
            const titleWords = item.symbolic_title.split(/\s+/);
            titleWords.forEach(word => {
              // Filter out very short words and common words
              if (word.length > 2) {
                words[word] = (words[word] || 0) + 1;
              }
            });
          });

          // Convert to array for word cloud
          const wordCloudItems = Object.entries(words)
            .map(([text, value]) => ({ text, value }))
            .sort((a, b) => b.value - a.value)
            .slice(0, 50); // Limit to top 50 words

          setWordCloudData(wordCloudItems);
        }
      } catch (error) {
        console.error("Error fetching stats:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  // Prepare data for bar chart
  const chartData = ayahStats.map(stat => ({
    ayah: `آية ${stat.ayah_number}`,
    count: stat.count,
  }));

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background to-muted p-4 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted p-4" dir="rtl">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-4">
            إحصائيات الكنوز
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            نظرة على تأملات المشاركات في سورة الكهف
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Card>
            <CardHeader>
              <CardTitle className="text-center font-arabic">إجمالي التأملات</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-5xl font-bold text-center text-primary">
                {totalReflections}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-center font-arabic">أكثر الآيات اختيارًا</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {ayahStats
                  .sort((a, b) => b.count - a.count)
                  .slice(0, 3)
                  .map((stat, index) => {
                    const ayahText = SURAT_AL_KAHF_AYAHS.find(
                      a => a.number === stat.ayah_number
                    )?.text.slice(0, 50) + "...";
                    return (
                      <div key={stat.ayah_number} className="p-2 rounded-lg bg-muted/50">
                        <div className="flex justify-between items-center">
                          <span className="font-semibold">آية {stat.ayah_number}</span>
                          <span className="text-primary font-bold">{stat.count}</span>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1 font-arabic">
                          {ayahText}
                        </p>
                      </div>
                    );
                  })}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-center font-arabic">أكثر الكلمات في العناوين</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap justify-center gap-2">
                {wordCloudData.slice(0, 15).map((item, index) => (
                  <span
                    key={item.text}
                    className="inline-block px-2 py-1 rounded-full bg-primary/10 text-primary"
                    style={{
                      fontSize: `${Math.max(0.8, Math.min(2, 0.8 + item.value * 0.1))}rem`,
                    }}
                  >
                    {item.text}
                  </span>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="mb-12">
          <CardHeader>
            <CardTitle className="text-center font-arabic">توزيع التأملات حسب الآيات</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} layout="vertical">
                  <XAxis type="number" />
                  <YAxis
                    dataKey="ayah"
                    type="category"
                    width={60}
                    tick={{ fontSize: 12 }}
                  />
                  <Tooltip
                    formatter={(value) => [`${value} تأمل`, "العدد"]}
                    labelFormatter={(label) => `${label}`}
                  />
                  <Bar
                    dataKey="count"
                    fill="hsl(var(--primary))"
                    radius={[0, 4, 4, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default StatsPage;