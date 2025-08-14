import crypto from 'crypto';

interface MpesaAccessTokenResponse {
  access_token: string;
  expires_in: string;
}

interface MpesaSTKPushResponse {
  MerchantRequestID: string;
  CheckoutRequestID: string;
  ResponseCode: string;
  ResponseDescription: string;
  CustomerMessage: string;
}

interface MpesaCallbackData {
  Body: {
    stkCallback: {
      MerchantRequestID: string;
      CheckoutRequestID: string;
      ResultCode: number;
      ResultDesc: string;
      CallbackMetadata?: {
        Item: Array<{
          Name: string;
          Value: string | number;
        }>;
      };
    };
  };
}

export class MpesaService {
  private consumerKey: string;
  private consumerSecret: string;
  private shortcode: string;
  private passkey: string;
  private environment: string;
  private baseUrl: string;

  constructor() {
    this.consumerKey = process.env.MPESA_CONSUMER_KEY!;
    this.consumerSecret = process.env.MPESA_CONSUMER_SECRET!;
    this.shortcode = process.env.MPESA_SHORTCODE!;
    this.passkey = process.env.MPESA_PASSKEY!;
    this.environment = process.env.MPESA_ENVIRONMENT || 'sandbox';
    this.baseUrl = this.environment === 'production' 
      ? 'https://api.safaricom.co.ke' 
      : 'https://sandbox.safaricom.co.ke';
  }

  private generateTimestamp(): string {
    const date = new Date();
    return date.toISOString().replace(/[^0-9]/g, '').slice(0, 14);
  }

  private generatePassword(timestamp: string): string {
    const data = this.shortcode + this.passkey + timestamp;
    return Buffer.from(data).toString('base64');
  }

  private async getAccessToken(): Promise<string> {
    const auth = Buffer.from(`${this.consumerKey}:${this.consumerSecret}`).toString('base64');
    
    console.log('Getting M-Pesa access token from:', `${this.baseUrl}/oauth/v1/generate?grant_type=client_credentials`);
    console.log('Consumer Key:', this.consumerKey ? `${this.consumerKey.substring(0, 10)}...` : 'NOT SET');
    
    const response = await fetch(`${this.baseUrl}/oauth/v1/generate?grant_type=client_credentials`, {
      method: 'GET',
      headers: {
        'Authorization': `Basic ${auth}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error('Access token error:', response.status, response.statusText, errorData);
      throw new Error(`Failed to get access token: ${response.statusText} - ${errorData}`);
    }

    const data: MpesaAccessTokenResponse = await response.json();
    console.log('Access token obtained successfully. Length:', data.access_token?.length);
    console.log('Access token preview:', data.access_token ? `${data.access_token.substring(0, 20)}...` : 'NO TOKEN');
    return data.access_token;
  }

  async initiateStkPush(phoneNumber: string, amount: number, accountReference: string, transactionDesc: string): Promise<MpesaSTKPushResponse> {
    const accessToken = await this.getAccessToken();
    const timestamp = this.generateTimestamp();
    const password = this.generatePassword(timestamp);

    // Format phone number (remove leading 0 and add 254)
    const formattedPhone = phoneNumber.startsWith('0') 
      ? '254' + phoneNumber.substring(1)
      : phoneNumber.startsWith('254') 
        ? phoneNumber 
        : '254' + phoneNumber;

    const requestBody = {
      BusinessShortCode: this.shortcode,
      Password: password,
      Timestamp: timestamp,
      TransactionType: "CustomerPayBillOnline",
      Amount: amount,
      PartyA: formattedPhone,
      PartyB: this.shortcode,
      PhoneNumber: formattedPhone,
      CallBackURL: process.env.MPESA_CALLBACK_URL,
      AccountReference: accountReference,
      TransactionDesc: transactionDesc,
    };

    console.log('M-Pesa STK Push Request:', {
      url: `${this.baseUrl}/mpesa/stkpush/v1/processrequest`,
      body: requestBody,
      accessToken: accessToken ? `${accessToken.substring(0, 20)}...` : 'NO TOKEN',
      shortcode: this.shortcode,
      environment: this.environment,
    });

    try {
      const response = await fetch(`${this.baseUrl}/mpesa/stkpush/v1/processrequest`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      const responseData = await response.json();
      console.log('M-Pesa STK Push Response:', responseData);

      // Check if the response contains an error even with 200 status
      if (responseData.errorCode || responseData.errorMessage) {
        throw new Error(`STK Push failed: ${responseData.errorMessage || responseData.errorCode}`);
      }

      if (!response.ok) {
        throw new Error(`STK Push failed: ${response.statusText} - ${JSON.stringify(responseData)}`);
      }

      return responseData;
    } catch (error) {
      console.error('STK Push detailed error:', error);
      throw error;
    }
  }

  static parseCallbackData(callbackData: MpesaCallbackData) {
    const { stkCallback } = callbackData.Body;
    
    if (stkCallback.ResultCode !== 0) {
      return {
        success: false,
        message: stkCallback.ResultDesc,
        merchantRequestId: stkCallback.MerchantRequestID,
        checkoutRequestId: stkCallback.CheckoutRequestID,
      };
    }

    const callbackItems = stkCallback.CallbackMetadata?.Item || [];
    const parsedData: any = {
      success: true,
      merchantRequestId: stkCallback.MerchantRequestID,
      checkoutRequestId: stkCallback.CheckoutRequestID,
    };

    callbackItems.forEach(item => {
      switch (item.Name) {
        case 'Amount':
          parsedData.amount = item.Value;
          break;
        case 'MpesaReceiptNumber':
          parsedData.mpesaReceiptNumber = item.Value;
          break;
        case 'Balance':
          parsedData.balance = item.Value;
          break;
        case 'TransactionDate':
          parsedData.transactionDate = item.Value;
          break;
        case 'PhoneNumber':
          parsedData.phoneNumber = item.Value;
          break;
      }
    });

    return parsedData;
  }
}
