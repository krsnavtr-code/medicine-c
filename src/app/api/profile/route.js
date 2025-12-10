import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const response = await fetch(`/api/v1/profile`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-store',
    });

    const data = await response.json();
    
    if (!response.ok) {
      console.error('Backend error:', data);
      return NextResponse.json(
        { 
          success: false, 
          message: data.message || 'Failed to fetch profile',
          error: data.error
        },
        { status: response.status }
      );
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error('Error in profile API route:', error);
    return NextResponse.json(
      { 
        success: false, 
        message: 'Failed to fetch profile',
        error: process.env.NODE_ENV === 'development' ? error.message : undefined
      },
      { status: 500 }
    );
  }
}
