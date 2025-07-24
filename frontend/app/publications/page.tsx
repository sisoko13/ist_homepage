import { Metadata } from 'next'
import Navigation from "@/components/navigation-static"
import PublicationsSection from "@/components/publications-section-isr"
import Footer from "@/components/footer"

export const metadata: Metadata = {
  title: 'Publications - IST Lab',
  description: 'IST Lab에서 발표한 논문과 연구 성과를 소개합니다.',
  openGraph: {
    title: 'Publications - IST Lab',
    description: 'IST Lab에서 발표한 논문과 연구 성과를 소개합니다.',
  },
}

// ISR로 300초(5분)마다 재생성
export const revalidate = 300

async function getPublications() {
  try {
    const res = await fetch('http://localhost:5000/api/publications', {
      next: { revalidate: 300 }
    })
    if (!res.ok) throw new Error('Failed to fetch publications')
    return res.json()
  } catch (error) {
    console.error('Error fetching publications:', error)
    return []
  }
}

export default async function PublicationsPage() {
  const initialPublications = await getPublications()

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <main className="pt-16">
        <PublicationsSection initialPublications={initialPublications} />
      </main>
      <Footer />
    </div>
  )
}