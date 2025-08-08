<script lang="ts">
	import { fade } from 'svelte/transition';
	import { m as t } from '$lib/paraglide/messages.js';

	const tourAreaData = [
		{
			id: 1,
			name: 'Serengeti National Park',
			details: t.tour_site_1_details(),
			picture:
				'https://media.istockphoto.com/id/1136053333/photo/elephant-and-lion.webp?a=1&b=1&s=612x612&w=0&k=20&c=rGXhl00oROy53jzfH_yOelzPmlJBHkkNE8xvZ5BZPjg='
		},
		{
			id: 2,
			name: 'Mount Kilimanjaro ',
			details: t.tour_site_2_details(),
			picture:
				'https://plus.unsplash.com/premium_photo-1664304370557-233bccc0ac85?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8TW91bnQlMjBLaWxpbWFuamFyb3xlbnwwfHwwfHx8MA%3D%3D'
		},
		{
			id: 3,
			name: 'Zanzibar Island',
			details: t.tour_site_3_details(),
			picture:
				'https://images.unsplash.com/photo-1711091704998-3bea86948c83?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fFphbnppYmFyJTIwSXNsYW5kfGVufDB8fDB8fHww'
		},
		{
			id: 4,
			name: 'Ngorongoro Crater',
			details: t.tour_site_4_details(),
			picture:
				'https://media.istockphoto.com/id/1196998582/photo/safari-vehicles-in-between-large-herds-of-animals-ngorongoro-crater-tanzania.webp?a=1&b=1&s=612x612&w=0&k=20&c=NxPZtigfAGjF_Ld3Qm04Md_hEBiCrdwXzdYi1P5OJLY='
		},
		{
			id: 5,
			name: 'Tarangire National Park',
			details: t.tour_site_5_details(),
			picture:
				'https://images.unsplash.com/photo-1707410437019-40c82e3a417f?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8VGFyYW5naXJlJTIwTmF0aW9uYWwlMjBQYXJrfGVufDB8fDB8fHww'
		},
		{
			id: 6,
			name: 'Nyerere National Park',
			details: t.tour_site_6_details(),
			picture:
				'https://media.istockphoto.com/id/2175769062/photo/female-masai-giraffe-and-impala-in-nyerere-national-park-selous-game-reserve-in-southern.webp?a=1&b=1&s=612x612&w=0&k=20&c=7N7kln0Ielh1Gwev7H9lm0BVLqIAZNJQlaGU6Tq-tyk='
		},
		{
			id: 7,
			name: 'Lake Manyara National Park ',
			details: t.tour_site_7_details(),
			picture:
				'https://media.istockphoto.com/id/1224066657/photo/flying-flamingo-over-the-lake-manyara.webp?a=1&b=1&s=612x612&w=0&k=20&c=t0Sc7OfcJGE6xWKOeBtZyC0ePLdjdSYtWyuHnTLhFhA='
		},
		{
			id: 8,
			name: 'Mafia Island',
			details: t.tour_site_8_details(),
			picture:
				'https://images.unsplash.com/photo-1675843776560-b936ba1a931a?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8TWFmaWElMjBJc2xhbmR8ZW58MHx8MHx8fDA%3D'
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
		<h3 class="mb-6 text-center text-2xl font-bold sm:text-3xl sm:mb-8 md:text-4xl">{t.tour_site_title()}</h3>
		<div
			class="md:grid md:grid-cols-2 md:gap-8 lg:grid-cols-3 xl:grid-cols-4 carousel md:space-x-0 md:overflow-visible"
		>
			{#each tourAreaData as data (data.id)}
				<button
					type="button"
					class="card carousel-item image-full h-80 transform cursor-pointer shadow-lg transition-transform duration-300 hover:scale-105 md:w-full text-left p-0 border-0 bg-transparent focus:outline-none"
					aria-label={`See more details about ${data.name}`}
					on:click={() => openModal(data)}
				>
					<figure>
						<img src={data.picture} alt={data.name} class="h-full w-full object-cover" />
					</figure>
					<div class="card-body items-center justify-center text-center">
						<h2 class="card-title text-lg font-bold text-white sm:text-xl md:text-2xl">{data.name}</h2>
						<p class="mt-1 text-sm text-white sm:mt-2 sm:text-base">{t.click_to_see_more()}</p>
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
		.carousel {
			display: flex;
			overflow-x: auto;
			scroll-snap-type: x mandatory;
			-webkit-overflow-scrolling: touch; /* for smooth scrolling on iOS */
			padding-bottom: 1rem; /* Add some space for the scrollbar */
		}

		.carousel-item {
			flex: 0 0 80%; /* Adjust card width for smaller screens */
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
