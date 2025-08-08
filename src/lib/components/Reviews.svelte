<script lang="ts">
	import { m as t } from '$lib/paraglide/messages.js';

	const reviews = [
		{
			id: 1,
			name: 'Jessica L.',
			avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
			rating: 5,
			comment: t.review_1_comment()
		},
		{
			id: 2,
			name: 'David M.',
			avatar: 'https://randomuser.me/api/portraits/men/46.jpg',
			rating: 5,
			comment: t.review_2_comment()
		},
		{
			id: 3,
			name: 'Sarah K.',
			avatar: 'https://randomuser.me/api/portraits/women/47.jpg',
			rating: 4,
			comment: t.review_3_comment()
		},
		{
			id: 4,
			name: 'Michael B.',
			avatar: 'https://randomuser.me/api/portraits/men/48.jpg',
			rating: 5,
			comment: t.review_4_comment()
		}
	];
</script>

<div class="bg-base-200 py-12 md:py-20">
	<div class="container mx-auto px-4 md:px-8">
		<h3 class="mb-8 text-center text-3xl font-bold md:text-4xl">{t.reviews_title()}</h3>
		<div
			class="md:grid md:grid-cols-2 md:gap-8 lg:grid-cols-3 xl:grid-cols-4 carousel md:space-x-0 md:overflow-visible"
		>
			{#each reviews as review (review.id)}
				<div class="card carousel-item w-full bg-white shadow-lg md:w-full">
					<div class="card-body">
						<div class="mb-4 flex items-center">
							<div class="avatar mr-4">
								<div class="w-16 rounded-full ring ring-primary ring-offset-2 ring-offset-base-100">
									<img src={review.avatar} alt={review.name} />
								</div>
							</div>
							<div>
								<h4 class="text-lg font-bold">{review.name}</h4>
								<div class="rating mt-1">
									{#each { length: 5 } as _, i}
										<input
											type="radio"
											name="rating-{review.id}"
											class="mask mask-star-2 bg-orange-400"
											disabled
											checked={i < review.rating}
										/>
									{/each}
								</div>
							</div>
						</div>
						<p class="text-gray-600">{review.comment}</p>
					</div>
				</div>
			{/each}
		</div>
	</div>
</div>

<style>
	@media (max-width: 767px) {
		.carousel {
			display: flex;
			overflow-x: auto;
			scroll-snap-type: x mandatory;
			-webkit-overflow-scrolling: touch; /* for smooth scrolling on iOS */
			padding-bottom: 1rem; /* Add some space for the scrollbar */
		}

		.carousel-item {
			flex: 0 0 90%; /* Adjust card width for smaller screens */
			scroll-snap-align: start;
			margin-right: 1rem;
		}

		.carousel::-webkit-scrollbar {
			display: none; /* Hide scrollbar on WebKit browsers */
		}

		.carousel {
			scrollbar-width: none; /* Hide scrollbar on Firefox */
			-ms-overflow-style: none; /* Hide scrollbar on IE/Edge */
		}
	}
</style>
