import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background overflow-hidden" dir="rtl">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-4xl mx-auto"
        >
          <h1 className="text-5xl md:text-7xl font-arabic font-bold gradient-text mb-8 leading-tight">
            كنزي في سورة الكهف
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground mb-6 leading-relaxed">
            في كل آية كنز ينتظر قلبكِ...
          </p>
          
          <p className="text-lg text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed">
            تحدٍ تفاعلي لمجموعة دراسة القرآن للفتيات
            <br />
            تحت إشراف المعلمة نور الإيمان
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <Link to="/submit">
              <Button
                size="lg"
                className="bg-gradient-primary text-primary-foreground hover:shadow-glow transition-all duration-300 text-lg px-8 py-6 rounded-xl font-arabic"
              >
                ابدئي رحلتك الآن ✨
              </Button>
            </Link>
            
            <Link to="/gallery">
              <Button
                variant="outline"
                size="lg"
                className="border-primary/30 hover:bg-primary/10 text-lg px-8 py-6 rounded-xl backdrop-blur-sm font-arabic"
              >
                استكشفي ركن الكنوز 📿
              </Button>
            </Link>
          </div>
        </motion.div>

        {/* Features Section */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto"
        >
          <div className="elegant-card text-center p-8 rounded-2xl animate-fade-in">
            <div className="text-5xl mb-6">🔍</div>
            <h3 className="text-xl font-semibold mb-4 font-arabic">تأمل عميق</h3>
            <p className="text-muted-foreground leading-relaxed">
              اكتشفي الكنوز المخفية في آيات سورة الكهف من خلال التأمل والتدبر
            </p>
          </div>
          
          <div className="elegant-card text-center p-8 rounded-2xl animate-fade-in" style={{ animationDelay: '0.1s' }}>
            <div className="text-5xl mb-6">💎</div>
            <h3 className="text-xl font-semibold mb-4 font-arabic">شاركي إلهامك</h3>
            <p className="text-muted-foreground leading-relaxed">
              شاركي تأملاتك مع الأخريات وألهمي المجتمع بكنوزك المكتشفة
            </p>
          </div>
          
          <div className="elegant-card text-center p-8 rounded-2xl animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <div className="text-5xl mb-6">🌟</div>
            <h3 className="text-xl font-semibold mb-4 font-arabic">نمو روحاني</h3>
            <p className="text-muted-foreground leading-relaxed">
              انضمي لرحلة جماعية من النمو الروحاني والتعلم المشترك
            </p>
          </div>
        </motion.div>

        {/* Quote Section */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-center mt-20 p-8 elegant-card rounded-2xl max-w-3xl mx-auto"
        >
          <p className="text-xl font-arabic leading-loose text-primary mb-4">
            "وَاتْلُ مَا أُوحِيَ إِلَيْكَ مِن كِتَابِ رَبِّكَ ۖ لَا مُبَدِّلَ لِكَلِمَاتِهِ وَلَن تَجِدَ مِن دُونِهِ مُلْتَحَدًا"
          </p>
          <p className="text-sm text-muted-foreground">
            سورة الكهف - آية ٢٧
          </p>
        </motion.div>

        {/* Call to Action - Updated with additional links */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center mt-16 space-y-6"
        >
          <p className="text-muted-foreground mb-2">
            هل أنتِ مستعدة لاكتشاف كنوزك؟
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/submit">
              <Button 
                variant="outline" 
                size="lg"
                className="hover:scale-105 transition-transform duration-200 font-arabic"
              >
                ابدئي الآن
              </Button>
            </Link>
            
            <Link to="/duaa">
              <Button 
                variant="outline" 
                size="lg"
                className="hover:scale-105 transition-transform duration-200 font-arabic"
              >
                لوحة الدعاء 🤲
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Index;
