import { NextRequest, NextResponse } from 'next/server'

export async function GET() {
  try {
    const res = await fetch('http://localhost:5000/api/news', {
      cache: 'no-store' // 항상 최신 데이터
    })
    
    if (!res.ok) {
      throw new Error('Failed to fetch news')
    }
    
    const news = await res.json()
    
    return NextResponse.json(news, {
      headers: {
        'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300'
      }
    })
  } catch (error) {
    console.error('Error fetching news:', error)
    return NextResponse.json(
      { error: 'Failed to fetch news' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    
    const res = await fetch('http://localhost:5000/api/news', {
      method: 'POST',
      body: formData,
    })
    
    if (!res.ok) {
      throw new Error('Failed to create news')
    }
    
    const result = await res.json()
    
    // ISR 캐시 무효화
    // revalidatePath('/news') 사용 가능
    
    return NextResponse.json(result)
  } catch (error) {
    console.error('Error creating news:', error)
    return NextResponse.json(
      { error: 'Failed to create news' },
      { status: 500 }
    )
  }
}