<script lang="ts">
	let isLoading = $state(false);
</script>

<div class="container mx-auto p-8">
	<div class="mx-auto max-w-2xl">
		<h1 class="mb-6 text-center text-4xl font-bold">Get in Touch</h1>
		<p class="mb-8 text-center text-lg">
			Have a question or need help with a booking? Fill out the form below or reach out to us
			directly.
		</p>

		<div class="grid gap-8 md:grid-cols-2">
			<!-- Contact Form -->
			<form class="space-y-4" on:submit|preventDefault={() => alert('Form submitted!')}>
				<div>
					<label for="name" class="label">Your Name</label>
					<input type="text" id="name" name="name" class="input input-bordered w-full" required />
				</div>
				<div>
					<label for="email" class="label">Your Email</label>
					<input type="email" id="email" name="email" class="input input-bordered w-full" required />
				</div>
				<div>
					<label for="message" class="label">Message</label>
					<textarea id="message" name="message" class="textarea textarea-bordered w-full" rows="5" required></textarea>
				</div>
				<button type="submit" class="btn btn-neutral w-full" disabled={isLoading}>
					{#if isLoading}
						<span class="loading loading-spinner"></span>
					{:else}
						Send Message
					{/if}
				</button>
			</form>

			<!-- Contact Info -->
			<div class="space-y-4 rounded-box bg-base-200 p-6">
				<h2 class="text-2xl font-bold">Contact Information</h2>
				<p><strong>Email:</strong> <a href="mailto:contact@amour.com" class="link">contact@amour.com</a></p>
				<p><strong>Phone:</strong> <a href="tel:+1234567890" class="link">+1 (234) 567-890</a></p>
				<p><strong>Address:</strong><br />123 Travel Lane<br />Adventure City, World 12345</p>
			</div>
		</div>
	</div>
</div>