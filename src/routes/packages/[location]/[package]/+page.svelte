<script lang="ts">
	import { page } from '$app/stores';
	import * as t from '$lib/paraglide/messages';
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';

	$: location = $page.params.location;
	$: packageName = $page.params.package;

	let currentImageIndex = 0;
	let imagesLoaded = new Set();

	function preloadImages(images: string[]) {
		images.forEach(src => {
			if (!imagesLoaded.has(src)) {
				const img = new Image();
				img.onload = () => imagesLoaded.add(src);
				img.src = src;
			}
		});
	}

	function nextImage() {
		if (currentPackage?.images) {
			currentImageIndex = (currentImageIndex + 1) % currentPackage.images.length;
		}
	}

	function prevImage() {
		if (currentPackage?.images) {
			currentImageIndex = currentImageIndex === 0 ? currentPackage.images.length - 1 : currentImageIndex - 1;
		}
	}

	const packageData: Record<string, Record<string, any>> = {
		'stone-town': {
			'stone-town-tour': { 
				name: 'Stone Town Tour', 
				duration: '6 hours', 
				price: 'From $40', 
				images: [
					"https://res.cloudinary.com/ddsgcceuj/image/upload/v1761169340/DSC_0988_tvcoed.jpg",
					"https://res.cloudinary.com/ddsgcceuj/image/upload/v1761291532/DSC_1116_hqnq8r.jpg",
					"https://res.cloudinary.com/ddsgcceuj/image/upload/v1761291532/DSC_1085_pbc5po.jpg",
					"https://res.cloudinary.com/ddsgcceuj/image/upload/v1761291530/DSC_1065_b8nqu5.jpg",
					"https://res.cloudinary.com/ddsgcceuj/image/upload/v1761291529/DSC_0993_uonvbj.jpg",
					"https://res.cloudinary.com/ddsgcceuj/image/upload/v1761291529/DSC_1009_xtomel.jpg",
				"https://res.cloudinary.com/ddsgcceuj/image/upload/v1761614280/pexels-meddybates-13675820_uwcaxp.jpg",
				"https://res.cloudinary.com/ddsgcceuj/image/upload/v1761614279/morgan-nott-rMQ31IQg4Io-unsplash_tgqoen.jpg"
			],
				video: "https://res.cloudinary.com/ddsgcceuj/video/upload/v1761169367/LCBP7021_mierxq.mov",
				description: 'Explore the historic Stone Town, a UNESCO World Heritage Site. Walk through narrow alleys, visit spice markets, see historical buildings, and learn about Zanzibar\'s rich cultural heritage. This tour offers group pricing - the more people in your group, the lower the price per person!', 
				includes: ['Professional local guide', 'Walking tour of Stone Town', 'Visit to spice markets', 'Historical sites tour', 'Cultural insights', 'Photo opportunities', 'Transport to/from hotel', 'Fees included', 'Refreshments provided'],
				groupPricing: {
					1: 140,
					2: 100,
					3: 70,
					4: 60,
					5: 50,
					'6+': 40
				}
			}
		},
		'nakupenda-sandbank': {
			'nakupenda-sandbank-trip': { 
				name: 'Nakupenda Sandbank Trip', 
				duration: '6 hours', 
				price: 'From $45', 
				images: [
					'https://res.cloudinary.com/ddsgcceuj/image/upload/v1761614240/pexels-dajana-reci-289671698-30125137_hdqobm.jpg',
					'https://res.cloudinary.com/ddsgcceuj/image/upload/v1761291990/FEGH6196_gjzkv0.webp',
					'https://res.cloudinary.com/ddsgcceuj/image/upload/v1761291986/DSC_1219_wme744.jpg',
					'https://res.cloudinary.com/ddsgcceuj/image/upload/v1761614238/pexels-keeganjchecks-29889187_bwmxbw.jpg',
					'https://res.cloudinary.com/ddsgcceuj/image/upload/v1761291988/DSC_1227_cv44cx.jpg'
				], 
				description: 'Experience the pristine beauty of Nakupenda Sandbank, a stunning white sand island surrounded by crystal clear turquoise waters. Enjoy swimming, snorkeling, and relaxing on this tropical paradise. This tour offers group pricing - the more people in your group, the lower the price per person!', 
				includes: ['Professional local guide', 'Boat transfer to sandbank', 'Snorkeling equipment', 'Fresh seafood lunch', 'Tropical fruits', 'Swimming time', 'Transport to/from hotel', 'Fees included', 'Refreshments provided'],
				groupPricing: {
					1: 170,
					2: 130,
					3: 90,
					4: 65,
					5: 50,
					'6+': 45
				}
			}
		},
		'jozani-forest': {
			'jozani-forest-tour': { 
				name: 'Jozani Forest Tour', 
				duration: '6 hours', 
				price: 'From $35', 
				images: [
					'https://res.cloudinary.com/ddsgcceuj/image/upload/v1761614388/jozani_1_tn3pob.jpg',
					'https://res.cloudinary.com/ddsgcceuj/image/upload/v1761614390/jozani_3_x6n4zj.jpg',
					'https://res.cloudinary.com/ddsgcceuj/image/upload/v1761614396/jozani_5_zfjw0b.jpg',
					'https://res.cloudinary.com/ddsgcceuj/image/upload/v1761614393/jozani_4_zekshx.jpg',
					'https://res.cloudinary.com/ddsgcceuj/image/upload/v1761614396/jozani_6_woiciq.jpg'
				], 
				description: 'Explore the enchanting Jozani Forest, home to the rare Red Colobus monkeys found only in Zanzibar. Walk through lush mangrove boardwalks, discover unique flora and fauna, and learn about conservation efforts. This nature adventure offers incredible wildlife photography opportunities and insights into Zanzibar\'s natural heritage. This tour offers group pricing - the more people in your group, the lower the price per person!', 
				includes: ['Jozani Forest guided tour', 'Red Colobus monkey viewing', 'Mangrove boardwalk experience', 'Nature photography opportunities', 'Conservation education', 'Professional naturalist guide', 'Transport to/from hotel', 'Fees included', 'Refreshments provided'],
				groupPricing: {
					1: 130,
					2: 90,
					3: 60,
					4: 50,
					5: 40,
					'6+': 35
				}
			}
		},
		'safari-blue': {
			'safari-blue-tour': { 
				name: 'Safari Blue Tour', 
				duration: 'Full day', 
				price: 'From $50', 
				images: [
					'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=400&fit=crop',
					'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&h=400&fit=crop',
					'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&h=400&fit=crop',
					'https://images.unsplash.com/photo-1437622368342-7a3d73a34c8f?w=800&h=400&fit=crop',
					'https://images.unsplash.com/photo-1564760055775-d63b17a55c44?w=800&h=400&fit=crop'
				], 
				description: 'Embark on the famous Safari Blue adventure, sailing on traditional dhow boats to explore pristine islands, swim in crystal clear lagoons, and enjoy fresh seafood. This full-day excursion includes snorkeling, swimming, and relaxing on beautiful beaches. This tour offers group pricing - the more people in your group, the lower the price per person!', 
				includes: ['Traditional dhow boat cruise', 'Multiple snorkeling stops', 'Fresh seafood BBQ lunch', 'Tropical fruits and drinks', 'Swimming in lagoons', 'Professional crew', 'Transport to/from hotel', 'Fees included', 'Refreshments provided'],
				groupPricing: {
					1: 200,
					2: 140,
					3: 110,
					4: 75,
					5: 55,
					'6+': 50
				}
			}
		},
		'spice-tour': {
			'spice-tour': { 
				name: 'Spice Tour', 
				duration: '6 hours', 
				price: 'From $35', 
				images: [
					'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=400&fit=crop',
					'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=800&h=400&fit=crop',
					'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=400&fit=crop',
					'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=400&fit=crop',
					'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&h=400&fit=crop'
				], 
				description: 'Discover the aromatic world of Zanzibar\'s famous spices on this immersive farm tour. Walk through spice plantations, learn about cultivation methods, taste fresh spices and tropical fruits, and enjoy a traditional Swahili lunch. This educational and sensory experience showcases why Zanzibar is known as the Spice Island. This tour offers group pricing - the more people in your group, the lower the price per person!', 
				includes: ['Spice plantation guided tour', 'Spice tasting and samples', 'Traditional Swahili lunch', 'Tropical fruit tasting', 'Local guide expertise', 'Cooking demonstrations', 'Transport to/from hotel', 'Fees included', 'Refreshments provided'],
				groupPricing: {
					1: 120,
					2: 90,
					3: 65,
					4: 50,
					5: 40,
					'6+': 35
				}
			}
		},
		'prison-island': {
			'prison-island-tour': { 
				name: 'Prison Island Tour', 
				duration: '6 hours', 
				price: 'From $45', 
				images: [
					"https://res.cloudinary.com/ddsgcceuj/image/upload/v1761169109/DSC_1144_x7nqfp.jpg",
					'https://res.cloudinary.com/ddsgcceuj/image/upload/v1761291603/DSC_1187_yjdmcf.jpg',
					'https://res.cloudinary.com/ddsgcceuj/image/upload/v1761291602/DSC_1176_fvcpji.jpg',
					'https://res.cloudinary.com/ddsgcceuj/image/upload/v1761291593/DSC_1140_p2imzc.jpg',
					'https://res.cloudinary.com/ddsgcceuj/image/upload/v1761291592/DSC_1100_mxmvwt.jpg',
					'https://res.cloudinary.com/ddsgcceuj/image/upload/v1761169110/DSC_1153_rsw9jf.jpg'
				], 
				description: 'Visit the historic Prison Island (Changuu Island) and meet the famous giant tortoises. Explore the old prison ruins, learn about the island\'s fascinating history, enjoy snorkeling in crystal clear waters, and relax on pristine beaches. This half-day adventure combines history, wildlife, and marine activities. This tour offers group pricing - the more people in your group, the lower the price per person!', 
				includes: ['Boat transfer to Prison Island', 'Giant tortoise encounter', 'Historical site tour', 'Snorkeling equipment', 'Beach time and swimming', 'Professional guide', 'Transport to/from hotel', 'Fees included', 'Refreshments provided'],
				groupPricing: {
					1: 150,
					2: 110,
					3: 70,
					4: 60,
					5: 55,
					'6+': 45
				}
			}
		},
		'mnemba-snorkeling': {
			'mnemba-snorkel-trip': { 
				name: 'Mnemba Snorkel Trip', 
				duration: '6 hours', 
				price: 'From $55', 
				images: [
					'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&h=400&fit=crop',
					'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&h=400&fit=crop',
					'https://images.unsplash.com/photo-1437622368342-7a3d73a34c8f?w=800&h=400&fit=crop',
					'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=400&fit=crop',
					'https://images.unsplash.com/photo-1564760055775-d63b17a55c44?w=800&h=400&fit=crop'
				], 
				description: 'Discover the underwater paradise of Mnemba Atoll, one of the world\'s premier snorkeling destinations. Swim alongside tropical fish, explore vibrant coral reefs, and enjoy the crystal clear waters surrounding this protected marine area. This half-day adventure offers some of the best snorkeling in the Indian Ocean with excellent visibility and diverse marine life. This tour offers group pricing - the more people in your group, the lower the price per person!', 
				includes: ['Boat transfer to Mnemba Atoll', 'Professional snorkeling guide', 'High-quality snorkeling equipment', 'Multiple snorkel sites', 'Marine life spotting', 'Safety briefing and assistance', 'Transport to/from hotel', 'Fees included', 'Refreshments provided'],
				groupPricing: {
					1: 180,
					2: 140,
					3: 90,
					4: 70,
					5: 60,
					'6+': 55
				}
			}
		},
		'culture-tour': {
			'culture-tour': { 
				name: 'Culture Tour', 
				duration: '6 hours', 
				price: 'From $35', 
				images: [
					'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=400&fit=crop',
					'https://images.unsplash.com/photo-1609198092458-38a293c7ac4b?w=800&h=400&fit=crop',
					'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=400&fit=crop',
					'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=400&fit=crop',
					'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&h=400&fit=crop'
				], 
				description: 'Immerse yourself in the rich cultural heritage of Zanzibar with this authentic village experience. Visit local communities, learn traditional crafts, participate in cultural activities, and enjoy authentic Swahili cuisine. This tour provides deep insights into local customs, traditions, and daily life while supporting community tourism initiatives. This tour offers group pricing - the more people in your group, the lower the price per person!', 
				includes: ['Village community visit', 'Traditional craft demonstrations', 'Cultural activities participation', 'Authentic Swahili lunch', 'Local guide and translator', 'Traditional music and dance', 'Transport to/from hotel', 'Fees included', 'Refreshments provided'],
				groupPricing: {
					1: 150,
					2: 110,
					3: 70,
					4: 50,
					5: 45,
					'6+': 35
				}
			}
		},
		'sunset-cruise': {
			'sunset-cruise': { 
				name: 'Sunset Cruise', 
				duration: '6 hours', 
				price: 'From $30', 
				images: [
					'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=400&fit=crop',
					'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&h=400&fit=crop',
					'https://images.unsplash.com/photo-1437622368342-7a3d73a34c8f?w=800&h=400&fit=crop',
					'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&h=400&fit=crop',
					'https://images.unsplash.com/photo-1564760055775-d63b17a55c44?w=800&h=400&fit=crop'
				], 
				description: 'Experience the magic of a Zanzibar sunset aboard a traditional dhow boat. Sail along the pristine coastline as the sun sets over the Indian Ocean, creating breathtaking colors across the sky. Enjoy refreshments, traditional music, and the gentle ocean breeze while witnessing one of nature\'s most spectacular displays. This romantic and peaceful experience is perfect for couples, families, and anyone seeking tranquility. This tour offers group pricing - the more people in your group, the lower the price per person!', 
				includes: ['Traditional dhow boat cruise', 'Sunset viewing experience', 'Light refreshments and drinks', 'Traditional Swahili music', 'Professional crew and guide', 'Safety equipment provided', 'Transport to/from hotel', 'Fees included', 'Photo opportunities'],
				groupPricing: {
					1: 110,
					2: 90,
					3: 60,
					4: 50,
					5: 40,
					'6+': 30
				}
			}
		},
		'blue-lagoon': {
			'blue-lagoon': { 
				name: 'Blue Lagoon Tour', 
				duration: '6 hours', 
				price: 'From $35', 
				images: [
					'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&h=400&fit=crop',
					'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&h=400&fit=crop',
					'https://images.unsplash.com/photo-1437622368342-7a3d73a34c8f?w=800&h=400&fit=crop',
					'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=400&fit=crop',
					'https://images.unsplash.com/photo-1564760055775-d63b17a55c44?w=800&h=400&fit=crop'
				], 
				description: 'Discover the stunning Blue Lagoon, a hidden gem with crystal clear turquoise waters perfect for swimming and relaxation. This natural paradise offers pristine beaches, vibrant marine life, and breathtaking scenery. Enjoy snorkeling in the clear waters, sunbathing on white sand beaches, and exploring the unique ecosystem of this protected area. The tour includes boat transfers, swimming time, and opportunities for underwater photography. This tour offers group pricing - the more people in your group, the lower the price per person!', 
				includes: ['Boat transfer to Blue Lagoon', 'Swimming and relaxation time', 'Snorkeling equipment provided', 'Beach access and facilities', 'Professional guide and crew', 'Safety equipment and briefing', 'Transport to/from hotel', 'Fees included', 'Photo opportunities'],
				groupPricing: {
					1: 110,
					2: 110,
					3: 65,
					4: 40,
					5: 40,
					'6+': 35
				}
			}
		},
		'dolphin': {
			'dolphin-tour': { 
				name: 'Dolphin Tour', 
				duration: '6 hours', 
				price: 'From $40', 
				images: [
					"https://res.cloudinary.com/ddsgcceuj/image/upload/v1761169503/DIYP0607_kdxuvk.webp",
					'https://res.cloudinary.com/ddsgcceuj/image/upload/v1761169557/OKHK5314_qcha2v.jpg',
					// 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&h=400&fit=crop',
					// 'https://images.unsplash.com/photo-1437622368342-7a3d73a34c8f?w=800&h=400&fit=crop',
					// 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=400&fit=crop'
				], 
				video: "https://res.cloudinary.com/ddsgcceuj/video/upload/v1761169513/FXON8989_-_Copy_vontcs.mp4",
				description: 'Experience the thrill of encountering wild dolphins in their natural habitat at Kizimkazi. This unforgettable marine adventure takes you to the southern coast of Zanzibar where bottlenose and spinner dolphins are frequently spotted. Enjoy boat rides through pristine waters, witness playful dolphins jumping and swimming alongside the boat, and learn about marine conservation efforts. The tour includes opportunities for swimming and snorkeling in crystal clear waters. This tour offers group pricing - the more people in your group, the lower the price per person!', 
				includes: ['Boat transfer to dolphin spotting areas', 'Professional marine guide', 'Dolphin watching experience', 'Swimming and snorkeling opportunities', 'Marine life education', 'Safety equipment provided', 'Transport to/from hotel', 'Fees included', 'Photo opportunities'],
				groupPricing: {
					1: 160,
					2: 160,
					3: 80,
					4: 65,
					5: 60,
					'6+': 40
				}
			}
		},
		'buggy-quad-bike': {
			'buggy-quad-bike-adventure': { 
				name: 'Buggy/Quad Bike Adventure', 
				duration: '6 hours', 
				price: '$190', 
				images: [
					'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=400&fit=crop',
					'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=400&fit=crop',
					'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=400&fit=crop',
					'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=400&fit=crop',
					'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&h=400&fit=crop'
				], 
				description: 'Embark on an adrenaline-pumping quad bike adventure through Zanzibar\'s diverse landscapes. Navigate through rural villages, spice plantations, and scenic coastal paths while experiencing the island from a unique perspective. This off-road adventure combines excitement with cultural exploration as you interact with local communities and discover hidden gems. Professional guides ensure safety while sharing insights about local culture and history. Fixed price of $190 per person regardless of group size.', 
				includes: ['Quad bike rental and equipment', 'Professional guide and instructor', 'Safety gear and helmets', 'Village and plantation visits', 'Cultural interactions', 'Photo stops at scenic locations', 'Transport to/from hotel', 'Fees included', 'Refreshments provided'],
				groupPricing: {
					1: 190,
					2: 190,
					3: 190,
					4: 190,
					5: 190,
					'6+': 190
				}
			}
		},
		'salaam-cave': {
			'salaam-cave-tour': { 
				name: 'Salaam Cave Tour', 
				duration: '6 hours', 
				price: 'From $30', 
				images: [
					"https://res.cloudinary.com/ddsgcceuj/image/upload/v1761168723/_ADM3854_ys3num.jpg",
					'https://res.cloudinary.com/ddsgcceuj/image/upload/v1761291659/_ADM3913_kt5zih.jpg',
					'https://res.cloudinary.com/ddsgcceuj/image/upload/v1761291658/_ADM3858_ki4jju.jpg',
					'https://res.cloudinary.com/ddsgcceuj/image/upload/v1761168726/_ADM3897_m2wvqd.jpg',
					'https://res.cloudinary.com/ddsgcceuj/image/upload/v1761168725/QHIX6417_zahyjd.webp',
					'https://res.cloudinary.com/ddsgcceuj/image/upload/v1761168723/_ADM3859_epzdpf.jpg',
					'https://res.cloudinary.com/ddsgcceuj/image/upload/v1761168723/_ADM3849_fmtzmx.jpg'
				], 
				video: "https://res.cloudinary.com/ddsgcceuj/video/upload/v1761168757/_ADME3848_gjwh8w.mov",
				description: 'Explore the mysterious Salaam Cave, a hidden underground wonder in Zanzibar. This adventurous tour takes you through ancient limestone formations, underground chambers, and natural rock formations that have been carved by nature over thousands of years. Discover the geological history of the island while experiencing the thrill of cave exploration. Professional guides provide safety equipment and share fascinating insights about the cave\'s formation and local legends. This tour offers group pricing - the more people in your group, the lower the price per person!', 
				includes: ['Professional cave guide', 'Safety equipment and helmets', 'Cave exploration experience', 'Geological education', 'Photography opportunities', 'Local legends and stories', 'Transport to/from hotel', 'Fees included', 'Refreshments provided'],
				groupPricing: {
					1: 120,
					2: 90,
					3: 60,
					4: 40,
					5: 40,
					'6+': 30
				}
			}
		},
		'the-rock-restaurant': {
			'the-rock-restaurant': { 
				name: 'The Rock Restaurant', 
				duration: '6 hours', 
				price: 'From $30', 
				images: [
					'https://res.cloudinary.com/ddsgcceuj/image/upload/v1761614435/rock_restaurant_bgbc1f.jpg',
					
				], 
				description: 'Experience the iconic Rock Restaurant, one of Zanzibar\'s most famous dining destinations. Perched on a rock in the Indian Ocean, this unique restaurant offers spectacular ocean views and fresh seafood cuisine. Accessible only during low tide by foot or by boat during high tide, dining here is truly a once-in-a-lifetime experience. Enjoy gourmet meals while surrounded by crystal clear waters and stunning coastal scenery. This tour offers group pricing - the more people in your group, the lower the price per person!', 
				includes: ['Transport to The Rock Restaurant', 'Boat transfer if needed (high tide)', 'Reserved dining table', 'Ocean view dining experience', 'Fresh seafood specialties', 'Professional service', 'Photography opportunities', 'Return transport', 'Service charges included'],
				groupPricing: {
					1: 110,
					2: 60,
					3: 40,
					4: 40,
					5: 40,
					'6+': 30
				}
			}
		},
		'stone-town-tour-spice-tour': {
			'stone-town-tour-spice-tour': { 
				name: 'Stone town tour & spice tour', 
				duration: '8 hours', 
				price: 'From $50', 
				images: [
					'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&h=400&fit=crop',
					'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=400&fit=crop',
					'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=800&h=400&fit=crop',
					'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=400&fit=crop',
					'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=400&fit=crop'
				], 
				description: 'Combine two of Zanzibar\'s most popular experiences in one comprehensive full-day tour. Start with exploring the historic Stone Town, a UNESCO World Heritage Site, walking through narrow alleys, visiting spice markets, and learning about the island\'s rich cultural heritage. Then continue to a spice plantation where you\'ll discover the aromatic world of Zanzibar\'s famous spices, taste fresh spices and tropical fruits, and enjoy a traditional Swahili lunch. This combined tour offers the best of both cultural and agricultural experiences. This tour offers group pricing - the more people in your group, the lower the price per person!', 
				includes: ['Professional local guide', 'Stone Town walking tour', 'Spice plantation visit', 'Spice tasting and samples', 'Traditional Swahili lunch', 'Historical sites tour', 'Cultural insights', 'Transport between locations', 'Transport to/from hotel', 'Fees included', 'Refreshments provided'],
				groupPricing: {
					1: 230,
					2: 120,
					3: 80,
					4: 70,
					5: 55,
					'6+': 50
				}
			}
		},
		'stone-town-prison-island': {
			'stone-town-prison-island-tour': { 
				name: 'Stone Town & Prison Island Tour', 
				duration: '8 hours', 
				price: 'From $60', 
				images: [
					'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&h=400&fit=crop',
					'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=400&fit=crop',
					'https://images.unsplash.com/photo-1437622368342-7a3d73a34c8f?w=800&h=400&fit=crop',
					'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=400&fit=crop',
					'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=400&fit=crop'
				], 
				description: 'Experience the perfect combination of Zanzibar\'s rich history and natural wonders in this comprehensive full-day tour. Begin with exploring the UNESCO World Heritage Site of Stone Town, walking through narrow alleys, visiting historical buildings, and learning about the island\'s fascinating cultural heritage. Then take a boat trip to the famous Prison Island (Changuu Island) where you\'ll meet giant tortoises, explore historical prison ruins, enjoy snorkeling in crystal clear waters, and relax on pristine beaches. This tour offers group pricing - the more people in your group, the lower the price per person!', 
				includes: ['Professional local guide', 'Stone Town walking tour', 'Boat transfer to Prison Island', 'Giant tortoise encounter', 'Historical prison ruins tour', 'Snorkeling equipment', 'Beach time and swimming', 'Traditional lunch', 'Transport between locations', 'Transport to/from hotel', 'All fees included'],
				groupPricing: {
					1: 220,
					2: 130,
					3: 90,
					4: 80,
					5: 70,
					'6+': 60
				}
			}
		},
		'prison-island-nakupenda': {
			'prison-island-nakupenda-tour': { 
				name: 'Prison Island & Nakupenda Tour', 
				duration: '8 hours', 
				price: 'From $50', 
				images: [
					'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&h=400&fit=crop',
					'https://images.unsplash.com/photo-1437622368342-7a3d73a34c8f?w=800&h=400&fit=crop',
					'https://res.cloudinary.com/ddsgcceuj/image/upload/v1761291980/DSC_1113_zsoo1k.jpg',
					'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&h=400&fit=crop',
					'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=400&fit=crop'
				], 
				description: 'Combine two of Zanzibar\'s most spectacular marine destinations in this unforgettable full-day adventure. Start with a visit to Prison Island (Changuu Island) where you\'ll meet the famous giant tortoises, explore historical prison ruins, and learn about the island\'s fascinating past. Then continue to the pristine Nakupenda Sandbank, a stunning white sand island surrounded by crystal clear turquoise waters. Enjoy swimming, snorkeling, fresh seafood lunch, and relaxing on this tropical paradise. This tour offers group pricing - the more people in your group, the lower the price per person!', 
				includes: ['Professional local guide', 'Boat transfers to both islands', 'Giant tortoise encounter', 'Historical prison ruins tour', 'Nakupenda Sandbank visit', 'Snorkeling equipment', 'Fresh seafood lunch', 'Beach time and swimming', 'Tropical fruits', 'Transport to/from hotel', 'All fees included'],
				groupPricing: {
					1: 240,
					2: 140,
					3: 120,
					4: 80,
					5: 65,
					'6+': 50
				}
			}
		},
		'stone-town-spice-prison': {
			'stone-town-spice-prison-tour': { 
				name: 'Stone Town & Spice & Prison Tour', 
				duration: '10 hours', 
				price: 'From $120', 
				images: [
					'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&h=400&fit=crop',
					'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=400&fit=crop',
					'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=800&h=400&fit=crop',
					'https://images.unsplash.com/photo-1437622368342-7a3d73a34c8f?w=800&h=400&fit=crop',
					'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=400&fit=crop'
				], 
				description: 'Experience the ultimate Zanzibar adventure combining three of the island\'s most iconic attractions in one comprehensive full-day tour. Begin with exploring the UNESCO World Heritage Site of Stone Town, walking through narrow alleys and learning about rich cultural heritage. Continue to a spice plantation to discover aromatic spices and enjoy traditional lunch. Conclude with a boat trip to Prison Island to meet giant tortoises and explore historical ruins. This extensive tour offers the best value for experiencing Zanzibar\'s history, culture, and nature. This tour offers group pricing - the more people in your group, the lower the price per person!', 
				includes: ['Professional local guide', 'Stone Town walking tour', 'Spice plantation visit', 'Spice tasting and samples', 'Traditional Swahili lunch', 'Boat transfer to Prison Island', 'Giant tortoise encounter', 'Historical prison ruins tour', 'Snorkeling equipment', 'Transport between all locations', 'Transport to/from hotel', 'All fees included'],
				groupPricing: {
					1: 370,
					2: 310,
					3: 270,
					4: 230,
					5: 160,
					'6+': 120
				}
			}
		},
		'jozani-spice': {
			'jozani-spice-tour': { 
				name: 'Jozani & Spice Tour', 
				duration: '8 hours', 
				price: 'From $40', 
				images: [
					'https://images.unsplash.com/photo-1564760055775-d63b17a55c44?w=800&h=400&fit=crop',
					'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800&h=400&fit=crop',
					'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=800&h=400&fit=crop',
					'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=400&fit=crop',
					'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=400&fit=crop'
				], 
				description: 'Combine two of Zanzibar\'s most fascinating natural and cultural experiences in this full-day adventure. Start with exploring the enchanting Jozani Forest, home to the rare Red Colobus monkeys found only in Zanzibar. Walk through lush mangrove boardwalks, discover unique flora and fauna, and learn about conservation efforts. Then continue to a spice plantation to discover the aromatic world of Zanzibar\'s famous spices, taste fresh spices and tropical fruits, and enjoy a traditional Swahili lunch. This tour offers group pricing - the more people in your group, the lower the price per person!', 
				includes: ['Professional local guide', 'Jozani Forest guided tour', 'Red Colobus monkey viewing', 'Mangrove boardwalk experience', 'Spice plantation visit', 'Spice tasting and samples', 'Traditional Swahili lunch', 'Nature photography opportunities', 'Conservation education', 'Transport between locations', 'Transport to/from hotel', 'All fees included'],
				groupPricing: {
					1: 210,
					2: 120,
					3: 90,
					4: 70,
					5: 55,
					'6+': 40
				}
			}
		},
		'jozani-the-rock': {
			'jozani-the-rock-tour': { 
				name: 'Jozani & The Rock Tour', 
				duration: '8 hours', 
				price: 'From $55', 
				images: [
					'https://images.unsplash.com/photo-1564760055775-d63b17a55c44?w=800&h=400&fit=crop',
					'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800&h=400&fit=crop',
					'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=400&fit=crop',
					'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&h=400&fit=crop',
					'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=400&fit=crop'
				], 
				description: 'Experience the perfect blend of Zanzibar\'s natural wonders and iconic dining in this unique full-day adventure. Begin with exploring the enchanting Jozani Forest, home to the rare Red Colobus monkeys found only in Zanzibar. Walk through lush mangrove boardwalks, discover unique flora and fauna, and learn about conservation efforts. Then visit the world-famous Rock Restaurant, perched on a rock in the Indian Ocean, for a spectacular dining experience with breathtaking ocean views and fresh seafood cuisine. This tour offers group pricing - the more people in your group, the lower the price per person!', 
				includes: ['Professional local guide', 'Jozani Forest guided tour', 'Red Colobus monkey viewing', 'Mangrove boardwalk experience', 'Transport to The Rock Restaurant', 'Reserved dining table', 'Ocean view dining experience', 'Fresh seafood specialties', 'Nature photography opportunities', 'Conservation education', 'Transport between locations', 'Transport to/from hotel', 'All fees included'],
				groupPricing: {
					1: 240,
					2: 170,
					3: 170,
					4: 160,
					5: 120,
					'6+': 55
				}
			}
		},
		'the-rock-salaam-cave': {
			'the-rock-salaam-cave-tour': { 
				name: 'The Rock & Salaam Cave Tour', 
				duration: '8 hours', 
				price: 'From $40', 
				images: [
					'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=400&fit=crop',
					'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&h=400&fit=crop',
					"https://res.cloudinary.com/ddsgcceuj/image/upload/v1761168723/_ADM3854_ys3num.jpg",
					'https://images.unsplash.com/photo-1564760055775-d63b17a55c44?w=800&h=400&fit=crop',
					'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=400&fit=crop'
				], 
				description: 'Discover the perfect combination of Zanzibar\'s iconic dining and mysterious underground wonders in this unique full-day adventure. Start with visiting the world-famous Rock Restaurant, perched on a rock in the Indian Ocean, for a spectacular dining experience with breathtaking ocean views and fresh seafood cuisine. Then explore the mysterious Salaam Cave, a hidden underground wonder with ancient limestone formations and natural rock formations carved by nature over thousands of years. This tour offers group pricing - the more people in your group, the lower the price per person!', 
				includes: ['Professional local guide', 'Transport to The Rock Restaurant', 'Reserved dining table', 'Ocean view dining experience', 'Fresh seafood specialties', 'Professional cave guide', 'Safety equipment and helmets', 'Cave exploration experience', 'Geological education', 'Photography opportunities', 'Transport between locations', 'Transport to/from hotel', 'All fees included'],
				groupPricing: {
					1: 240,
					2: 140,
					3: 90,
					4: 80,
					5: 60,
					'6+': 40
				}
			}
		}
	};

	$: currentPackage = location && packageName ? packageData[location]?.[packageName] : null;
	$: locationTitle = location?.split('-').map((word: string) => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');

	$: if (currentPackage?.images) {
		preloadImages(currentPackage.images);
	}

	let showVideo = false;
	let videoLoading = false;
	let videoElement: HTMLVideoElement;

	function toggleMedia() {
		if (!showVideo) {
			videoLoading = true;
		}
		showVideo = !showVideo;
	}

	function handleVideoLoad() {
		videoLoading = false;
		if (videoElement) {
			videoElement.play();
		}
	}

	function bookNow() {
		const locationParam = location?.replace(/\s+/g, '-').toLowerCase();
		const packageParam = packageName?.replace(/\s+/g, '-').toLowerCase();
		const price = currentPackage?.price?.replace('$', '') || '100';
		goto(`/booking?location=${locationParam}&package=${packageParam}&price=${price}`);
	}
</script>

{#if currentPackage}
<div class="min-h-screen bg-gray-50">
	<!-- Back Button -->
	<div class="container absolute z-10 mx-auto px-4 pt-8 w-auto">
		<button onclick={() => history.back()} class="flex items-center text-white hover:text-bold mb-4">
			<svg class="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
			</svg>
			Back
		</button>
	</div>

	<div class="relative h-96 md:h-[440px] overflow-hidden">
		<!-- Background Image -->
		<div class="absolute inset-0 w-full h-full bg-cover bg-center transition-all duration-500 ease-in-out bg-gray-200" 
			 class:opacity-0={showVideo && !videoLoading}
			 style="background-image: url('{currentPackage.images[currentImageIndex]}')"></div>
		
		<!-- Image Navigation Buttons -->
		{#if currentPackage.images && currentPackage.images.length > 1 && (!showVideo || videoLoading)}
			<button onclick={prevImage} class="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70 transition-all z-20" aria-label="Previous image">
				<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
				</svg>
			</button>
			<button onclick={nextImage} class="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70 transition-all z-20" aria-label="Next image">
				<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
				</svg>
			</button>
			
			<!-- Image Indicators -->
			<div class="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
				{#each currentPackage.images as _, index}
					<button onclick={() => currentImageIndex = index} class="w-3 h-3 rounded-full transition-all {currentImageIndex === index ? 'bg-white' : 'bg-white/50'}" aria-label="Go to image {index + 1}"></button>
				{/each}
			</div>
		{/if}
		
		<!-- Video -->
		{#if showVideo && currentPackage.video}
			<video bind:this={videoElement} class="absolute inset-0 w-full h-full object-cover bg-no-repeat transition-opacity duration-500" 
				 class:opacity-0={videoLoading}
				 autoplay muted loop onloadeddata={handleVideoLoad} oncanplay={handleVideoLoad}>
				<source src={currentPackage.video} type="video/mp4">
			</video>
		{/if}
		
		<!-- Loading Indicator -->
		{#if videoLoading}
			<div class="absolute inset-0  bg-opacity-50 flex items-center justify-center z-10">
				<div class="text-white text-center">
					<svg class="animate-spin w-8 h-8 mx-auto mb-2" fill="none" viewBox="0 0 24 24">
						<circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
						<path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
					</svg>
					<p class="text-sm">Loading video...</p>
				</div>
			</div>
		{/if}
		
		<div class="absolute inset-0  bg-opacity-50 flex items-center justify-center">
			<div class="text-center text-white">
				<h1 class="text-4xl md:text-6xl font-bold mb-4">{currentPackage.name}</h1>
				<p class="text-xl">{locationTitle}</p>
			</div>
		</div>
		
		{#if currentPackage.video}
			<button 
				onclick={toggleMedia}
				class="absolute top-4 right-4 bg-black bg-opacity-50 text-white p-3 rounded-full hover:bg-opacity-70 transition-all z-20"
				aria-label={showVideo ? 'Pause video' : 'Play video'}
			>
				{#if showVideo}
					<svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
						<path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z"/>
					</svg>
				{:else}
					<svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
						<path d="M8 5v14l11-7z"/>
					</svg>
				{/if}
			</button>
		{/if}
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

					{#if currentPackage.groupPricing}
						<div class="mb-6 p-4 bg-blue-50 rounded-lg">
							<h4 class="font-semibold text-gray-800 mb-3 text-center">Group Pricing (per person)</h4>
							<div class="grid grid-cols-2 gap-2 text-sm">
								<div class="flex justify-between"><span>1 person:</span><span class="font-semibold">${currentPackage.groupPricing[1]}</span></div>
								<div class="flex justify-between"><span>2 people:</span><span class="font-semibold">${currentPackage.groupPricing[2]}</span></div>
								<div class="flex justify-between"><span>3 people:</span><span class="font-semibold">${currentPackage.groupPricing[3]}</span></div>
								<div class="flex justify-between"><span>4 people:</span><span class="font-semibold">${currentPackage.groupPricing[4]}</span></div>
								<div class="flex justify-between"><span>5 people:</span><span class="font-semibold">${currentPackage.groupPricing[5]}</span></div>
								<div class="flex justify-between"><span>6+ people:</span><span class="font-semibold">${currentPackage.groupPricing['6+']}</span></div>
							</div>
							<p class="text-xs text-gray-600 mt-2 text-center">Larger groups get better rates!</p>
						</div>
					{/if}

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

					<button onclick={bookNow} class="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-6 rounded-lg text-lg transition-colors duration-200">
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