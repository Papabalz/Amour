import { loginUser } from '$lib/action/user';
import type { Actions } from './$types';



export const actions: Actions = {
    default: async (event) => {
         
        // TODO log the user in

        return loginUser({ request: event.request, cookie: event.cookies });
    }
};