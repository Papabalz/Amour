import { createBooking } from "$lib/action/booking";
import type { Actions } from "./$types";

export const actions = {
    default: async ({request, locals}) => {
        if (!locals.user) {
            // Handle the case when user is not logged in
            return { message: 'User not authenticated' };
        }

return createBooking({request});

    }

} satisfies Actions;

