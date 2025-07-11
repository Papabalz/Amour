// src/lib/actions/bookings.ts
import { db } from '$lib/server/db';
import { booking } from '$lib/server/db/schema';
import { fail, json } from '@sveltejs/kit';
import { eq } from 'drizzle-orm';
import type { StringDecoder } from 'node:string_decoder';

interface Booking {
    userId: number;
    guideType: string;
    arriveDate: string;
    departDate: string;
    guests: number;
    pickup_location: string;
    message?: string;
    pickup_time?: string;
    [key: string]: any;
}

interface BookingData {
    userId: number;
    guideType: string;
    arriveDate: string;
    departDate: string;
    guests: number;
    pickup_location: string;
    status?: string | null;
    payment?: string | null;
    moreInfo?: string | null;
    special_requests?: string | null;
    isPaid?: string | null;
    vehicle: string,
    pickup_time: string,
    length_of_stay: string,
}

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
 const guideType = bookingData.get('guideType') as string;
const arriveDate = bookingData.get('arriveDate') as string;
const departDate = bookingData.get('departDate') as string;
const guests = Number(bookingData.get('guests'));
const pickup_location = bookingData.get('pickup_location') as string   
const status = bookingData.get('status') as string
const payment = bookingData.get('payment') as string
const moreInfo = bookingData.get('moreInfo') as string
const special_requests = bookingData.get('special_requests') as string 
const pickup_time = bookingData.get('pickup_time') as string
const length_of_stay = bookingData.get('length_of_stay') as string

if(!guideType) return fail(400, { message: 'Guide type is required', success: false });
if(!arriveDate) return fail(400, { message: 'Arrive date is required', success: false });
if(!departDate) return fail(400, { message: 'Depart date is required', success: false });
if(!guests) return fail(400, { message: 'Guests is required', success: false });
if(!pickup_location) return fail(400, { message: 'Pickup location is required', success: false });
if(!length_of_stay) return fail(400, { message: 'Length of stay is required', success: false });
    
// console.log({userId, guideType, arriveDate, departDate, guests, pickup_location, status, payment, moreInfo, special_requests,pickup_time, length_of_stay})

    try {
      let data = await db.insert(booking).values({
            userId,
            guideType,
            arriveDate,
            departDate,
            guests,
            pickup_location,
            status,
            payment,
            moreInfo,
            special_requests,
            pickup_time,
            length_of_stay,
}).returning();

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