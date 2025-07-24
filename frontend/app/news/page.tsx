import { Metadata } from 'next'
import Navigation from "@/components/navigation-static"
import NewsSection from "@/components/news-section-isr"
import Footer from "@/components/footer"

export const metadata: Metadata = {
  title: 'News - IST Lab',
  description: 'IST Lab의 최신 연구 성과와 소식을 확인하세요.',
  openGraph: {
    title: 'News - IST Lab',
    description: 'IST Lab의 최신 연구 성과와 소식을 확인하세요.',
  },
}

// ISR로 60초마다 재생성
export const revalidate = 60

async function getNews() {
  try {
    const res = await fetch('http://localhost:5000/api/news', {
      next: { revalidate: 60 }
    })
    if (!res.ok) throw new Error('Failed to fetch news')
    return res.json()
  } catch (error) {
    console.error('Error fetching news:', error)
    return []
  }
}

export default async function NewsPage() {
  const initialNews = await getNews()

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <main className="pt-16">
        <NewsSection initialNews={initialNews} />
      </main>
      <Footer />
    </div>
  )
}