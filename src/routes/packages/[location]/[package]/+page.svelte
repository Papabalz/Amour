<script lang="ts">
	import { page } from '$app/stores';
	import * as t from '$lib/paraglide/messages';
	import { goto } from '$app/navigation';

	$: location = $page.params.location;
	$: packageName = $page.params.package;

	const packageData: Record<string, Record<string, any>> = {
		'nakupenda-sandbank': {
			'sandbank-day-trip': { name: 'Sandbank Day Trip', duration: '6 hours', price: '$75', image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&h=400&fit=crop', description: t.nakupenda_details(), includes: ['Boat transfer', 'Snorkeling equipment', 'Fresh seafood lunch', 'Tropical fruits', 'Professional guide'] },
			'sandbank-snorkeling': { name: 'Sandbank & Snorkeling', duration: '1 day', price: '$120', image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=400&fit=crop', description: t.nakupenda_details(), includes: ['Full day boat trip', 'Multiple snorkel sites', 'Equipment provided', 'Lunch on sandbank', 'Refreshments', 'Guide'] },
			'island-hopping-adventure': { name: 'Island Hopping Adventure', duration: '3 days', price: '$350', image: '/zanzibar.jpg', description: t.nakupenda_details(), includes: ['3 days accommodation', 'All meals', 'Island transfers', 'Snorkeling gear', 'Multiple destinations', 'Local guide'] },
			'beach-paradise-package': { name: 'Beach Paradise Package', duration: '5 days', price: '$580', image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&h=400&fit=crop', description: t.nakupenda_details(), includes: ['5 days beach resort', 'All meals included', 'Daily activities', 'Spa treatments', 'Water sports', 'Airport transfers'] }
		},
		'safari-blue': {
			'safari-blue-half-day': { name: 'Safari Blue Half Day', duration: '6 hours', price: '$85', image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=400&fit=crop', description: t.safari_blue_details(), includes: ['Traditional dhow boat', 'Snorkeling stops', 'Seafood lunch', 'Tropical fruits', 'Swimming lagoon', 'Professional crew'] },
			'safari-blue-full-day': { name: 'Safari Blue Full Day', duration: '1 day', price: '$140', image: '/zanzibar.jpg', description: t.safari_blue_details(), includes: ['Full day dhow cruise', 'Multiple snorkel sites', 'Fresh seafood BBQ', 'Mangrove exploration', 'Swimming lagoon', 'All equipment'] },
			'safari-blue-culture': { name: 'Safari Blue & Culture', duration: '3 days', price: '$420', image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&h=400&fit=crop', description: t.safari_blue_details(), includes: ['Safari Blue tour', 'Cultural village visit', 'Accommodation', 'All meals', 'Local experiences', 'Transportation'] },
			'safari-blue-explorer': { name: 'Safari Blue Explorer', duration: '5 days', price: '$650', image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=400&fit=crop', description: t.safari_blue_details(), includes: ['Multiple dhow trips', 'Island exploration', 'Beach accommodation', 'All meals', 'Water activities', 'Cultural tours'] }
		},
		'spice-tour': {
			'spice-farm-visit': { name: 'Spice Farm Visit', duration: '6 hours', price: '$45', image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=400&fit=crop', description: t.spice_tour_details(), includes: ['Spice plantation tour', 'Traditional lunch', 'Spice samples', 'Local guide', 'Transportation', 'Fruit tasting'] },
			'spice-stone-town': { name: 'Spice & Stone Town', duration: '1 day', price: '$90', image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=400&fit=crop', description: t.spice_tour_details(), includes: ['Spice tour', 'Stone Town walking tour', 'Traditional lunch', 'Historical sites', 'Local guide', 'Transportation'] },
			'spice-culture-tour': { name: 'Spice & Culture Tour', duration: '3 days', price: '$280', image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=400&fit=crop', description: t.spice_tour_details(), includes: ['Multiple spice farms', 'Cultural experiences', 'Accommodation', 'All meals', 'Village visits', 'Cooking classes'] },
			'spice-island-discovery': { name: 'Spice Island Discovery', duration: '5 days', price: '$450', image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=400&fit=crop', description: t.spice_tour_details(), includes: ['Comprehensive spice tours', 'Cultural immersion', 'Accommodation', 'All meals', 'Cooking workshops', 'Market visits'] }
		}
	};

	$: currentPackage = packageData[location]?.[packageName];
	$: locationTitle = location?.split('-').map((word: string) => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');

	function bookNow() {
		const locationParam = location?.replace(/\s+/g, '-').toLowerCase();
		const packageParam = packageName?.replace(/\s+/g, '-').toLowerCase();
		const price = currentPackage?.price?.replace('$', '') || '100';
		goto(`/booking?location=${locationParam}&package=${packageParam}&price=${price}`);
	}
</script>

{#if currentPackage}
<div class="min-h-screen bg-gray-50">
	<div class="relative h-96 bg-cover bg-center" style="background-image: url('{currentPackage.image}')">
		<div class="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
			<div class="text-center text-white">
				<h1 class="text-4xl md:text-6xl font-bold mb-4">{currentPackage.name}</h1>
				<p class="text-xl">{locationTitle}</p>
			</div>
		</div>
	</div>

	<div class="container mx-auto px-4 py-12">
		<div class="grid md:grid-cols-3 gap-8">
			<div class="md:col-span-2">
				<div class="bg-white rounded-lg shadow-lg p-8 mb-8">
					<h2 class="text-3xl font-bold text-gray-800 mb-6">About This Experience</h2>
					<p class="text-gray-600 leading-relaxed text-lg">{@html currentPackage.description}</p>
				</div>

				<div class="bg-white rounded-lg shadow-lg p-8">
					<h3 class="text-2xl font-bold text-gray-800 mb-6">What's Included</h3>
					<ul class="space-y-3">
						{#each currentPackage.includes as item}
							<li class="flex items-center">
								<svg class="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
								</svg>
								<span class="text-gray-700">{item}</span>
							</li>
						{/each}
					</ul>
				</div>
			</div>

			<div class="md:col-span-1">
				<div class="bg-white rounded-lg shadow-lg p-8 sticky top-8">
					<div class="text-center mb-6">
						<div class="text-4xl font-bold text-blue-600 mb-2">{currentPackage.price}</div>
						<div class="text-gray-600">per person</div>
					</div>

					<div class="space-y-4 mb-6">
						<div class="flex justify-between">
							<span class="text-gray-600">Duration:</span>
							<span class="font-semibold">{currentPackage.duration}</span>
						</div>
						<div class="flex justify-between">
							<span class="text-gray-600">Location:</span>
							<span class="font-semibold">{locationTitle}</span>
						</div>
					</div>

					<button on:click={bookNow} class="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-6 rounded-lg text-lg transition-colors duration-200">
						{t.book_now()}
					</button>

					<div class="mt-6 text-center">
						<a href="/packages" class="text-blue-600 hover:underline">← Back to Packages</a>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
{:else}
<div class="min-h-screen flex items-center justify-center">
	<div class="text-center">
		<h1 class="text-4xl font-bold text-gray-800 mb-4">Package Not Found</h1>
		<p class="text-gray-600 mb-8">The package you're looking for doesn't exist.</p>
		<a href="/packages" class="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg">
			Back to Packages
		</a>
	</div>
</div>
{/if}