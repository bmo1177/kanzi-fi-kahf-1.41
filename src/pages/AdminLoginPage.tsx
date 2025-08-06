import { LoginForm } from "@/components/auth/LoginForm";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/components/auth/AuthProvider";
import { useEffect } from "react";

const AdminLoginPage = () => {
  const navigate = useNavigate();
  const { user, isAdmin } = useAuth();

  useEffect(() => {
    if (user && isAdmin) {
      navigate("/admin/dashboard");
    }
  }, [user, isAdmin, navigate]);

  const handleLoginSuccess = () => {
    navigate("/admin/dashboard");
  };

  return (
    <div className="min-h-screen bg-gradient-subtle flex items-center justify-center p-4" dir="rtl">
      <div className="w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-8 gradient-text font-arabic">
          تسجيل دخول المشرفة
        </h1>
        <LoginForm onSuccess={handleLoginSuccess} />
      </div>
    </div>
  );
};

export default AdminLoginPage;