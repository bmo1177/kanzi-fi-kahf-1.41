import { useAuth } from "@/components/auth/AuthProvider";
import { LoginForm } from "@/components/auth/LoginForm";
import { AdminDashboard } from "@/components/admin/AdminDashboard";
import { useState } from "react";

const AdminPage = () => {
  const { user, isAdmin, loading } = useAuth();
  const [showDashboard, setShowDashboard] = useState(false);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-subtle flex items-center justify-center" dir="rtl">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">جاري التحقق من الصلاحيات...</p>
        </div>
      </div>
    );
  }

  // Show login form if not authenticated
  if (!user) {
    return <LoginForm onSuccess={() => setShowDashboard(true)} />;
  }

  // Show access denied if authenticated but not admin
  if (user && !isAdmin) {
    return (
      <div className="min-h-screen bg-gradient-subtle flex items-center justify-center" dir="rtl">
        <div className="text-center max-w-md">
          <div className="text-6xl mb-6">🚫</div>
          <h1 className="text-2xl font-arabic font-bold mb-4">غير مصرح لك بالدخول</h1>
          <p className="text-muted-foreground mb-6">
            هذه الصفحة مخصصة للمشرفين المعتمدين فقط
          </p>
          <p className="text-sm text-muted-foreground">
            تم تسجيل دخولك كـ: {user.email}
          </p>
        </div>
      </div>
    );
  }

  // Show admin dashboard if authenticated and admin
  return <AdminDashboard />;
};

export default AdminPage;