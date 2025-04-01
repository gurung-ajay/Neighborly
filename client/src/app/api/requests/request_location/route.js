import { NextResponse } from 'next/server';

export async function GET(request) {
  try {
    const response = await fetch(`http://localhost:9000/request/request_location/${request.body.postedBy}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      return NextResponse.json(errorData, { status: response.status });
    }

    const data = await response.json();
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error('Error fetching request location:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}