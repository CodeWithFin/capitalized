interface TililSMSResponse {
  status_code: string;
  status_desc: string;
  message_id: number;
  mobile_number: string;
  network_id: string;
  message_cost: number;
  credit_balance: number;
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

  async sendSMS(phoneNumber: string | number, message: string): Promise<void> {

    let formattedPhone = String(phoneNumber);
    if (formattedPhone.startsWith('0')) {
      formattedPhone = '254' + formattedPhone.substring(1);
    } else if (!formattedPhone.startsWith('254')) {
      formattedPhone = '254' + formattedPhone;
    }

    const messageParams = {
      api_key: this.apiKey,
      service_id: 0,
      mobile: formattedPhone,
      response_type: 'json',
      shortcode: this.shortcode,
      message: message,
    };

    console.log('Sending SMS to:', formattedPhone);
    console.log('Using shortcode:', this.shortcode);

    try {
    
      fetch(this.apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(messageParams),
      }).then(response => response.json())
        .then(data => {
          console.log('SMS API Response:', data);
        })
        .catch(error => {
          console.error('SMS sending failed:', error);
        });

      console.log('SMS request sent to:', formattedPhone);
    } catch (error) {
      console.error('SMS sending error:', error);
    }
  }

  generatePaymentConfirmationMessage(
    amount: number,
    mpesaReceiptNumber: string,
    eventType: string
  ): string {
    return `Payment Confirmed! Your ticket for ${eventType} has been secured. Amount: KES ${amount.toLocaleString()} M-Pesa Ref: ${mpesaReceiptNumber} Thank you for joining Capitalized Event! For support, contact us at events@capitalized.events`;
  }

  generatePaymentFailedMessage(): string {
    return `Payment Failed. Your payment could not be processed. Please try again or contact support if the issue persists. Support: events@capitalized.events Thank you for your interest in Capitalized Event.`;
  }
}
