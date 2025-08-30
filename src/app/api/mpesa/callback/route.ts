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
        // Get existing payment details first
        const statusResponse = await fetch(`${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/api/mpesa/status?checkoutRequestId=${parsedCallback.checkoutRequestId}`);
        const existingStatus = await statusResponse.json();
        
        console.log('Existing status before update:', existingStatus);
        
        await fetch(`${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/api/mpesa/status`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            checkoutRequestId: parsedCallback.checkoutRequestId,
            status: 'success',
            amount: parsedCallback.amount,
            mpesaRef: parsedCallback.mpesaReceiptNumber,
            ticketType: existingStatus.ticketType,
            quantity: existingStatus.quantity,
            isClubMember: existingStatus.isClubMember
          })
        });

        // Send success SMS using the data we already have
        const ticketType = existingStatus.ticketType || 'individual';
        const quantity = existingStatus.quantity || 1;
        
        console.log('SMS Debug - Ticket Type:', ticketType, 'Quantity:', quantity, 'Status Data:', existingStatus);
        
        let confirmationMessage: string;
        
        if (ticketType === 'corporate') {
          const packageText = quantity > 1 ? `${quantity} Corporate Packages` : 'Corporate Package';
          confirmationMessage = `Payment Confirmed! Your slot for Capitalized ${packageText} is secured (admits 5 people each). Amount: KES ${parsedCallback.amount?.toLocaleString()}  Ref: ${parsedCallback.mpesaReceiptNumber}. Perfect for group networking! For support, contact us at events@capitalized.events`;
        } else {
          const ticketText = quantity > 1 ? `${quantity} Individual tickets` : 'Individual ticket';
          confirmationMessage = `Payment Confirmed! Your slot for Capitalized Fireside ${ticketText} is secured. Amount: KES ${parsedCallback.amount?.toLocaleString()} Ref: ${parsedCallback.mpesaReceiptNumber}. Thank you for joining and get ready to network! For support, contact us at events@capitalized.events`;
        }

        if (parsedCallback.phoneNumber) {
          await sms.sendSMS(parsedCallback.phoneNumber, confirmationMessage);
          console.log('SMS confirmation sent for successful payment to:', parsedCallback.phoneNumber);
          console.log('Message:', confirmationMessage);
        }
      } catch (error) {
        console.error('Failed to update payment status:', error);
      }

    } else {
      // Payment failed
      console.log('Payment failed:', {
        reason: parsedCallback.message,
        phoneNumber: parsedCallback.phoneNumber,
      });

      // Update payment status
      try {
        // Get existing payment details first
        const statusResponse = await fetch(`${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/api/mpesa/status?checkoutRequestId=${parsedCallback.checkoutRequestId}`);
        const existingStatus = await statusResponse.json();
        
        await fetch(`${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/api/mpesa/status`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            checkoutRequestId: parsedCallback.checkoutRequestId,
            status: 'failed',
            ticketType: existingStatus.ticketType,
            quantity: existingStatus.quantity,
            isClubMember: existingStatus.isClubMember
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
