import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'IST Lab - Information Science & Technology Laboratory',
  description: '국립군산대학교 소프트웨어학과 IST Lab은 정보과학기술 분야의 혁신적인 연구를 통해 미래 기술 발전에 기여하고 있습니다.',
  keywords: ['IST Lab', '정보과학기술', '군산대학교', '소프트웨어학과', '연구실', 'Database', 'AI', 'Machine Learning'],
  authors: [{ name: 'IST Lab, Kunsan National University' }],
  creator: 'IST Lab',
  publisher: 'Kunsan National University',
  robots: 'index, follow',
  openGraph: {
    type: 'website',
    locale: 'ko_KR',
    url: 'https://istlab.kunsan.ac.kr',
    title: 'IST Lab - Information Science & Technology Laboratory',
    description: '국립군산대학교 소프트웨어학과 IST Lab은 정보과학기술 분야의 혁신적인 연구를 통해 미래 기술 발전에 기여하고 있습니다.',
    siteName: 'IST Lab',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'IST Lab - Information Science & Technology Laboratory',
    description: '국립군산대학교 소프트웨어학과 IST Lab은 정보과학기술 분야의 혁신적인 연구를 통해 미래 기술 발전에 기여하고 있습니다.',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  )
}
