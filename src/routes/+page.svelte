<script>
	import About from '$lib/components/About.svelte';
	import Reviews from '$lib/components/Reviews.svelte';
    import Welcome from '$lib/components/Welcome.svelte';
    import TourGuideCard from '$lib/components/cards/TourGuideCard.svelte';
	import TourSiteCard from '$lib/components/cards/TourSiteCard.svelte';
        import * as m from '$lib/paraglide/messages';
	import AfricaVerse from '$lib/components/AfricaVerse.svelte';
</script>

<div class="h-full w-full max-md:scrollbar-hidden">
	<Welcome />
    <div class="px-4 md:px-0">
		<TourSiteCard />
	</div>
	<div class="px-4 md:px-0">
		<TourGuideCard />
	</div>
	<div class="px-4 md:px-0">
		<About />
	</div>
    <div class="px-4 md:px-0">
        <Reviews />
    </div>
	<div class="px-4 md:px-0">
		<AfricaVerse />
	</div>
</div>