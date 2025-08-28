import { NextRequest, NextResponse } from 'next/server';

const paymentStatuses = new Map<string, { 
  status: 'pending' | 'success' | 'failed', 
  timestamp: number,
  amount?: number,
  mpesaRef?: string 
}>();

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const checkoutRequestId = searchParams.get('checkoutRequestId');
  
  if (!checkoutRequestId) {
    return NextResponse.json({ error: 'Missing checkoutRequestId' }, { status: 400 });
  }

  // Development mode - simulate payment success after 5 seconds
  const isDevMode = process.env.MPESA_DEV_MODE === 'true';
  if (isDevMode && checkoutRequestId.startsWith('ws_CO_')) {
    const status = paymentStatuses.get(checkoutRequestId);
    const now = Date.now();
    
    if (!status) {
      // First time checking - set as pending
      paymentStatuses.set(checkoutRequestId, {
        status: 'pending',
        timestamp: now
      });
      return NextResponse.json({ 
        status: 'pending', 
        message: 'Development: Payment initiated' 
      });
    }
    
    // After 5 seconds, mark as successful
    if (now - status.timestamp > 5000) {
      paymentStatuses.set(checkoutRequestId, {
        status: 'success',
        timestamp: now,
        amount: 5000, // Mock amount
        mpesaRef: `DEV${Math.random().toString(36).substr(2, 9).toUpperCase()}`
      });
      return NextResponse.json({
        status: 'success',
        amount: 5000,
        mpesaRef: `DEV${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
        message: 'Development: Payment completed successfully'
      });
    }
    
    return NextResponse.json({ 
      status: 'pending', 
      message: 'Development: Payment in progress...' 
    });
  }

  const status = paymentStatuses.get(checkoutRequestId);
  
  if (!status) {
    return NextResponse.json({ 
      status: 'pending', 
      message: 'Payment status not found' 
    });
  }

  // Clean up old entries (older than 10 minutes)
  if (Date.now() - status.timestamp > 10 * 60 * 1000) {
    paymentStatuses.delete(checkoutRequestId);
    return NextResponse.json({ 
      status: 'failed', 
      message: 'Payment timeout' 
    });
  }

  return NextResponse.json({
    status: status.status,
    amount: status.amount,
    mpesaRef: status.mpesaRef,
    message: status.status === 'success' ? 'Payment completed successfully' : 
             status.status === 'failed' ? 'Payment failed' : 'Payment in progress'
  });
}

export async function POST(request: NextRequest) {
  const { checkoutRequestId, status, amount, mpesaRef } = await request.json();
  
  if (!checkoutRequestId || !status) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  }

  paymentStatuses.set(checkoutRequestId, {
    status,
    timestamp: Date.now(),
    amount,
    mpesaRef
  });

  return NextResponse.json({ message: 'Status updated' });
}
