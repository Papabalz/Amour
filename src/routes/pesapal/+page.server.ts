import { PesapalService } from '$lib/pesapal';
import { redirect } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';
import type { Actions, PageServerLoad } from './$types';

const pesapal = new PesapalService({
  consumerKey: env.PESAPAL_CONSUMER_KEY || '7mFJPL3ZCzxiMZizT73gh3cUN8dOOYQw',
  consumerSecret: env.PESAPAL_CONSUMER_SECRET || 'rsc5yf41LcWdaE5d3NKOwtNp1VY=',
  environment: 'live'
});

export const load: PageServerLoad = async ({ url }) => {
  const error = url.searchParams.get('error');
  return {
    error
  };
};

export const actions: Actions = {
  default: async ({ request, url }) => {
    const formData = await request.formData();
    
    const bookingId = formData.get('bookingId') as string;
    const totalPriceStr = formData.get('totalPrice') as string;
    const amountStr = formData.get('amount') as string;
    let amount = parseFloat(totalPriceStr || amountStr || '0');
    
    // Ensure minimum amount of $1
    if (amount <= 0) {
      amount = 100; // Default fallback amount
    }
    
    const email = formData.get('email') as string;
    const phone = formData.get('phone') as string;
    const name = formData.get('name') as string;
    const country = formData.get('country') as string;

    console.log('Form data - totalPrice:', totalPriceStr, 'amount:', amountStr, 'final amount:', amount);
    console.log('Initiating payment for booking ID:', bookingId, 'Amount:', amount);

    const [firstName, ...lastNameParts] = name.split(' ');
    const lastName = lastNameParts.join(' ') || firstName;

    // Convert country name to ISO code
    const getCountryCode = (countryName: string): string => {
      const countryMap: Record<string, string> = {
        'tanzania': 'TZ', 'kenya': 'KE', 'uganda': 'UG', 'usa': 'US', 'united states': 'US',
        'uk': 'GB', 'united kingdom': 'GB', 'germany': 'DE', 'france': 'FR', 'italy': 'IT',
        'spain': 'ES', 'canada': 'CA', 'australia': 'AU', 'south africa': 'ZA', 'india': 'IN'
      };
      return countryMap[countryName.toLowerCase()] || countryName.substring(0, 2).toUpperCase();
    };

    const paymentData = {
      id: `booking-${bookingId}-${Date.now()}`,
      currency: 'USD',
      amount: Number(amount.toFixed(2)),
      description: `Tour booking payment - Booking ID: ${bookingId}`,
      callback_url: `${url.origin}/pesapal/callback`,
      notification_id: '',
      billing_address: {
        email_address: email,
        phone_number: phone || '+255000000000',
        country_code: getCountryCode(country || 'TZ'),
        first_name: firstName,
        last_name: lastName
      }
    };

    try {
      // Register IPN URL and get notification ID
      const notificationId = await pesapal.registerIPN(paymentData.callback_url);
      paymentData.notification_id = notificationId;
      
      const response = await pesapal.submitOrderRequest(paymentData);
      throw redirect(302, response.redirect_url);
    } catch (error) {
      console.error('Pesapal payment error:', error);
      const errorMessage = encodeURIComponent((error as Error).message);
      throw redirect(302, `/pesapal?error=${errorMessage}`);
    }
  }
};