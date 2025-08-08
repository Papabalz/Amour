<script>
	import { goto } from '$app/navigation';
	import { m } from '$lib/paraglide/messages.js';

	function navigate() {
		goto('/booking');
	}
</script>

<div class="welcome_bg ">
	<div class="welcome_container flex h-full w-full flex-col justify-center px-[2%] md:px-[5%]">
		<h1 class="text-center text-4xl font-bold text-white md:text-6xl">{m.welcome_title()}</h1>
		<p class="mt-4 text-center text-lg text-white md:text-xl">
			{m.welcome_subtitle()}
		</p>
		<div class="mt-8 flex justify-center">
			<button on:click={navigate} class="btn btn-primary btn-lg">{m.welcome_book_tour()}</button>
		</div>

		<div class="mt-12 text-center text-white">
			<h2 class="mb-4 text-3xl font-bold md:text-4xl">{m.welcome_why_visit_tanzania()}</h2>
			<p class="mx-auto max-w-3xl text-lg md:text-xl">
				{m.welcome_tanzania_description()}
			</p>
		</div>
	</div>
</div>

<style>
	.welcome_bg {
		background-image: url('/zanzibar.jpg');
		height: 550px;
		width: 100%;
		background-size: cover;
		background-position: center;
		background-repeat: no-repeat;
	}
	.welcome_container {
		background-color: rgba(20, 20, 40, 0.6);
	}
</style>