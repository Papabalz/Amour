<script>
	import { goto } from '$app/navigation';
	import { m } from '$lib/paraglide/messages.js';

	function navigate() {
		goto('/packages');
	}
</script>

<div class="welcome_bg ">
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
		background-image: url('/zanzibar.jpg');
		height: 500px;
		width: 100%;
		background-size: cover;
		background-position: center;
		background-repeat: no-repeat;
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