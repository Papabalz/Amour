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
	
	const locations = [
		{
			name: 'Nakupenda Sandbank',
			packages: [
				{ name: 'Sandbank Day Trip', duration: '6 hours', price: '$75', image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400&h=300&fit=crop' },
				{ name: 'Sandbank & Snorkeling', duration: '1 day', price: '$120', image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop' },
				{ name: 'Island Hopping Adventure', duration: '3 days', price: '$350', image: '/zanzibar.jpg' },
				{ name: 'Beach Paradise Package', duration: '5 days', price: '$580', image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400&h=300&fit=crop' }
			]
		},
		{
			name: 'Safari Blue',
			packages: [
				{ name: 'Safari Blue Half Day', duration: '6 hours', price: '$85', image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop' },
				{ name: 'Safari Blue Full Day', duration: '1 day', price: '$140', image: '/zanzibar.jpg' },
				{ name: 'Safari Blue & Culture', duration: '3 days', price: '$420', image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400&h=300&fit=crop' },
				{ name: 'Safari Blue Explorer', duration: '5 days', price: '$650', image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop' }
			]
		},
		{
			name: 'Spice Tour',
			packages: [
				{ name: 'Spice Farm Visit', duration: '6 hours', price: '$45', image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop' },
				{ name: 'Spice & Stone Town', duration: '1 day', price: '$90', image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop' },
				{ name: 'Spice & Culture Tour', duration: '3 days', price: '$280', image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop' },
				{ name: 'Spice Island Discovery', duration: '5 days', price: '$450', image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop' }
			]
		},
		{
			name: 'Prison Island',
			packages: [
				{ name: 'Giant Tortoise Visit', duration: '6 hours', price: '$60', image: 'https://images.unsplash.com/photo-1437622368342-7a3d73a34c8f?w=400&h=300&fit=crop' },
				{ name: 'Prison Island & Snorkeling', duration: '1 day', price: '$125', image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400&h=300&fit=crop' },
				{ name: 'Island History Tour', duration: '3 days', price: '$380', image: 'https://images.unsplash.com/photo-1437622368342-7a3d73a34c8f?w=400&h=300&fit=crop' },
				{ name: 'Prison Island Explorer', duration: '5 days', price: '$600', image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400&h=300&fit=crop' }
			]
		},
		{
			name: 'Jozani Forest',
			packages: [
				{ name: 'Red Colobus Monkey Tour', duration: '6 hours', price: '$55', image: 'https://images.unsplash.com/photo-1564760055775-d63b17a55c44?w=400&h=300&fit=crop' },
				{ name: 'Forest & Wildlife Day', duration: '1 day', price: '$110', image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=300&fit=crop' },
				{ name: 'Nature Photography Safari', duration: '3 days', price: '$320', image: 'https://images.unsplash.com/photo-1564760055775-d63b17a55c44?w=400&h=300&fit=crop' },
				{ name: 'Eco Adventure Package', duration: '5 days', price: '$520', image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=300&fit=crop' }
			]
		},
		{
			name: 'Mnemba Snorkeling',
			packages: [
				{ name: 'Mnemba Snorkel Trip', duration: '6 hours', price: '$95', image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400&h=300&fit=crop' },
				{ name: 'Mnemba & Dolphin Tour', duration: '1 day', price: '$160', image: '/zanzibar.jpg' },
				{ name: 'Marine Life Explorer', duration: '3 days', price: '$480', image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400&h=300&fit=crop' },
				{ name: 'Diving & Snorkel Package', duration: '5 days', price: '$750', image: '/zanzibar.jpg' }
			]
		},
		{
			name: 'Culture Tour',
			packages: [
				{ name: 'Village Culture Visit', duration: '6 hours', price: '$50', image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop' },
				{ name: 'Cultural Immersion Day', duration: '1 day', price: '$100', image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop' },
				{ name: 'Heritage & Tradition Tour', duration: '3 days', price: '$300', image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop' },
				{ name: 'Cultural Discovery Package', duration: '5 days', price: '$480', image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop' }
			]
		},
		{
			name: 'Sunset Cruise',
			packages: [
				{ name: 'Dhow Sunset Cruise', duration: '6 hours', price: '$65', image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop' },
				{ name: 'Sunset & Dinner Cruise', duration: '1 day', price: '$120', image: '/zanzibar.jpg' },
				{ name: 'Romantic Sunset Package', duration: '3 days', price: '$360', image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop' },
				{ name: 'Sunset & Island Hopping', duration: '5 days', price: '$580', image: '/zanzibar.jpg' }
			]
		},
		{
			name: 'Blue Lagoon',
			packages: [
				{ name: 'Blue Lagoon Swimming', duration: '6 hours', price: '$70', image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400&h=300&fit=crop' },
				{ name: 'Blue Lagoon & Mangroves', duration: '1 day', price: '$130', image: '/zanzibar.jpg' },
				{ name: 'Lagoon Adventure Tour', duration: '3 days', price: '$390', image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400&h=300&fit=crop' },
				{ name: 'Blue Lagoon Explorer', duration: '5 days', price: '$620', image: '/zanzibar.jpg' }
			]
		},
		{
			name: 'Kizimkazi Dolphin',
			packages: [
				{ name: 'Dolphin Watching Tour', duration: '6 hours', price: '$80', image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400&h=300&fit=crop' },
				{ name: 'Dolphin Swimming Experience', duration: '1 day', price: '$150', image: '/zanzibar.jpg' },
				{ name: 'Dolphin & Snorkel Adventure', duration: '3 days', price: '$450', image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400&h=300&fit=crop' },
				{ name: 'Marine Wildlife Package', duration: '5 days', price: '$720', image: '/zanzibar.jpg' }
			]
		},
		{
			name: 'Buggy/Quad Bike',
			packages: [
				{ name: 'Quad Bike Adventure', duration: '6 hours', price: '$90', image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=300&fit=crop' },
				{ name: 'Buggy Island Tour', duration: '1 day', price: '$170', image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=300&fit=crop' },
				{ name: 'Off-Road Explorer', duration: '3 days', price: '$500', image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=300&fit=crop' },
				{ name: 'Adventure Sports Package', duration: '5 days', price: '$800', image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=300&fit=crop' }
			]
		},
		{
			name: 'Salaam Cave',
			packages: [
				{ name: 'Cave Exploration Tour', duration: '6 hours', price: '$55', image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=300&fit=crop' },
				{ name: 'Cave & Underground Adventure', duration: '1 day', price: '$105', image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=300&fit=crop' },
				{ name: 'Spelunking Adventure', duration: '3 days', price: '$315', image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=300&fit=crop' },
				{ name: 'Cave Explorer Package', duration: '5 days', price: '$500', image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=300&fit=crop' }
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

		{#each locations as location}
			<div class="mb-12 md:mb-16">
				<h2 class="text-xl sm:text-2xl md:text-3xl font-bold text-center text-gray-800 mb-6 md:mb-8 px-2">
					{location.name}
				</h2>
				
				<div class="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
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
										on:click={(e) => bookNow(e, location.name, pkg.name, pkg.price)}
										type="button"
									>
										Book Now
									</button>
								</div>
							</div>
						</div>
					{/each}
				</div>
			</div>
		{/each}
	</div>
</div>