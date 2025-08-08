<script lang="ts">
	import { m as t } from '$lib/paraglide/messages.js';
	let isLoading = $state(false);
</script>

<div class="container mx-auto p-8">
	<div class="mx-auto max-w-2xl">
		<h1 class="mb-6 text-center text-4xl font-bold">{t.contact_title()}</h1>
		<p class="mb-8 text-center text-lg">
			{t.contact_p1()}
		</p>

		<div class="grid gap-8 md:grid-cols-2">
			<!-- Contact Form -->
			<form class="space-y-4" on:submit|preventDefault={() => alert('Form submitted!')}>
				<div>
					<label for="name" class="label">{t.contact_form_name()}</label>
					<input type="text" id="name" name="name" class="input input-bordered w-full" required />
				</div>
				<div>
					<label for="email" class="label">{t.contact_form_email()}</label>
					<input type="email" id="email" name="email" class="input input-bordered w-full" required />
				</div>
				<div>
					<label for="message" class="label">{t.contact_form_message()}</label>
					<textarea id="message" name="message" class="textarea textarea-bordered w-full" rows="5" required></textarea>
				</div>
				<button type="submit" class="btn btn-neutral w-full" disabled={isLoading}>
					{#if isLoading}
						<span class="loading loading-spinner"></span>
					{:else}
						{t.contact_form_send()}
					{/if}
				</button>
			</form>

			<!-- Contact Info -->
			<div class="space-y-4 rounded-box bg-base-200 p-6">
				<h2 class="text-2xl font-bold">{t.contact_info_title()}</h2>
				<p><strong>{t.contact_info_email()}</strong> <a href="mailto:contact@amour.com" class="link">contact@amour.com</a></p>
				<p><strong>{t.contact_info_phone()}</strong> <a href="tel:+1234567890" class="link">+1 (234) 567-890</a></p>
				<p><strong>{t.contact_info_address()}</strong><br />123 Travel Lane<br />Adventure City, World 12345</p>
			</div>
		</div>
	</div>
</div>
