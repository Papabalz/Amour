<script lang="ts">
	import { m as t } from '$lib/paraglide/messages.js';
</script>

<div class="container mx-auto p-8">
	<div class="prose lg:prose-xl max-w-4xl mx-auto">
		<h1 class="text-4xl font-bold mb-4 text-center">{t.about_us_title()}</h1>
		<p>
			{t.about_us_p1()}
		</p>
		<p>
			{t.about_us_p2()}
		</p>
		<h2 class="text-2xl font-bold mt-6">{t.about_us_guides_title()}</h2>
		<p>
			{t.about_us_guides_p()}
		</p>
		<h2 class="text-2xl font-bold mt-6">{t.about_us_commitment_title()}</h2>
		<p>
			{t.about_us_commitment_p()}
		</p>
	</div>
</div>
