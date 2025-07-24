import { Metadata } from 'next'
import Navigation from "@/components/navigation-static"
import AboutSection from "@/components/about-section"
import Footer from "@/components/footer"

export const metadata: Metadata = {
  title: 'About - IST Lab',
  description: 'IST Lab 소개 - 정보과학기술 분야의 선도적 연구를 통해 미래를 만들어가는 연구실입니다.',
  openGraph: {
    title: 'About - IST Lab',
    description: 'IST Lab 소개 - 정보과학기술 분야의 선도적 연구를 통해 미래를 만들어가는 연구실입니다.',
  },
}

// SSG로 빌드 시점에 생성
export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <main className="pt-16">
        <AboutSection />
      </main>
      <Footer />
    </div>
  )
}