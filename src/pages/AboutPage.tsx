import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-gradient-subtle" dir="rtl">
      <div className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-4xl mx-auto"
        >
          <h1 className="text-5xl md:text-6xl font-arabic font-bold gradient-text mb-8">
            عن غيمات الهدى
          </h1>
          
          <p className="text-xl text-muted-foreground mb-12 leading-relaxed">
            مجموعة دراسة القرآن للفتيات - رحلة روحانية في أعماق كتاب الله
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-4xl mx-auto space-y-8"
        >
          {/* Mission Section */}
          <Card className="elegant-card">
            <CardContent className="p-8">
              <h2 className="text-2xl font-arabic font-bold mb-6 text-center">
                🌟 رسالتنا الروحانية 🌟
              </h2>
              <p className="text-lg leading-loose font-arabic text-center mb-6">
                غايتنا أن نُرضي الله، ونرتقي بتدبر كتابه، ونمشي في طريق الجنة سويًا 🤍
              </p>
              <div className="text-center">
                <div className="inline-block bg-primary/10 rounded-full p-4">
                  <span className="text-4xl">🕌</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Supervision Section */}
          <Card className="elegant-card">
            <CardContent className="p-8 text-center">
              <h3 className="text-xl font-arabic font-semibold mb-4">
                بإشراف المعلمة المباركة
              </h3>
              <div className="text-3xl font-arabic font-bold gradient-text mb-4">
                نور الإيمان ✨
              </div>
              <p className="text-muted-foreground">
                التي تضيء لنا طريق التدبر والفهم
              </p>
            </CardContent>
          </Card>

          {/* About the Group */}
          <Card className="elegant-card">
            <CardContent className="p-8">
              <h3 className="text-2xl font-arabic font-bold mb-6 text-center">
                🌙 عن مجموعتنا 🌙
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="text-center">
                  <div className="text-4xl mb-4">📖</div>
                  <h4 className="font-arabic font-semibold mb-2">التدبر العميق</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    نتأمل في آيات سورة الكهف بقلوب خاشعة، نستخرج الدرر والكنوز المخفية في كلام رب العالمين
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="text-4xl mb-4">🤝</div>
                  <h4 className="font-arabic font-semibold mb-2">الأخوة في الله</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    نجتمع حباً في الله وطلباً لرضاه، نتشارك التأملات ونتعلم من بعضنا البعض
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="text-4xl mb-4">🌱</div>
                  <h4 className="font-arabic font-semibold mb-2">النمو الروحاني</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    هدفنا الارتقاء بأنفسنا وإيماننا من خلال تدبر القرآن والعمل بما نتعلم
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="text-4xl mb-4">✨</div>
                  <h4 className="font-arabic font-semibold mb-2">طريق الجنة</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    نسعى معاً نحو رضا الله والفوز بجنته، نتزود بالتقوى ونستمسك بحبل الله
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quranic Quote */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-center"
          >
            <Card className="elegant-card bg-primary/5">
              <CardContent className="p-8">
                <div className="text-4xl mb-6">🌟</div>
                <p className="text-xl font-arabic leading-loose text-primary mb-4">
                  "إِنَّ الَّذِينَ آمَنُوا وَعَمِلُوا الصَّالِحَاتِ كَانَتْ لَهُمْ جَنَّاتُ الْفِرْدَوْسِ نُزُلًا * خَالِدِينَ فِيهَا لَا يَبْغُونَ عَنْهَا حِوَلًا"
                </p>
                <p className="text-sm text-muted-foreground">
                  سورة الكهف - الآيات ١٠٧-١٠٨
                </p>
                <div className="mt-6 text-muted-foreground">
                  <p className="italic">
                    هذه آيات تذكرنا بوعد الله الحق لمن آمن وعمل صالحاً
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Call to Action */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-center"
          >
            <Card className="elegant-card">
              <CardContent className="p-8">
                <h3 className="text-xl font-arabic font-bold mb-4">
                  انضمي إلى رحلتنا المباركة 🌙
                </h3>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  شاركينا في استكشاف كنوز سورة الكهف، وكوني جزءاً من هذه الأسرة المباركة
                  <br />
                  فالخير يزداد بالمشاركة، والأجر يتضاعف بالجماعة
                </p>
                <div className="flex justify-center space-x-4 space-x-reverse">
                  <span className="text-2xl">🤍</span>
                  <span className="text-2xl">🌟</span>
                  <span className="text-2xl">🤍</span>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default AboutPage;