import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface Sparkle {
  id: number;
  size: number;
  style: {
    top: string;
    left: string;
    opacity: number;
    transform: string;
  };
}

export const SparklesBackground = () => {
  const [sparkles, setSparkles] = useState<Sparkle[]>([]);
  
  useEffect(() => {
    const generateSparkles = () => {
      const newSparkles = [];
      const count = Math.floor(window.innerWidth / 40); // Responsive count
      
      for (let i = 0; i < count; i++) {
        newSparkles.push({
          id: i,
          size: Math.random() * 4 + 1,
          style: {
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            opacity: Math.random() * 0.5 + 0.3,
            transform: `rotate(${Math.random() * 360}deg)`,
          },
        });
      }
      
      setSparkles(newSparkles);
    };
    
    generateSparkles();
    
    const handleResize = () => {
      generateSparkles();
    };
    
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {sparkles.map((sparkle) => (
        <motion.div
          key={sparkle.id}
          className="absolute rounded-full bg-primary"
          style={{
            width: `${sparkle.size}px`,
            height: `${sparkle.size}px`,
            ...sparkle.style,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [sparkle.style.opacity, sparkle.style.opacity * 1.5, sparkle.style.opacity],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 3 + Math.random() * 5,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
            delay: Math.random() * 5,
          }}
        />
      ))}
    </div>
  );
};