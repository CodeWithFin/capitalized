import { NextRequest, NextResponse } from 'next/server';
import { MpesaService } from '@/lib/mpesa';
import { TililSMSService } from '@/lib/tilil-sms';

export async function POST(request: NextRequest) {
  try {
    const callbackData = await request.json();
    console.log('M-Pesa Callback received:', JSON.stringify(callbackData, null, 2));

    const parsedCallback = MpesaService.parseCallbackData(callbackData);
    const sms = new TililSMSService();

    if (parsedCallback.success) {
      // Payment was successful
      console.log('Payment completed successfully:', {
        amount: parsedCallback.amount,
        mpesaReceiptNumber: parsedCallback.mpesaReceiptNumber,
        phoneNumber: parsedCallback.phoneNumber,
      });

      // Send success SMS
      try {
        const successMessage = sms.generatePaymentConfirmationMessage(
          parsedCallback.amount,
          parsedCallback.mpesaReceiptNumber,
          'Capitalized Event'
        );

        await sms.sendSMS(parsedCallback.phoneNumber, successMessage);
        console.log('Success SMS sent to:', parsedCallback.phoneNumber);
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

      // Send failure SMS if we have the phone number
      if (parsedCallback.phoneNumber) {
        try {
          const failureMessage = sms.generatePaymentFailedMessage();
          await sms.sendSMS(parsedCallback.phoneNumber, failureMessage);
          console.log('Failure SMS sent to:', parsedCallback.phoneNumber);
        } catch (smsError) {
          console.error('Failed to send failure SMS:', smsError);
          // Don't fail the callback because of SMS error
        }
      }
    }

    // Always return success to M-Pesa to acknowledge receipt of callback
    return NextResponse.json({ message: 'Callback processed successfully' });
  } catch (error) {
    console.error('Callback processing error:', error);
    
    // Still return success to M-Pesa to avoid retries
    // Log the error for investigation
    return NextResponse.json({ message: 'Callback received' });
  }
}
