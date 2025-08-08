<script lang="ts">
	import { t } from '$lib/paraglide/messages.js';
</script>

<div class="container mx-auto p-8">
	<div class="prose lg:prose-xl mx-auto max-w-4xl">
		<h1 class="mb-4 text-4xl font-bold">{t.terms_and_conditions_title()}</h1>
		<p class="text-sm text-gray-500">
			{t.terms_and_conditions_last_updated()} {new Date().toLocaleDateString('en-US', {
				year: 'numeric',
				month: 'long',
				day: 'numeric'
			})}
		</p>

		<p>
			{t.terms_and_conditions_p1()}
		</p>

		<h2>{t.terms_and_conditions_acceptance_title()}</h2>
		<p>
			{t.terms_and_conditions_acceptance_p()}
		</p>

		<h2>{t.terms_and_conditions_bookings_title()}</h2>
		<p>
			{t.terms_and_conditions_bookings_p()}
		</p>

		<h2>{t.terms_and_conditions_user_responsibilities_title()}</h2>
		<p>
			{t.terms_and_conditions_user_responsibilities_p()}
		</p>

		<h2>{t.terms_and_conditions_cancellation_title()}</h2>
		<p>
			{t.terms_and_conditions_cancellation_p()}
		</p>

		<h2>{t.terms_and_conditions_liability_title()}</h2>
		<p>
			{t.terms_and_conditions_liability_p()}
		</p>
	</div>
</div>
