import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const timeoutData = await request.json();
    console.log('M-Pesa Timeout received:', JSON.stringify(timeoutData, null, 2));

    // Log timeout for monitoring purposes
    // You might want to update the payment status to 'timeout' here
    // or handle timeout scenarios based on your business logic

    return NextResponse.json({ message: 'Timeout acknowledged' });
  } catch (error) {
    console.error('Timeout processing error:', error);
    return NextResponse.json({ message: 'Timeout received' });
  }
}
