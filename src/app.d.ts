import type { User } from '$lib/server/db/schema';

// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		 interface Locals {
			// We omit the password from the user object attached to locals
			user: Omit<User, 'password'> | null;
		 }
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
}

export {};







