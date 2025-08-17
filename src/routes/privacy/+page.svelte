<script lang="ts">
	import { m as t } from '$lib/paraglide/messages.js';
</script>

<div class="container mx-auto p-8">
	<div class="prose lg:prose-xl mx-auto max-w-4xl">
		<h1 class="mb-4 text-4xl font-bold">{t.privacy_policy_title()}</h1>
		<p class="text-sm text-gray-500">
			{t.privacy_policy_last_updated()} {new Date().toLocaleDateString('en-US', {
				year: 'numeric',
				month: 'long',
				day: 'numeric'
			})}
		</p>

		<p>
			{t.privacy_policy_intro()}
		</p>

		<h2>{t.privacy_policy_section_1_title()}</h2>
		<p>
			{t.privacy_policy_section_1_content()}
		</p>
		<h2>{t.privacy_policy_section_2_title()}</h2>
		<p>
			{t.privacy_policy_section_2_content()}
		</p>
		<h2>{t.privacy_policy_section_3_title()}</h2>
		<p>
			{t.privacy_policy_section_3_content()}
		</p>

		<h2>{t.privacy_policy_section_4_title()}</h2>
		<p>
			{t.privacy_policy_section_4_content()}
		</p>
	</div>
</div>