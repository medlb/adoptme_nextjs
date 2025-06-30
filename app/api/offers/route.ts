import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const userId = searchParams.get('user_id')

  if (!userId) {
    return NextResponse.json({ error: 'user_id is required' }, { status: 400 })
  }

  try {
    
    const response = await fetch(
      `https://d2jgih9urxpa47.cloudfront.net/public/offers/feed.php?user_id=225874&api_key=b9ac75c15c73861cdc3ceb5b213fb2d8&s1=&s2=`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )

    console.log(`External API response status: ${response.status}`)

    if (!response.ok) {
      const errorText = await response.text()
      console.error(`External API error: ${response.status} - ${errorText}`)
      throw new Error(`External API error: ${response.status} - ${errorText}`)
    }

    const responseText = await response.text()
    console.log(`External API response text: ${responseText.substring(0, 200)}...`)

    let offersData
    try {
      offersData = JSON.parse(responseText)
    } catch (parseError) {
      console.error('Failed to parse JSON response:', parseError)
      console.error('Response text:', responseText)
      throw new Error('Invalid JSON response from external API')
    }

    console.log(`Parsed offers data: ${offersData ? offersData.length : 0} offers`)
    
    return NextResponse.json(offersData)
  } catch (error) {
    console.error('Error in offers API route:', error)
    return NextResponse.json(
      { error: 'Failed to fetch offers', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
} 