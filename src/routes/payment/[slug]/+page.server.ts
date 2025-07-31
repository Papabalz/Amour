import { getBooking, updateBookings} from '$lib/action/booking';
import { error } from '@sveltejs/kit';
import type { PageServerLoad, Actions } from './$types';
import { makePayment } from '$lib/action/transaction';


export const actions: Actions = {
    default: async ({params, request}) => {
        // This will handle the form submission to update the booking
        console.log(params, request);
        return makePayment(request);
    }
};

export const load: PageServerLoad = async ({  params }) => {
const booking = await getBooking({id: Number(params.slug)});
//console.log(params.slug)

if(booking && booking.length > 0) {
    return { booking: booking[0] };
}

error(404, 'Booking not found');

}
