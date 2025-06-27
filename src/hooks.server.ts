// import type { Handle } from '@sveltejs/kit';
// import { paraglideMiddleware } from '$lib/paraglide/server';

// const handleParaglide: Handle = ({ event, resolve }) =>
// 	paraglideMiddleware(event.request, ({ request, locale }) => {
// 		event.request = request;

// 		return resolve(event, {
// 			transformPageChunk: ({ html }) => html.replace('%paraglide.lang%', locale)
// 		});
// 	});

// export const handle: Handle = handleParaglide;


import type { Handle } from '@sveltejs/kit';
import { paraglideMiddleware } from '$lib/paraglide/server';
import { sequence } from '@sveltejs/kit/hooks';
import { getSession } from '$lib/server/session';
import { db } from '$lib/server/db';
import { user as userTable } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';

const handleParaglide: Handle = ({ event, resolve }) =>
	paraglideMiddleware(event.request, ({ request, locale }) => {
		event.request = request;
		return resolve(event, {
			transformPageChunk: ({ html }) => html.replace('%paraglide.lang%', locale)
		});
	});

const handleAuth: Handle = async ({ event, resolve }) => {
	
	// Bypass auth logic for specific, non-user-facing paths like this DevTools request.
	if (event.url.pathname.startsWith('/.well-known')) {
		// Let SvelteKit handle this request as it would normally, without our intervention.
		return resolve(event);
	}
	const sessionPayload = getSession(event.cookies);

	if (!sessionPayload) {
		event.locals.user = null;
		return resolve(event);
	}

	// Re-fetch the user from the database on each request to ensure data is fresh
	// and the user still exists.
	const user = await db.query.user.findFirst({
		where: eq(userTable.id, sessionPayload.id),
		columns: {
			password: false // IMPORTANT: Never expose the password hash.
		}
	});

	event.locals.user = user || null;
	return resolve(event);
};

export const handle: Handle = sequence(handleParaglide, handleAuth);
