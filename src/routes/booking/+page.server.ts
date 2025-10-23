import { createBooking } from "$lib/action/booking";
import type { Actions } from "./$types";

export const actions = {
    default: async ({request, locals}) => {
        return createBooking({request});
    }
} satisfies Actions;

