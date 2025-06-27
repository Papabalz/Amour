// src/lib/actions/bookings.ts
import { db } from '$lib/server/db';
import { booking } from '$lib/server/db/schema';
import { fail, json } from '@sveltejs/kit';

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
    [key: string]: any;
}


export async function createBooking(bookingData: Booking) {

    try {
         await db.insert(booking).values(bookingData);

        return json({ message: 'Booking created successfully', status: 200, success: true });

    } catch (error) {
        console.error('Error creating booking:', error);
        return fail(401, { message: 'Failed to create booking', success: false });

    }
   
}

export async function getBookings(): Promise<BookingData[]> {
    return await db.select().from(booking);
}