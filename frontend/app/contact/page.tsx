import { Metadata } from 'next'
import Navigation from "@/components/navigation-static"
import ContactSection from "@/components/contact-section"
import Footer from "@/components/footer"

export const metadata: Metadata = {
  title: 'Contact - IST Lab',
  description: 'IST Lab에 문의사항이 있으시면 언제든지 연락해 주세요.',
  openGraph: {
    title: 'Contact - IST Lab',
    description: 'IST Lab에 문의사항이 있으시면 언제든지 연락해 주세요.',
  },
}

// SSG로 빌드 시점에 생성
export default function ContactPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <main className="pt-16">
        <ContactSection />
      </main>
      <Footer />
    </div>
  )
}