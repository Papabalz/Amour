import type { ServerLoad } from "@sveltejs/kit";

export const load: ServerLoad = async ({ locals }) => {
    // locals.user is set in the handleAuth hook
    return {
        user: locals.user
    };
}


