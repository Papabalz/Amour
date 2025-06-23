// src/lib/actions/bookings.ts
import { db } from '$lib/server/db';
import { booking } from '$lib/server/db/schema';

interface BookingData {
    userId: number;
    guideType: string;
    arriveDate: string;
    departDate: string;
    guests: number;
    // Add other required fields according to your booking schema
    [key: string]: any;
}

interface Booking {
    // Define the properties returned by the booking insert
    // Example:
    // id: number;
    // userId: number;
    // date: string;
    // ...
    [key: string]: any;
}

export async function createBooking(bookingData: BookingData): Promise<Booking[]> {
    return await db.insert(booking).values(bookingData).returning();
}