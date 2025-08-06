import { saadiTafsirSections } from '@/data/tafsir';

export default function TafsirPage() {
  return (
    <div className="min-h-screen p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-arabic font-bold mb-8 text-center">
        تفسير السعدي - سورة الكهف
      </h1>
      
      <div className="space-y-8">
        {saadiTafsirSections.map((section, index) => (
          <section key={index} className="bg-white/10 p-6 rounded-lg">
            <h2 className="font-arabic text-2xl mb-4 text-primary">
              {section.title}
            </h2>
            <div className="font-arabic text-lg leading-loose text-justify
              tracking-wide rtl space-y-4 text-gray-200">
              {section.content}
            </div>
          </section>
        ))}
      </div>
    </div>
  )
}