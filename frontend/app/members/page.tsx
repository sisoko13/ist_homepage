import { Metadata } from 'next'
import Navigation from "@/components/navigation-static"
import MembersSection from "@/components/members-section"
import Footer from "@/components/footer"

export const metadata: Metadata = {
  title: 'Members - IST Lab',
  description: 'IST Lab의 우수한 연구원들을 소개합니다.',
  openGraph: {
    title: 'Members - IST Lab',
    description: 'IST Lab의 우수한 연구원들을 소개합니다.',
  },
}

// SSG로 빌드 시점에 생성 (멤버 정보는 자주 변경되지 않음)
export default function MembersPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <main className="pt-16">
        <MembersSection />
      </main>
      <Footer />
    </div>
  )
}