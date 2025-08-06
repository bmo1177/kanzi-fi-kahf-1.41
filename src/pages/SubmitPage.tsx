import { ReflectionForm } from "@/components/ReflectionForm";

const SubmitPage = () => {
  return (
    <div className="min-h-screen bg-gradient-subtle" dir="rtl">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-arabic font-bold gradient-text mb-4">
            شاركي تأملك
          </h1>
          <p className="text-muted-foreground">
            اختاري آية من سورة الكهف وشاركينا كنزك المكتشف
          </p>
        </div>
        <ReflectionForm />
      </div>
    </div>
  );
};

export default SubmitPage;