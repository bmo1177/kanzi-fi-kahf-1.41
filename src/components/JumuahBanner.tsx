import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { X } from "lucide-react";

export const JumuahBanner = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isJumuah, setIsJumuah] = useState(false);
  const [isRamadan, setIsRamadan] = useState(false);
  
  useEffect(() => {
    // Check if today is Friday (5 is Friday in JavaScript Date)
    const today = new Date();
    const isFriday = today.getDay() === 5;
    
    // Check if it's Ramadan (this is a simplified check, in a real app you'd use a Hijri calendar library)
    // This is just a placeholder - you would need a proper Hijri calendar calculation
    const isRamadanMonth = false; // Replace with actual Ramadan check
    
    setIsJumuah(isFriday);
    setIsRamadan(isRamadanMonth);
    setIsVisible(isFriday || isRamadanMonth);
    
    // Check localStorage for manual override
    const manualSetting = localStorage.getItem('jumuah-mode');
    if (manualSetting === 'enabled') {
      setIsVisible(true);
    } else if (manualSetting === 'disabled') {
      setIsVisible(false);
    }
  }, []);
  
  const toggleVisibility = () => {
    const newState = !isVisible;
    setIsVisible(newState);
    localStorage.setItem('jumuah-mode', newState ? 'enabled' : 'disabled');
  };
  
  if (!isVisible) return null;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative w-full bg-gradient-to-r from-primary/20 via-primary/30 to-primary/20 py-3 px-4 text-center"
    >
      <div 
        className="absolute inset-0 opacity-10" 
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23d4af37' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />
      <div className="font-arabic text-lg">
        {isJumuah && (
          <span>✨ زادكِ الله نورًا في يوم الجمعة 🤍 ✨</span>
        )}
        {isRamadan && (
          <span>✨ رمضان كريم، تقبل الله صيامكم وقيامكم 🌙 ✨</span>
        )}
        {!isJumuah && !isRamadan && (
          <span>✨ زادكِ الله نورًا وبركة 🤍 ✨</span>
        )}
      </div>
      <button 
        onClick={toggleVisibility}
        className="absolute right-2 top-1/2 transform -translate-y-1/2 text-foreground/60 hover:text-foreground transition-colors"
        aria-label="إغلاق"
      >
        <X size={18} />
      </button>
    </motion.div>
  );
};