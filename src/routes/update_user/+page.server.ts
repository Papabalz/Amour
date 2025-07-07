import { updateUser } from '$lib/action/user';
import type { Actions } from './$types';



export const actions: Actions = {
    default: async ({ request, locals }) => {

        // TODO log the user in

        if (!locals.user) {
            // Handle the case when user is not logged in
            return { message: 'User not authenticated' };
        }

        console.log('Update User Action:', locals.user);

        return updateUser({ request: request, userId: locals.user.id });
    }
};