import { NextRequest, NextResponse } from 'next/server'

export async function GET() {
  try {
    const res = await fetch('http://localhost:5000/api/publications', {
      cache: 'no-store'
    })
    
    if (!res.ok) {
      throw new Error('Failed to fetch publications')
    }
    
    const publications = await res.json()
    
    return NextResponse.json(publications, {
      headers: {
        'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600'
      }
    })
  } catch (error) {
    console.error('Error fetching publications:', error)
    return NextResponse.json(
      { error: 'Failed to fetch publications' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    
    const res = await fetch('http://localhost:5000/api/publications', {
      method: 'POST',
      body: formData,
    })
    
    if (!res.ok) {
      throw new Error('Failed to create publication')
    }
    
    const result = await res.json()
    
    return NextResponse.json(result)
  } catch (error) {
    console.error('Error creating publication:', error)
    return NextResponse.json(
      { error: 'Failed to create publication' },
      { status: 500 }
    )
  }
}