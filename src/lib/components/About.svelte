<script lang="ts">
	import { goto } from '$app/navigation';
	import { m as t } from '$lib/paraglide/messages.js';

	function navigate() {
		goto('/booking');
	}
</script>

<div class="bg-gray-100 py-8 sm:py-12 md:py-20">
	<div class="container mx-auto px-4 md:px-8">
		<div class="grid gap-6 sm:gap-8 md:grid-cols-2 md:gap-12">
			<div class="prose max-w-none">
				<h3 class="text-2xl font-bold sm:text-3xl md:text-4xl">
					{@html t.about_title()}
				</h3>
				<p class="text-sm leading-relaxed sm:text-base md:text-lg">
					{@html t.about_description_1()}
				</p>
				<p class="text-sm leading-relaxed sm:text-base md:text-lg">
					{@html t.about_description_2()}
				</p>

				<h4 class="mt-6 text-lg font-bold sm:mt-8 sm:text-xl md:text-2xl">{@html t.about_more_than_guide()}</h4>
				<p class="text-sm leading-relaxed sm:text-base">
					{@html t.about_more_than_guide_desc()}
				</p>

				<h4 class="mt-6 text-lg font-bold sm:mt-8 sm:text-xl md:text-2xl">{@html t.about_custom_booking()}</h4>
				<p class="text-sm leading-relaxed sm:text-base">
					{@html t.about_custom_booking_desc()}
				</p>
			</div>

			<div class="prose max-w-none">
				<div class="rounded-lg bg-white p-4 shadow-lg sm:p-6">
					<h4 class="text-lg font-bold sm:text-xl md:text-2xl">{@html t.about_why_choose_us()}</h4>
					<ul class="mt-3 space-y-2 sm:mt-4">
						<li class="flex items-start">
							<span class="mr-2 text-primary">✔</span>
							<span class="text-sm sm:text-base">{@html t.about_feature_1()}</span>
						</li>
						<li class="flex items-start">
							<span class="mr-2 text-primary">✔</span>
							<span class="text-sm sm:text-base">{@html t.about_feature_2()}</span>
						</li>
						<li class="flex items-start">
							<span class="mr-2 text-primary">✔</span>
							<span class="text-sm sm:text-base">{@html t.about_feature_3()}</span>
						</li>
						<li class="flex items-start">
							<span class="mr-2 text-primary">✔</span>
							<span class="text-sm sm:text-base">{@html t.about_feature_4()}</span>
						</li>
						<li class="flex items-start">
							<span class="mr-2 text-primary">✔</span>
							<span class="text-sm sm:text-base">{@html t.about_feature_5()}</span>
						</li>
					</ul>
				</div>

				<div class="mt-6 text-center sm:mt-8">
					<h4 class="text-lg font-bold sm:text-xl md:text-2xl">{@html t.about_lets_make_it_personal()}</h4>
					<p class="mt-2 text-sm leading-relaxed sm:text-base md:text-lg">{@html t.about_unique_journey()}</p>
					<p class="text-sm leading-relaxed sm:text-base">
						{@html t.about_how_you_feel()}
					</p>
					<h5 class="mt-4 text-base font-semibold sm:mt-6 sm:text-lg md:text-xl">{@html t.about_start_custom_tour()}</h5>
					<button on:click={navigate} class="btn btn-primary btn-md mt-3 sm:btn-lg sm:mt-4">{@html t.about_book_now()}</button>
				</div>
			</div>
		</div>
	</div>
</div>
