// test.js
// Node 20+ supports global fetch, no need to import 'node-fetch'

class TililSMSService {
  constructor() {
    // Hardcode credentials for testing
    this.apiKey = "dTn46V80hpQIMkef3NLDSiEZcCzatP9myugYq2BwH7GlOFrJARvXjWU5xKob1s";   // ← replace with real Tilil API key
    this.shortcode = "SISCOM TECH"; // ← replace with real shortcode
    this.apiUrl = "https://api.tililtech.com/sms/v3/sendsms";
  }

  async sendSMS(phoneNumber, message) {
    // Ensure correct phone format
    let formattedPhone = String(phoneNumber);
    if (formattedPhone.startsWith("0")) {
      formattedPhone = "254" + formattedPhone.substring(1);
    } else if (!formattedPhone.startsWith("254")) {
      formattedPhone = "254" + formattedPhone;
    }

    const messageParams = {
      api_key: this.apiKey,
      service_id: 0,
      mobile: formattedPhone,
      response_type: "json",
      shortcode: this.shortcode,
      message: message,
    };

    try {
      const res = await fetch(this.apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(messageParams),
      });

      const data = await res.json();
      console.log("Tilil API Response:", data);
    } catch (error) {
      console.error("SMS sending error:", error);
    }
  }
}

// Main test function
async function main() {
  const sms = new TililSMSService();
  const testMessage =
    "Test SMS from Capitalized Event. This is a test message to verify SMS functionality.";

  console.log("Using hardcoded credentials:", {
    apiKeyPrefix: sms.apiKey.substring(0, 10) + "...",
    shortcode: sms.shortcode,
  });

  await sms.sendSMS("254796564749", testMessage);
}

main().catch(console.error);
