<script lang="ts">
	import { fade } from 'svelte/transition';
	import { m as t } from '$lib/paraglide/messages.js';

	type TourGuide = {
		id: number;
		userName: string;
		title: string;
		bio: string;
		sex: "Male" | "Female";
		experience: string;
		picture: string;
	};

	const tourGuideData: TourGuide[] = [
		{
			id: 1,
			userName: 'Kenedy Bolo',
			title: t.tour_guide_1_title(),
			bio: t.tour_guide_1_bio(),
			sex: 'Male',
			experience: '9 years',
			picture:
				'https://plus.unsplash.com/premium_photo-1683319786517-cee29230b0e1?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fGFmcmljYW4lMjBtYWxlJTIwdG91ciUyMGd1aWRlfGVufDB8fDB8fHww'
		},
		{
			id: 2,
			userName: 'Amina Bello',
			title: t.tour_guide_2_title(),
			bio: t.tour_guide_2_bio(),
			sex: 'Female',
			experience: '8 years',
			picture:
				'https://plus.unsplash.com/premium_photo-1664910887005-031e2ac9c40b?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fGFmcmljYW4lMjBmZW1hbGUlMjB0b3VyJTIwZ3VpZGV8ZW58MHx8MHx8fDA%3D'
		},
		{
			id: 3,
			userName: 'Chinyere Eze',
			title: t.tour_guide_3_title(),
			bio: t.tour_guide_3_bio(),
			sex: 'Female',
			experience: '5 years',
			picture:
				'https://images.unsplash.com/photo-1623362004345-ec72ea0144be?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8YWZyaWNhbiUyMGZlbWFsZSUyMHRvdXIlMjBndWlkZXxlbnwwfHwwfHx8MA%3D%3D'
		},
		{
			id: 4,
			userName: ' Peter Nwankwo',
			title: t.tour_guide_4_title(),
			bio: t.tour_guide_4_bio(),
			sex: 'Male',
			experience: '11 years',
			picture:
				'https://media.istockphoto.com/id/2161352965/photo/young-togolese-man-is-looking-at-camera.webp?a=1&b=1&s=612x612&w=0&k=20&c=5BQd-RVQy23bnmYFnmAPrGGvAQKD6eFUudRFfPAXT9s='
		},
		{
			id: 5,
			userName: 'Tunde Lawal',
			title: t.tour_guide_5_title(),
			bio: t.tour_guide_5_bio(),
			sex: 'Male',
			experience: '7 years',
			picture:
				'https://images.unsplash.com/photo-1557040640-9ae9fb23e085?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fGFmcmljYW4lMjBtYWxlJTIwdG91ciUyMGd1aWRlfGVufDB8fDB8fHww'
		},
		{
			id: 6,
			userName: 'Fatima Hassan',
			title: t.tour_guide_6_title(),
			bio: t.tour_guide_6_bio(),
			sex: 'Female',
			experience: '6 years',
			picture:
				'https://media.istockphoto.com/id/2177650491/photo/portraits-of-a-young-black-woman-with-yellow-dress-outdoors.webp?a=1&b=1&s=612x612&w=0&k=20&c=8CA9vcQ1XbHQJT2B7e7wufpffe28X-L74O30AHBKJXY='
		}
	];

	let selectedProfile: TourGuide | null = null;

	let dialog: HTMLDialogElement | null;

	function openModal(data: TourGuide) {
		selectedProfile = data;
		dialog?.showModal();
	}
</script>

<div class="py-8 sm:py-12 md:py-20">
	<div class="container mx-auto px-4 md:px-8">
		<h3 class="mb-6 text-center text-2xl font-bold sm:text-3xl md:mb-8 md:text-4xl">{t.tour_guide_title()}</h3>
		<div
			class="md:grid md:grid-cols-2 md:gap-8 lg:grid-cols-3 xl:grid-cols-4 carousel md:space-x-0 md:overflow-visible"
		>
			{#each tourGuideData as data (data.id)}
				<div
					class="card carousel-item transform overflow-hidden rounded-lg bg-white shadow-lg transition-transform duration-300 hover:scale-105 md:w-full"
				>
					<figure>
						<img src={data.picture} alt={data.userName} class="h-64 w-full object-cover" />
					</figure>
					<div class="card-body p-4 sm:p-5 md:p-6">
						<h2 class="card-title text-lg font-bold sm:text-xl md:text-2xl">{data.userName}</h2>
						<p class="text-sm mt-1 text-primary sm:text-base md:text-md">{data.title}</p>
						<!-- <p class="mt-4 text-gray-600">{data.bio.slice(0, 100)}...</p> -->
						<div class="card-actions mt-4 justify-end sm:mt-5 md:mt-6">
							<button on:click={() => openModal(data)} class="btn btn-primary btn-sm sm:btn-md">{t.view_profile()}</button>
						</div>
					</div>
				</div>
			{/each}
		</div>
	</div>
</div>

{#if selectedProfile}
	<dialog bind:this={dialog} class="modal">
		<div transition:fade class="modal-box w-11/12 max-w-2xl rounded-lg p-4 sm:p-6 md:p-8">
			<form method="dialog">
				<button class="btn btn-circle btn-ghost btn-sm absolute right-4 top-4">✕</button>
			</form>
			<div class="text-center">
				<div class="avatar mx-auto mb-4">
					<div class="w-20 rounded-full ring ring-primary ring-offset-2 ring-offset-base-100 sm:w-24">
						<img src={selectedProfile.picture} alt={selectedProfile.userName} />
					</div>
				</div>
				<h3 class="text-lg font-bold sm:text-xl md:text-2xl">{selectedProfile.userName}</h3>
				<p class="text-sm py-2 font-semibold text-primary sm:text-base md:text-md">{selectedProfile.experience} of experience</p>
				<p class="mt-3 text-left text-sm leading-relaxed sm:text-base md:mt-4 md:text-base">{selectedProfile.bio}</p>
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
