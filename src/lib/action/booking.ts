// src/lib/actions/bookings.ts
import { db } from '$lib/server/db';
import { booking } from '$lib/server/db/schema';
import { fail, json } from '@sveltejs/kit';
import { eq } from 'drizzle-orm';



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
 const userId = Number(bookingData.get('userId')) || null;
 const name = bookingData.get('name') as string;
 const email = bookingData.get('email') as string;
 const country = bookingData.get('country') as string;
 const phone = bookingData.get('phone') as string;
 const location = bookingData.get('location') as string;
 const numberOfDays = Number(bookingData.get('numberOfDays'));
 const adults = Number(bookingData.get('adults'));
 const childrenAges = bookingData.get('childrenAges') as string;
 const travelDate = bookingData.get('travelDate') as string;
 const pickup_location = bookingData.get('pickup_location') as string;
 const payment = bookingData.get('payment') as string;
 const moreInfo = bookingData.get('moreInfo') as string;
 const special_requests = bookingData.get('special_requests') as string;

if(!name) return fail(400, { message: 'Name is required', success: false });
if(!email) return fail(400, { message: 'Email is required', success: false });
if(!location) return fail(400, { message: 'Tour package is required', success: false });
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
            status: 'pending',
            payment,
            moreInfo: `${moreInfo}\nChildren: ${childrenAges}\nDuration: ${numberOfDays} days`,
            special_requests,
}).returning();

if (payment === 'pay_later'){
        return { message: 'Booking created successfully', status: 200, success: true };
} else {
    return {data, message: 'Booking created successfully', bookingData: { name, email, phone, country }};
}

    } catch (error) {
        console.error('Error creating booking:', error);
        console.error('Booking data:', { userId, name, email, country, phone, location, numberOfDays, adults, childrenAges, travelDate, pickup_location, payment, moreInfo, special_requests });
        return fail(401, { message: `Failed to create booking: ${error}`, success: false });
    }
   
}

export async function updateBookings(request: Request) {
    const bookingData = await request.formData();
    const id = Number(bookingData.get('id'));
    const guideType = bookingData.get('guideType') as string;
   const arriveDate = bookingData.get('arriveDate') as string;
   const departDate = bookingData.get('departDate') as string;
   const guests = Number(bookingData.get('guests'));
   const pickup_location = bookingData.get('pickup_location') as string   
   const payment = bookingData.get('payment') as string
   const moreInfo = bookingData.get('moreInfo') as string
   const special_requests = bookingData.get('special_requests') as string 
   const pickup_time = bookingData.get('pickup_time') as string
   const length_of_stay = bookingData.get('length_of_stay') as string

     await db.update(booking).set({guideType, arriveDate, departDate, guests, pickup_location, payment, moreInfo, special_requests,pickup_time, length_of_stay}).where(eq(booking.id, id))

     return  { message: 'User updated successfully', status: 200, success: true };  

    }