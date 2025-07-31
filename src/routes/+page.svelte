<script>
	import About from '$lib/components/About.svelte';
    import Welcome from '$lib/components/Welcome.svelte';
    import TourGuideCard from '$lib/components/cards/TourGuideCard.svelte';
	import TourSiteCard from '$lib/components/cards/TourSiteCard.svelte';
        import * as m from '$lib/paraglide/messages';
</script>

<div class="h-full w-full max-md:scrollbar-hidden">
    <!-- <h1 class="font-bold text-2xl px-[5%] py-4">Home</h1> -->
    <Welcome />
    <div>
    <TourGuideCard />
    </div>
    <div>
        <TourSiteCard />
    </div>
    <div>
        <About />
    </div>
</div>