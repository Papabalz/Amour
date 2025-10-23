export interface PesapalConfig {
  consumerKey: string;
  consumerSecret: string;
  environment: 'sandbox' | 'live';
}

export interface PaymentRequest {
  id: string;
  currency: string;
  amount: number;
  description: string;
  callback_url: string;
  notification_id?: string;
  billing_address: {
    email_address: string;
    phone_number: string;
    country_code: string;
    first_name: string;
    middle_name?: string;
    last_name: string;
    line_1?: string;
    line_2?: string;
    city?: string;
    state?: string;
    postal_code?: string;
    zip_code?: string;
  };
}

export class PesapalService {
  private config: PesapalConfig;
  private baseUrl: string;
  private accessToken: string | null = null;

  constructor(config: PesapalConfig) {
    this.config = config;
    this.baseUrl = config.environment === 'sandbox' 
      ? 'https://cybqa.pesapal.com/pesapalv3/api'
      : 'https://pay.pesapal.com/v3/api';
  }

  private async getAccessToken(): Promise<string> {
    if (this.accessToken) return this.accessToken;

    const response = await fetch(`${this.baseUrl}/Auth/RequestToken`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        consumer_key: "7mFJPL3ZCzxiMZizT73gh3cUN8dOOYQw",
        consumer_secret: "rsc5yf41LcWdaE5d3NKOwtNp1VY="
      })
    });

    if (!response.ok) {
      throw new Error(`Failed to get access token: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    if (!data.token) {
      throw new Error(`No token received: ${JSON.stringify(data)}`);
    }
    
    this.accessToken = data.token;
    return this.accessToken!;
  }

  async submitOrderRequest(paymentData: PaymentRequest): Promise<{ order_tracking_id: string; redirect_url: string }> {
    const token = await this.getAccessToken();

    const response = await fetch(`${this.baseUrl}/Transactions/SubmitOrderRequest`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(paymentData)
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to submit order: ${response.status} ${response.statusText} - ${errorText}`);
    }

    const data = await response.json();
    if (!data.redirect_url) {
      throw new Error(`No redirect URL received: ${JSON.stringify(data)}`);
    }
    
    return data;
  }

  async registerIPN(callbackUrl: string): Promise<string> {
    const token = await this.getAccessToken();

    const response = await fetch(`${this.baseUrl}/URLSetup/RegisterIPN`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        url: callbackUrl,
        ipn_notification_type: 'GET'
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to register IPN: ${response.status} ${response.statusText} - ${errorText}`);
    }

    const data = await response.json();
    return data.ipn_id;
  }

  async getTransactionStatus(orderTrackingId: string): Promise<any> {
    const token = await this.getAccessToken();

    const response = await fetch(`${this.baseUrl}/Transactions/GetTransactionStatus?orderTrackingId=${orderTrackingId}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });

    return await response.json();
  }
}