import { NextRequest, NextResponse } from 'next/server';
import { MpesaService } from '../../../lib/mpesa';
import { TililSMSService } from '../../../lib/tilil-sms';

export async function POST(request: NextRequest) {
  try {
    const callbackData = await request.json();
    console.log('M-Pesa Callback received:', JSON.stringify(callbackData, null, 2));

    const parsedCallback = MpesaService.parseCallbackData(callbackData);
    const sms = new TililSMSService();

    if (parsedCallback.success) {
      console.log('Payment completed successfully:', {
        amount: parsedCallback.amount,
        mpesaReceiptNumber: parsedCallback.mpesaReceiptNumber,
        phoneNumber: parsedCallback.phoneNumber,
      });

      try {
        await fetch(`${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/api/mpesa/status`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            checkoutRequestId: parsedCallback.checkoutRequestId,
            status: 'success',
            amount: parsedCallback.amount,
            mpesaRef: parsedCallback.mpesaReceiptNumber
          })
        });
      } catch (error) {
        console.error('Failed to update payment status:', error);
      }

      // Send success SMS - "Siscom has received your payment"
      try {
        const ticketType = (parsedCallback.amount === 5000) ? 'Standard' : 'Corporate';
        const confirmationMessage = `Siscom has received your payment of KES ${parsedCallback.amount?.toLocaleString()} for Capitalized ${ticketType} subscription. Ref: ${parsedCallback.mpesaReceiptNumber}. Thank you!`;

        if (parsedCallback.phoneNumber) {
          await sms.sendSMS(parsedCallback.phoneNumber, confirmationMessage);
          console.log('SMS confirmation sent for successful payment to:', parsedCallback.phoneNumber);
          console.log('Message:', confirmationMessage);
        }
      } catch (smsError) {
        console.error('Failed to send success SMS:', smsError);
        // Don't fail the callback because of SMS error
      }

    } else {
      // Payment failed
      console.log('Payment failed:', {
        reason: parsedCallback.message,
        phoneNumber: parsedCallback.phoneNumber,
      });

      // Update payment status
      try {
        await fetch(`${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/api/mpesa/status`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            checkoutRequestId: parsedCallback.checkoutRequestId,
            status: 'failed'
          })
        });
      } catch (error) {
        console.error('Failed to update payment status:', error);
      }

      // Send failure SMS if we have the phone number
      if (parsedCallback.phoneNumber) {
        try {
          const failureMessage = sms.generatePaymentFailedMessage();
          await sms.sendSMS(parsedCallback.phoneNumber, failureMessage);
          console.log('SMS request sent for failed payment to:', parsedCallback.phoneNumber);
        } catch (smsError) {
          console.error('Failed to send failure SMS:', smsError);
        }
      }
    }

    return NextResponse.json({ message: 'Callback processed successfully' });
  } catch (error) {
    console.error('Callback processing error:', error);
    
    return NextResponse.json({ message: 'Callback received' });
  }
}
