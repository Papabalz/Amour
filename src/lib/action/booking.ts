// src/lib/actions/bookings.ts
import { db } from '$lib/server/db';
import { booking } from '$lib/server/db/schema';
import { fail, json } from '@sveltejs/kit';
import { eq } from 'drizzle-orm';
import { sendBookingConfirmation } from '$lib/email/mailer';



export async function getBooking ({id}: {id: number }) {

    const data = await db.select().from(booking).where(eq(booking.id, id))

  return data;
}

export async function getBookings() {

    const data = await db.select().from(booking)

  return data;
}


export async function createBooking({request}: { request: Request}) {
  
    const bookingData = await request.formData();
 const userId = Number(bookingData.get('userId'));
 const name = bookingData.get('name') as string;
 const email = bookingData.get('email') as string;
 const country = bookingData.get('country') as string;
 const phone = bookingData.get('phone') as string;
 const location = bookingData.get('location') as string;
 const numberOfDays = Number(bookingData.get('numberOfDays'));
 const adults = Number(bookingData.get('adults'));
 const childrenAges = bookingData.get('childrenAges') as string;
 const travelDate = bookingData.get('travelDate') as string;
 const pickup_location = bookingData.get('pickup_location') as string   
 const status = bookingData.get('status') as string
 const payment = bookingData.get('payment') as string
 const moreInfo = bookingData.get('moreInfo') as string
 const special_requests = bookingData.get('special_requests') as string 

if(!name) return fail(400, { message: 'Name is required', success: false });
if(!email) return fail(400, { message: 'Email is required', success: false });
if(!country) return fail(400, { message: 'Country is required', success: false });
if(!phone) return fail(400, { message: 'Phone is required', success: false });
if(!location) return fail(400, { message: 'Location is required', success: false });
if(!numberOfDays) return fail(400, { message: 'Number of days is required', success: false });
if(!adults) return fail(400, { message: 'Adults is required', success: false });
if(!travelDate) return fail(400, { message: 'Travel date is required', success: false });
if(!pickup_location) return fail(400, { message: 'Pickup location is required', success: false });
    
    try {
      let data = await db.insert(booking).values({
            userId,
            name,
            email,
            country,
            phone,
            location,
            numberOfDays,
            adults,
            childrenAges,
            travelDate,
            pickup_location,
            status,
            payment,
            moreInfo,
            special_requests}).returning();

        // Send confirmation email
        await sendBookingConfirmation({
            name,
            email,
            location,
            travelDate,
            numberOfDays,
            adults,
            pickup_location,
            payment
        });

if (payment === 'pay_later'){

        return { message: 'Booking created successfully', status: 200, success: true };
} else {
    return {data, message: 'Booking created successfully'};
}


    } catch (error) {
        console.error('Error creating booking:', error);
        return fail(401, { message: 'Failed to create booking', success: false });

    }
   
}

export async function updateBookings(request: Request) {
    const bookingData = await request.formData();
    const id = Number(bookingData.get('id'));
    const name = bookingData.get('name') as string;
    const email = bookingData.get('email') as string;
    const country = bookingData.get('country') as string;
    const phone = bookingData.get('phone') as string;
    const location = bookingData.get('location') as string;
    const numberOfDays = Number(bookingData.get('numberOfDays'));
    const adults = Number(bookingData.get('adults'));
    const childrenAges = bookingData.get('childrenAges') as string;
    const travelDate = bookingData.get('travelDate') as string;
    const pickup_location = bookingData.get('pickup_location') as string   
    const payment = bookingData.get('payment') as string
    const moreInfo = bookingData.get('moreInfo') as string
    const special_requests = bookingData.get('special_requests') as string 

     await db.update(booking).set({name, email, country, phone, location, numberOfDays, adults, childrenAges, travelDate, pickup_location, payment, moreInfo, special_requests}).where(eq(booking.id, id))

     return  { message: 'Booking updated successfully', status: 200, success: true };  

    }