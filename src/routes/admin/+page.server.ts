import { db } from "$lib/server/db";
import { booking, user } from "$lib/server/db/schema";
import { desc } from "drizzle-orm";

export async function load() {
	try {
		const [bookings, users] = await Promise.all([
			db.select().from(booking).orderBy(desc(booking.created_At)).limit(50),
			db.select().from(user).orderBy(desc(user.created_At)).limit(50)
		]);
		
		return { bookings, users };
	} catch (error) {
		console.error('Error fetching admin data:', error);
		return { bookings: [], users: [] };
	}
}