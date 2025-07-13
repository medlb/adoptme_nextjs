import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { username } = await request.json()

    if (!username || typeof username !== 'string') {
      return NextResponse.json(
        { error: 'Username is required' },
        { status: 400 }
      )
    }

    // First, get the user ID from username
    const userResponse = await fetch('https://users.roblox.com/v1/usernames/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ usernames: [username.trim()] }),
    })

    if (!userResponse.ok) {
      return NextResponse.json(
        { error: 'Failed to fetch user data from Roblox' },
        { status: userResponse.status }
      )
    }

    const userData = await userResponse.json()
    
    if (!userData.data || userData.data.length === 0) {
      return NextResponse.json(
        { error: 'Roblox user not found' },
        { status: 404 }
      )
    }

    const userId = userData.data[0].id
    const robloxUsername = userData.data[0].name

    // Then, get the user's headshot
    const headshotResponse = await fetch(`https://thumbnails.roblox.com/v1/users/avatar-headshot?userIds=${userId}&size=420x420&format=Png`)
    
    if (!headshotResponse.ok) {
      return NextResponse.json(
        { error: 'Failed to fetch headshot from Roblox' },
        { status: headshotResponse.status }
      )
    }

    const headshotData = await headshotResponse.json()
    
    if (!headshotData.data || headshotData.data.length === 0) {
      return NextResponse.json(
        { error: 'Headshot not found' },
        { status: 404 }
      )
    }

    const headshotUrl = headshotData.data[0].imageUrl

    // Return the RobloxUser object
    return NextResponse.json({
      id: userId,
      username: robloxUsername,
      image: headshotUrl
    })

  } catch (error) {
    console.error('Error fetching Roblox user:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
} 