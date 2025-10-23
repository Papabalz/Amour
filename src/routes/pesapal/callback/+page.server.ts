import { PesapalService } from '$lib/pesapal';
import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

const pesapal = new PesapalService({
  consumerKey: process.env.PESAPAL_CONSUMER_KEY || '',
  consumerSecret: process.env.PESAPAL_CONSUMER_SECRET || '',
  environment: 'sandbox'
});

export const load: PageServerLoad = async ({ url }) => {
  const orderTrackingId = url.searchParams.get('OrderTrackingId');
  const orderMerchantReference = url.searchParams.get('OrderMerchantReference');

  if (!orderTrackingId) {
    throw redirect(302, '/booking?error=payment_failed');
  }

  try {
    const status = await pesapal.getTransactionStatus(orderTrackingId);
    
    if (status.payment_status_description === 'Completed') {
      // Update booking status in database
      // You'll need to implement this based on your booking update logic
      throw redirect(302, '/booking?success=payment_completed');
    } else {
      throw redirect(302, '/booking?error=payment_failed');
    }
  } catch (error) {
    console.error('Payment verification error:', error);
    throw redirect(302, '/booking?error=payment_verification_failed');
  }
};