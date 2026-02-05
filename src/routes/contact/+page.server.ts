import { fail } from '@sveltejs/kit';
import type { Actions } from './$types';
import { sendContactEmail } from '$lib/email/mailer';

export const actions: Actions = {
	default: async ({ request }) => {
		const data = await request.formData();
		const name = String(data.get('name') || '').trim();
		const email = String(data.get('email') || '').trim();
		const message = String(data.get('message') || '').trim();

		if (!name) return fail(400, { success: false, message: 'Name is required' });
		if (!email) return fail(400, { success: false, message: 'Email is required' });
		if (!message) return fail(400, { success: false, message: 'Message is required' });

		const result = await sendContactEmail({ name, email, message });
		if (!result.success) {
			return fail(500, { success: false, message: 'Failed to send message' });
		}

		return { success: true, message: 'Message sent successfully' };
	}
};
