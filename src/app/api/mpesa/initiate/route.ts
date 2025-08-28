import { NextRequest, NextResponse } from 'next/server';
import { MpesaService } from '../../../lib/mpesa';
import { savePaymentRecord } from '../../../lib/database';

export async function POST(request: NextRequest) {
  try {
    const { email, phoneNumber, amount, eventType, isClubMember, quantity = 1, clubId } = await request.json();

    // Validate input
    if (!email || !phoneNumber || !amount || !eventType) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Validate phone number format (Kenyan format)
    const phoneRegex = /^(?:254|\+254|0)[17]\d{8}$/;
    if (!phoneRegex.test(phoneNumber)) {
      return NextResponse.json(
        { error: 'Invalid Kenyan phone number format. Use 07XXXXXXXX or 254XXXXXXXX' },
        { status: 400 }
      );
    }

    // Validate amount (must be exactly 5000 or 50000)
    if (![5000, 50000].includes(Number(amount))) {
      return NextResponse.json(
        { error: 'Invalid amount. Must be 5000 (Standard) or 50000 (Corporate)' },
        { status: 400 }
      );
    }

    const mpesa = new MpesaService();

    // Use the exact amount provided (5000 or 50000)
    const paymentAmount = Number(amount);
    const ticketType = paymentAmount === 5000 ? 'Standard' : 'Corporate';
    
    console.log(`🎫 Initiating M-Pesa payment for ${ticketType} ticket`);
    console.log(`💰 Amount: KES ${paymentAmount.toLocaleString()}`);
    console.log(`📱 Phone: ${phoneNumber}`);

    try {
      const stkResponse = await mpesa.initiateStkPush(
        phoneNumber,
        paymentAmount,
        "Capitalized Payment",
        "Payment for Capitalized subscription"
      );

      if (stkResponse.ResponseCode === '0') {
        // Save payment record with enhanced information
        try {
          const ticketTypeForRecord = paymentAmount === 5000 ? 'individual' : 'corporate';
          savePaymentRecord({
            email,
            phoneNumber,
            amount: paymentAmount,
            eventType: paymentAmount.toString(),
            ticketType: ticketTypeForRecord,
            quantity: quantity || 1,
            isClubMember: isClubMember || false,
            clubId: isClubMember ? clubId : undefined,
            checkoutRequestId: stkResponse.CheckoutRequestID,
            merchantRequestId: stkResponse.MerchantRequestID,
            status: 'pending'
          });
        } catch (error) {
          console.error('Failed to save payment record:', error);
        }

        try {
          await fetch(`${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/api/mpesa/status`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              checkoutRequestId: stkResponse.CheckoutRequestID,
              status: 'pending'
            })
          });
        } catch (error) {
          console.error('Failed to set initial payment status:', error);
        }

        return NextResponse.json({
          success: true,
          message: stkResponse.CustomerMessage,
          checkoutRequestId: stkResponse.CheckoutRequestID,
          merchantRequestId: stkResponse.MerchantRequestID,
        });
      } else {
        return NextResponse.json(
          { error: stkResponse.ResponseDescription },
          { status: 400 }
        );
      }
    } catch (mpesaError) {
      console.error('M-Pesa STK Push error:', mpesaError);
      
      return NextResponse.json(
        { error: 'Payment initiation failed. Please try again.' },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Payment initiation error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
