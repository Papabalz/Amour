<script>
	import { goto } from '$app/navigation';
	import { m } from '$lib/paraglide/messages.js';
	import { onMount } from 'svelte';

	function navigate() {
		goto('/packages');
	}

	const backgroundImages = [
		'https://res.cloudinary.com/ddsgcceuj/image/upload/v1761614968/_ADM3854_rippzc.jpg',
		'https://res.cloudinary.com/ddsgcceuj/image/upload/v1761614612/olga-budko-hl0W9gS0C6k-unsplash_aekauk.jpg',
		'https://res.cloudinary.com/ddsgcceuj/image/upload/v1761614621/pexels-robyn-w-2788803-10708652_1_zvrrhx.jpg',
		'https://res.cloudinary.com/ddsgcceuj/image/upload/v1761614970/_ADM3859_sko2fi.jpg',
		'https://res.cloudinary.com/ddsgcceuj/image/upload/v1761614619/pexels-keeganjchecks-4995594_kevfxp.jpg',
		'https://res.cloudinary.com/ddsgcceuj/image/upload/v1761614996/OKHK5314_jdzoux.jpg',
		'https://res.cloudinary.com/ddsgcceuj/image/upload/v1761614623/rock_restaurant_npf2fi.jpg',
		'https://res.cloudinary.com/ddsgcceuj/image/upload/v1761614973/_ADM3915_luejrd.jpg',
		'https://res.cloudinary.com/ddsgcceuj/image/upload/v1761614613/pexels-akos-helgert-82252426-8804731_ni6bve.jpg',
		'https://res.cloudinary.com/ddsgcceuj/image/upload/v1761614923/DSC_1187_jasvv2.jpg',
		'https://res.cloudinary.com/ddsgcceuj/image/upload/v1761614921/DSC_1176_cttwcl.jpg',
		'https://res.cloudinary.com/ddsgcceuj/image/upload/v1761614919/DSC_1174_ujtvbu.jpg',
		'https://res.cloudinary.com/ddsgcceuj/image/upload/v1761614619/pexels-meddybates-13675821_cjw63d.jpg',
		'https://res.cloudinary.com/ddsgcceuj/image/upload/v1761614821/DSC_1008_dyqcso.jpg',
		'https://res.cloudinary.com/ddsgcceuj/image/upload/v1761614916/DSC_1171_ovrrom.jpg',
		'https://res.cloudinary.com/ddsgcceuj/image/upload/v1761614864/DSC_1215_pevldr.jpg',
		'https://res.cloudinary.com/ddsgcceuj/image/upload/v1761614618/pexels-dajana-reci-289671698-30125136_lsnlg5.jpg',
		'https://res.cloudinary.com/ddsgcceuj/image/upload/v1761614914/DSC_1100_bumofs.jpg',
		'https://res.cloudinary.com/ddsgcceuj/image/upload/v1761614823/DSC_1057_rndror.jpg',
		'https://res.cloudinary.com/ddsgcceuj/image/upload/v1761614616/pexels-dave-white-826945053-19357947_hu4krx.jpg',
		'https://res.cloudinary.com/ddsgcceuj/image/upload/v1761614720/CBFN2869_t8u4qo.webp',
		'https://res.cloudinary.com/ddsgcceuj/image/upload/v1761614723/DSC_1153_-_Copy_sitvwd.jpg',
		'https://res.cloudinary.com/ddsgcceuj/image/upload/v1761614820/DSC_0988_ocomix.jpg',
		'https://res.cloudinary.com/ddsgcceuj/image/upload/v1761614610/massai_uosdgl.jpg',
		'https://res.cloudinary.com/ddsgcceuj/image/upload/v1761614608/massai_3_omuo9z.jpg',
		'https://res.cloudinary.com/ddsgcceuj/image/upload/v1761614605/jozani_2_xaxj54.jpg'
	];

	let currentImageIndex = 0;

	onMount(() => {
		const interval = setInterval(() => {
			currentImageIndex = (currentImageIndex + 1) % backgroundImages.length;
		}, 5000);

		return () => clearInterval(interval);
	});
</script>

<div class="welcome_bg" style="background-image: url('{backgroundImages[currentImageIndex]}')">
	<div class="welcome_container flex h-full w-full flex-col justify-center px-[2%] md:px-[5%]">
		<h1 class="text-center text-2xl font-bold text-white sm:text-4xl md:text-6xl">{m.welcome_title()}</h1>
		<p class="mt-3 text-center text-base text-white sm:text-lg md:mt-4 md:text-xl">
			{m.welcome_subtitle()}
		</p>
		<div class="mt-6 flex justify-center md:mt-8">
			<button on:click={navigate} class="btn btn-primary btn-md md:btn-lg">{m.welcome_book_tour()}</button>
		</div>

		<div class="mt-8 text-center text-white md:mt-12">
			<h2 class="mb-3 text-xl font-bold sm:text-2xl md:mb-4 md:text-4xl">{m.welcome_why_visit_tanzania()}</h2>
			<p class="mx-auto max-w-3xl text-sm leading-relaxed sm:text-base md:text-xl">
				{m.welcome_tanzania_description()}
			</p>
		</div>
	</div>
</div>

<style>
	.welcome_bg {
		height: 500px;
		width: 100%;
		background-size: cover;
		background-position: center;
		background-repeat: no-repeat;
		transition: background-image 1s ease-in-out;
	}
	/* @media screen and (max-width: 767px) {
		.welcome_bg {
			height: 950px;
		}
	} */
	.welcome_container {
		background-color: rgba(20, 20, 40, 0.6);
	}
</style>