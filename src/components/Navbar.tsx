import { Link, useLocation } from "react-router-dom";
import { ThemeToggle } from "./ThemeToggle";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { useState } from "react";
import { useAuth } from "@/components/auth/AuthProvider";

export const Navbar = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const { isAdmin } = useAuth();

  const navigation = [
    { name: "الرئيسية", href: "/" },
    { name: "شاركي تأملك", href: "/submit" },
    { name: "ركن الكنوز", href: "/gallery" },
    { name: "عن المجموعة", href: "/about" },
    { name: "الإدارة", href: "/admin", adminOnly: true },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link 
            to="/" 
            className="font-arabic text-lg md:text-xl font-bold gradient-text hover:scale-105 transition-transform duration-200"
          >
            كنزي في سورة الكهف
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6 space-x-reverse">
            {navigation.map((item) => {
              // Hide admin link if not admin
              if (item.adminOnly && !isAdmin) return null;
              
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`font-arabic text-sm lg:text-base transition-all duration-200 px-3 py-2 rounded-lg hover:bg-primary/10 ${
                    isActive(item.href)
                      ? "text-primary font-semibold bg-primary/5"
                      : "text-foreground hover:text-primary"
                  }`}
                >
                  {item.name}
                </Link>
              );
            })}
          </div>

          {/* Mobile + Theme Toggle */}
          <div className="flex items-center gap-2">
            <ThemeToggle />
            
            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden h-9 w-9 p-0"
              onClick={() => setIsOpen(!isOpen)}
            >
              <Menu className="h-5 w-5" />
              <span className="sr-only">فتح القائمة</span>
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden border-t border-border/50 bg-background/95 backdrop-blur-md">
            <div className="py-4 space-y-2">
              {navigation.map((item) => {
                // Hide admin link if not admin
                if (item.adminOnly && !isAdmin) return null;
                
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    onClick={() => setIsOpen(false)}
                    className={`block font-arabic text-base px-4 py-3 rounded-lg transition-all duration-200 ${
                      isActive(item.href)
                        ? "text-primary font-semibold bg-primary/5 border-r-2 border-primary"
                        : "text-foreground hover:text-primary hover:bg-primary/10"
                    }`}
                  >
                    {item.name}
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};
<nav className="hidden md:flex gap-6">
  <Link to="/tafsir" className="hover:text-primary">
    تفسير السعدي
  </Link>
</nav>