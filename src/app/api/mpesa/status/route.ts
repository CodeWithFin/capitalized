import { NextRequest, NextResponse } from 'next/server';

const paymentStatuses = new Map<string, { 
  status: 'pending' | 'success' | 'failed', 
  timestamp: number,
  amount?: number,
  mpesaRef?: string,
  ticketType?: 'individual' | 'corporate',
  quantity?: number,
  isClubMember?: boolean
}>();

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const checkoutRequestId = searchParams.get('checkoutRequestId');
  
  if (!checkoutRequestId) {
    return NextResponse.json({ error: 'Missing checkoutRequestId' }, { status: 400 });
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
    ticketType: status.ticketType,
    quantity: status.quantity,
    isClubMember: status.isClubMember,
    message: status.status === 'success' ? 'Payment completed successfully' : 
             status.status === 'failed' ? 'Payment failed' : 'Payment in progress'
  });
}

export async function POST(request: NextRequest) {
  const { checkoutRequestId, status, amount, mpesaRef, ticketType, quantity, isClubMember } = await request.json();
  
  if (!checkoutRequestId || !status) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  }

  paymentStatuses.set(checkoutRequestId, {
    status,
    timestamp: Date.now(),
    amount,
    mpesaRef,
    ticketType,
    quantity,
    isClubMember
  });

  return NextResponse.json({ message: 'Status updated' });
}