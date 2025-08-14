interface TililSMSResponse {
  status: string;
  message: string;
  data?: any;
}

export class TililSMSService {
  private apiKey: string;
  private shortcode: string;
  private apiUrl: string;

  constructor() {
    this.apiKey = process.env.TILIL_API_KEY!;
    this.shortcode = process.env.TILIL_SHORTCODE!;
    this.apiUrl = 'https://api.tililtech.com/sms/v3/sendsms';
  }

  async sendSMS(phoneNumber: string, message: string): Promise<TililSMSResponse> {
    const messageParams = {
      api_key: this.apiKey,
      service_id: 1,
      mobile: phoneNumber,
      response_type: 'json',
      shortcode: this.shortcode,
      message: message,
    };

    try {
      const response = await fetch(this.apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(messageParams),
      });

      if (!response.ok) {
        throw new Error(`SMS API request failed: ${response.statusText}`);
      }

      const result = await response.json();
      return result;
    } catch (error) {
      console.error('SMS sending error:', error);
      throw new Error(`Failed to send SMS: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  generatePaymentConfirmationMessage(
    amount: number,
    mpesaReceiptNumber: string,
    eventType: string
  ): string {
    return `Payment Confirmed! Your ticket for ${eventType} has been secured. Amount: KES ${amount}. M-Pesa Ref: ${mpesaReceiptNumber}. Thank you for joining Capitalized Event!`;
  }

  generatePaymentFailedMessage(): string {
    return `Payment was not completed. If you experienced any issues, please contact our support team. Thank you for your interest in Capitalized Event.`;
  }
}
