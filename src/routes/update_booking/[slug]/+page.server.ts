import { getBooking, updateBookings} from '$lib/action/booking';
import { error } from '@sveltejs/kit';
import type { PageServerLoad, Actions } from './$types';


export const actions: Actions = {
    default: async ({ request}) => {
        // This will handle the form submission to update the booking
        return updateBookings(request);
    }
};

export const load: PageServerLoad = async ({  params }) => {
const booking = await getBooking({id: Number(params.slug)});

if(booking && booking.length > 0) {
    return { booking: booking[0] };
}

error(404, 'Booking not found');

}
