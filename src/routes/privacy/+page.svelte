<script lang="ts">
	import { t } from '$lib/paraglide/messages.js';
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
			{t.privacy_policy_p1()}
		</p>

		<h2>{t.privacy_policy_info_we_collect_title()}</h2>
		<p>
			{t.privacy_policy_info_we_collect_p()}
		</p>

		<h2>{t.privacy_policy_how_we_use_info_title()}</h2>
		<p>
			{t.privacy_policy_how_we_use_info_p()}
		</p>

		<h2>{t.privacy_policy_security_title()}</h2>
		<p>
			{t.privacy_policy_security_p()}
		</p>

		<h2>{t.privacy_policy_your_rights_title()}</h2>
		<p>
			{t.privacy_policy_your_rights_p()}
		</p>
	</div>
</div>
