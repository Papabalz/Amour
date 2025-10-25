<script lang="ts">
	import { fade } from 'svelte/transition';
	import { m as t } from '$lib/paraglide/messages.js';

	const tourAreaData = [
		{
			id: 1,
			name: 'Stone Town',
			details: t.stone_town_details(),
			picture: "https://res.cloudinary.com/ddsgcceuj/image/upload/v1761169340/DSC_0988_tvcoed.jpg"
		},
		{
			id: 2,
			name: 'Nakupenda Sandbank',
			details: t.nakupenda_details(),
			picture: 'https://res.cloudinary.com/ddsgcceuj/image/upload/v1761291980/DSC_1113_zsoo1k.jpg'
		},
		{
			id: 3,
			name: 'Safari Blue',
			details: t.safari_blue_details(),
			picture: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=600&auto=format&fit=crop&q=60'
		},
		{
			id: 4,
			name: 'Spice Tour',
			details: t.spice_tour_details(),
			picture: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=600&auto=format&fit=crop&q=60'
		},
		{
			id: 5,
			name: 'Prison Island',
			details: t.prison_island_details(),
			picture: 'https://res.cloudinary.com/ddsgcceuj/image/upload/v1761169109/DSC_1144_x7nqfp.jpg'
		},
		{
			id: 6,
			name: 'Jozani Forest',
			details: t.jozani_forest_details(),
			picture: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=600&auto=format&fit=crop&q=60'
		},
		{
			id: 7,
			name: 'Snorkel at Mnemba',
			details: t.mnemba_snorkel_details(),
			picture: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=600&auto=format&fit=crop&q=60'
		},
		{
			id: 8,
			name: 'Culture Tour',
			details: t.culture_tour_details(),
			picture: 'https://images.unsplash.com/photo-1609198092458-38a293c7ac4b?w=600&auto=format&fit=crop&q=60'
		},
		{
			id: 9,
			name: 'Sunset Cruise',
			details: t.sunset_cruise_details(),
			picture: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&auto=format&fit=crop&q=60'
		},
		{
			id: 10,
			name: 'Blue Lagoon',
			details: t.blue_lagoon_details(),
			picture: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=600&auto=format&fit=crop&q=60'
		},
		{
			id: 11,
			name: 'Dolphin',
			details: t.kizimkazi_dolphin_details(),
			picture: "https://res.cloudinary.com/ddsgcceuj/image/upload/v1761169503/DIYP0607_kdxuvk.webp"
		},
		{
			id: 12,
			name: 'Buggy/Quad Bike',
			details: t.buggy_quad_details(),
			picture: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&auto=format&fit=crop&q=60'
		},
		{
			id: 13,
			name: 'Salaam Cave',
			details: t.salaam_cave_details(),
			picture: "https://res.cloudinary.com/ddsgcceuj/image/upload/v1761168723/_ADM3854_ys3num.jpg"
		},
		{
			id: 14,
			name: 'The Rock Restaurant',
			details: t.rock_restaurant_details(),
			picture: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&auto=format&fit=crop&q=60'
		}
	];

	let selectedSite: TourArea | null = null;

	type TourArea = {
		id: number;
		name: string;
		details: string;
		picture: string;
	};

	/** @type {HTMLDialogElement} */
	let dialog: HTMLDialogElement | null = null;

	const openModal = (data: TourArea) => {
		selectedSite = data;
		dialog?.showModal();
	};
</script>

<div class="bg-gray-100 py-8 sm:py-12 md:py-20">
	<div class="container mx-auto px-4 md:px-8">
		<h3 class="mb-6 text-center text-2xl font-bold sm:text-3xl sm:mb-8 md:text-4xl">{t.zanzibar_experiences_title()}</h3>
		<div
			class="grid grid-cols-2 gap-4 md:gap-8 lg:grid-cols-3 xl:grid-cols-4 md:space-x-0 md:overflow-visible"
		>
			{#each tourAreaData as data (data.id)}
				<button
					type="button"
					class="card  image-full md:h-72 h-60 transform cursor-pointer shadow-lg transition-transform duration-300 hover:scale-105 md:w-full text-left p-0 border-0 bg-transparent focus:outline-none"
					aria-label={`See more details about ${data.name}`}
					on:click={() => openModal(data)}
				>
					<figure>
						<img src={data.picture} alt={data.name} class="h-full w-full object-cover" />
					</figure>
					<div class="card-body items-center justify-center text-center  bg-opacity-5">
						<h2 class="card-title text-lg font-bold text-white drop-shadow-lg sm:text-xl md:text-2xl">{data.name}</h2>
						<p class="mt-[30%] text-sm text-white drop-shadow-lg  sm:text-base">{t.click_to_see_more()}</p>
					</div>
				</button>
			{/each}
		</div>
	</div>
</div>

{#if selectedSite}
	<dialog bind:this={dialog} class="modal">
		<div transition:fade class="modal-box w-11/12 max-w-3xl rounded-lg p-0">
			<form method="dialog">
				<button class="btn btn-circle btn-ghost btn-sm absolute right-4 top-4 z-10 bg-white">✕</button
				>
			</form>
			<div>
				<img
					src={selectedSite.picture}
					alt={selectedSite.name}
					class="h-64 w-full rounded-t-lg object-cover"
				/>
				<div class="p-4 sm:p-6 md:p-8">
					<h3 class="text-xl font-bold sm:text-2xl">{selectedSite.name}</h3>
					<p class="mt-3 text-sm leading-relaxed sm:text-base sm:mt-4">{selectedSite.details}</p>
				</div>
			</div>
		</div>
	</dialog>
{/if}

<style>
	@media (max-width: 767px) {
		/* .carousel {
			display: flex;
			overflow-x: auto;
			scroll-snap-type: x mandatory;
			-webkit-overflow-scrolling: touch; 
			padding-bottom: 1rem;
		} */

		/* .carousel-item {
			flex: 0 0 80%; 
			scroll-snap-align: start;
			margin-right: 1rem;
		} */

		/* .carousel::-webkit-scrollbar {
			display: none; 
		} */

		/* .carousel {
			scrollbar-width: none; 
			-ms-overflow-style: none; 
		} */
	}
</style>
