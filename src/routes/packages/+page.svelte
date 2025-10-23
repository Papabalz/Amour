<script lang="ts">
	import * as t from '$lib/paraglide/messages';
	import { goto } from '$app/navigation';

	function navigateToPackage(locationName: string, packageName: string) {
		const locationSlug = locationName.toLowerCase().replace(/[^a-z0-9]+/g, '-');
		const packageSlug = packageName.toLowerCase().replace(/[^a-z0-9]+/g, '-');
		goto(`/packages/${locationSlug}/${packageSlug}`);
	}

	function bookNow(event: Event, locationName: string, packageName: string, price: string) {
		event.stopPropagation();
		const numericPrice = price.replace('$', '');
		goto(`/booking?location=${encodeURIComponent(locationName)}&package=${encodeURIComponent(packageName)}&price=${numericPrice}`);
	}

	function getGroupPrice(people: number): number {
		if (people === 1) return 140;
		if (people === 2) return 100;
		if (people === 3) return 70;
		if (people === 4) return 60;
		if (people === 5) return 50;
		return 40; // 6+ people
	}
	
	const locations = [
		{
			name: 'Safari Blue',
			packages: [
				{ name: 'Safari Blue Tour', duration: 'Full day', price: 'From $50', image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop', groupPricing: true, basePrice: 200 }
			]
		},
		{
			name: 'Stone Town',
			packages: [
				{ name: 'Stone Town Tour', duration: '6 hours', price: 'From $40', image: "https://res.cloudinary.com/ddsgcceuj/image/upload/v1761169340/DSC_0988_tvcoed.jpg", groupPricing: true, basePrice: 140 }
			]
		},
		{
			name: 'Prison Island',
			packages: [
				{ name: 'Prison Island Tour', duration: '6 hours', price: 'From $45', image: 'https://images.unsplash.com/photo-1437622368342-7a3d73a34c8f?w=400&h=300&fit=crop', groupPricing: true, basePrice: 150 }
			]
		},
		{
			name: 'Nakupenda Sandbank',
			packages: [
				{ name: 'Sandbank Day Trip', duration: '6 hours', price: 'From $45', image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400&h=300&fit=crop', groupPricing: true, basePrice: 170 }
			]
		},
		{
			name: 'Mnemba Snorkeling',
			packages: [
				{ name: 'Mnemba Snorkel Trip', duration: '6 hours', price: 'From $55', image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400&h=300&fit=crop', groupPricing: true, basePrice: 180 }
			]
		},
		{
			name: 'Spice Tour',
			packages: [
				{ name: 'Spice Tour', duration: '6 hours', price: 'From $35', image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop', groupPricing: true, basePrice: 120 }
			]
		},
		{
			name: 'Jozani Forest',
			packages: [
				{ name: 'Jozani Forest Tour', duration: '6 hours', price: 'From $35', image: 'https://images.unsplash.com/photo-1564760055775-d63b17a55c44?w=400&h=300&fit=crop', groupPricing: true, basePrice: 130 }
			]
		},
		{
			name: 'Kizimkazi Dolphin',
			packages: [
				{ name: 'Kizimkazi Dolphin Tour', duration: '6 hours', price: 'From $40', image: "https://res.cloudinary.com/ddsgcceuj/image/upload/v1761169503/DIYP0607_kdxuvk.webp", groupPricing: true, basePrice: 160 }
				]
		},
		{
			name: 'Sunset Cruise',
			packages: [
				{ name: 'Sunset Cruise', duration: '6 hours', price: 'From $30', image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop', groupPricing: true, basePrice: 110 }
			]
		},
		{
			name: 'Blue Lagoon',
			packages: [
				{ name: 'Blue Lagoon', duration: '6 hours', price: 'From $35', image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400&h=300&fit=crop', groupPricing: true, basePrice: 110 }
			]
		},
		{
			name: 'Culture Tour',
			packages: [
				{ name: 'Culture Tour', duration: '6 hours', price: 'From $35', image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop', groupPricing: true, basePrice: 150 }
			]
		},
		{
			name: 'The Rock Restaurant',
			packages: [
				{ name: 'The Rock Restaurant', duration: '6 hours', price: 'From $30', image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=300&fit=crop', groupPricing: true, basePrice: 110 }
			]
		},
		{
			name: 'Salaam Cave',
			packages: [
				{ name: 'Salaam Cave Tour', duration: '6 hours', price: 'From $30', image: "https://res.cloudinary.com/ddsgcceuj/image/upload/v1761168723/_ADM3854_ys3num.jpg", groupPricing: true, basePrice: 120 }
			]
		},
		{
			name: 'Buggy/Quad Bike',
			packages: [
				{ name: 'Buggy/Quad Bike Adventure', duration: '6 hours', price: '$190', image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=300&fit=crop', groupPricing: true, basePrice: 160 }
				]
		},
		{
			name: 'Stone town tour & spice tour',
			packages: [
				{ name: 'Stone town tour & spice tour', duration: '8 hours', price: 'From $50', image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=300&fit=crop', groupPricing: true, basePrice: 110 }
			]
		},
		{
			name: 'Stone Town & Prison Island',
			packages: [
				{ name: 'Stone Town & Prison Island Tour', duration: '8 hours', price: 'From $60', image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400&h=300&fit=crop', groupPricing: true, basePrice: 220 }
			]
		},
		{
			name: 'Prison Island & Nakupenda',
			packages: [
				{ name: 'Prison Island & Nakupenda Tour', duration: '8 hours', price: 'From $50', image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400&h=300&fit=crop', groupPricing: true, basePrice: 240 }
			]
		},
		{
			name: 'Jozani & Spice',
			packages: [
				{ name: 'Jozani & Spice Tour', duration: '8 hours', price: 'From $40', image: 'https://images.unsplash.com/photo-1564760055775-d63b17a55c44?w=400&h=300&fit=crop', groupPricing: true, basePrice: 210 }
			]
		},
		{
			name: 'Jozani & The Rock',
			packages: [
				{ name: 'Jozani & The Rock Tour', duration: '8 hours', price: 'From $55', image: 'https://images.unsplash.com/photo-1564760055775-d63b17a55c44?w=400&h=300&fit=crop', groupPricing: true, basePrice: 240 }
			]
		},
		{
			name: 'The Rock & Salaam Cave',
			packages: [
				{ name: 'The Rock & Salaam Cave Tour', duration: '8 hours', price: 'From $40', image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=300&fit=crop', groupPricing: true, basePrice: 240 }
			]
		},
		{
			name: 'Stone Town & Spice & Prison',
			packages: [
				{ name: 'Stone Town & Spice & Prison Tour', duration: '10 hours', price: 'From $120', image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400&h=300&fit=crop', groupPricing: true, basePrice: 370 }
			]
		}
	];
</script>

<div class="min-h-screen bg-gradient-to-b from-blue-50 to-white">
	<div class="container mx-auto px-4 py-8">
		<div class="text-center mb-8 md:mb-12">
			<h1 class="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-3 md:mb-4 px-2">
				{t.zanzibar_experiences_title()}
			</h1>
			<p class="text-sm sm:text-base md:text-lg text-gray-600 max-w-2xl mx-auto px-4">
				{t.packages_description()}
			</p>
		</div>

		<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
			{#each locations as location}
				{#each location.packages as pkg}
					<div class="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 w-full">
							<div class="h-48 bg-gray-200 relative">
								<img src={pkg.image} alt={pkg.name} class="w-full h-full object-cover" />
								<div class="absolute top-4 right-4 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
									{pkg.price}
								</div>
							</div>
							
							<div class="p-4 md:p-6">
								<h3 class="text-lg md:text-xl font-semibold text-gray-800 mb-2 leading-tight">
									{pkg.name}
								</h3>
								<p class="text-sm md:text-base text-gray-600 mb-3 md:mb-4">
									<span class="inline-flex items-center">
										<svg class="w-3 h-3 md:w-4 md:h-4 mr-1 md:mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
											<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
										</svg>
										{pkg.duration}
									</span>
								</p>
								
								{#if 'groupPricing' in pkg && pkg.groupPricing}
									<div class="mb-3 text-xs text-gray-500">
										<div class="text-center font-medium mb-2">Group Pricing (per person)</div>
										<div class="grid grid-cols-2 gap-1 text-center">
											{#if location.name === 'Stone Town'}
												<div>1p: $140</div>
												<div>2p: $100</div>
												<div>3p: $70</div>
												<div>4p: $60</div>
												<div>5p: $50</div>
												<div>6+p: $40</div>
											{:else if location.name === 'Nakupenda Sandbank'}
												<div>1p: $170</div>
												<div>2p: $130</div>
												<div>3p: $90</div>
												<div>4p: $65</div>
												<div>5p: $50</div>
												<div>6+p: $45</div>
											{:else if location.name === 'Safari Blue'}
												<div>1p: $200</div>
												<div>2p: $140</div>
												<div>3p: $110</div>
												<div>4p: $75</div>
												<div>5p: $55</div>
												<div>6+p: $50</div>
											{:else if location.name === 'Spice Tour'}
												<div>1p: $120</div>
												<div>2p: $90</div>
												<div>3p: $65</div>
												<div>4p: $50</div>
												<div>5p: $40</div>
												<div>6+p: $35</div>
											{:else if location.name === 'Prison Island'}
												<div>1p: $150</div>
												<div>2p: $110</div>
												<div>3p: $70</div>
												<div>4p: $60</div>
												<div>5p: $55</div>
												<div>6+p: $45</div>
											{:else if location.name === 'Jozani Forest'}
												<div>1p: $130</div>
												<div>2p: $90</div>
												<div>3p: $60</div>
												<div>4p: $50</div>
												<div>5p: $40</div>
												<div>6+p: $35</div>
											{:else if location.name === 'Mnemba Snorkeling'}
												<div>1p: $180</div>
												<div>2p: $140</div>
												<div>3p: $90</div>
												<div>4p: $70</div>
												<div>5p: $60</div>
												<div>6+p: $55</div>
											{:else if location.name === 'Culture Tour'}
												<div>1p: $150</div>
												<div>2p: $110</div>
												<div>3p: $70</div>
												<div>4p: $50</div>
												<div>5p: $45</div>
												<div>6+p: $35</div>
											{:else if location.name === 'Sunset Cruise'}
												<div>1p: $110</div>
												<div>2p: $90</div>
												<div>3p: $60</div>
												<div>4p: $50</div>
												<div>5p: $40</div>
												<div>6+p: $30</div>
											{:else if location.name === 'Blue Lagoon'}
												<div>1p: $110</div>
												<div>2p: $110</div>
												<div>3p: $65</div>
												<div>4p: $40</div>
												<div>5p: $40</div>
												<div>6+p: $35</div>
											{:else if location.name === 'Kizimkazi Dolphin'}
												<div>1p: $160</div>
												<div>2p: $160</div>
												<div>3p: $80</div>
												<div>4p: $65</div>
												<div>5p: $60</div>
												<div>6+p: $40</div>
											{:else if location.name === 'Buggy/Quad Bike'}
												<div>1p: $190</div>
												<div>2p: $190</div>
												<div>3p: $190</div>
												<div>4p: $190</div>
												<div>5p: $190</div>
												<div>6+p: $190</div>
											{:else if location.name === 'Salaam Cave'}
												<div>1p: $120</div>
												<div>2p: $90</div>
												<div>3p: $60</div>
												<div>4p: $40</div>
												<div>5p: $40</div>
												<div>6+p: $30</div>
											{:else if location.name === 'The Rock Restaurant'}
												<div>1p: $110</div>
												<div>2p: $60</div>
												<div>3p: $40</div>
												<div>4p: $40</div>
												<div>5p: $40</div>
												<div>6+p: $30</div>
											{:else if location.name === 'Stone town tour & spice tour'}
												<div>1p: $230</div>
												<div>2p: $120</div>
												<div>3p: $80</div>
												<div>4p: $70</div>
												<div>5p: $55</div>
												<div>6+p: $50</div>
											{:else if location.name === 'Stone Town & Prison Island'}
												<div>1p: $220</div>
												<div>2p: $130</div>
												<div>3p: $90</div>
												<div>4p: $80</div>
												<div>5p: $70</div>
												<div>6+p: $60</div>
											{:else if location.name === 'Prison Island & Nakupenda'}
												<div>1p: $240</div>
												<div>2p: $140</div>
												<div>3p: $120</div>
												<div>4p: $80</div>
												<div>5p: $65</div>
												<div>6+p: $50</div>
											{:else if location.name === 'Stone Town & Spice & Prison'}
												<div>1p: $370</div>
												<div>2p: $310</div>
												<div>3p: $270</div>
												<div>4p: $230</div>
												<div>5p: $160</div>
												<div>6+p: $120</div>
											{:else if location.name === 'Jozani & Spice'}
												<div>1p: $210</div>
												<div>2p: $120</div>
												<div>3p: $90</div>
												<div>4p: $70</div>
												<div>5p: $55</div>
												<div>6+p: $40</div>
											{:else if location.name === 'Jozani & The Rock'}
												<div>1p: $240</div>
												<div>2p: $170</div>
												<div>3p: $170</div>
												<div>4p: $160</div>
												<div>5p: $120</div>
												<div>6+p: $55</div>
											{:else if location.name === 'The Rock & Salaam Cave'}
												<div>1p: $240</div>
												<div>2p: $140</div>
												<div>3p: $90</div>
												<div>4p: $80</div>
												<div>5p: $60</div>
												<div>6+p: $40</div>
											{/if}
										</div>
									</div>
								{/if}
								
								<div class="flex gap-1 md:gap-2">
									<button 
										class="flex-1 bg-gray-100 text-gray-700 px-2 md:px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors font-medium text-xs md:text-sm"
										on:click={() => navigateToPackage(location.name, pkg.name)}
										type="button"
									>
										View Details
									</button>
									<button 
										class="flex-1 bg-blue-600 text-white px-2 md:px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium text-xs md:text-sm"
										on:click={(e) => bookNow(e, location.name, pkg.name, ('basePrice' in pkg && pkg.basePrice) ? `$${pkg.basePrice}` : pkg.price)}
										type="button"
									>
										Book Now
									</button>
								</div>
							</div>
						</div>
					{/each}
				{/each}
		</div>
	</div>
</div>