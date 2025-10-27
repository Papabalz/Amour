<script lang="ts">
	import { onMount } from 'svelte';
	export let data;

	let isAuthenticated = false;
	let username = '';
	let password = '';
	let loginError = '';
	let selectedBooking: any = null;
	let selectedUser: any = null;
	let showBookingModal = false;
	let showUserModal = false;

	function openBookingModal(booking: any) {
		selectedBooking = booking;
		showBookingModal = true;
	}

	function openUserModal(user: any) {
		selectedUser = user;
		showUserModal = true;
	}

	function closeModals() {
		showBookingModal = false;
		showUserModal = false;
		selectedBooking = null;
		selectedUser = null;
	}

	const ADMIN_USERNAME = 'admin';
	const ADMIN_PASSWORD = 'amour2024';

	function login() {
		if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
			isAuthenticated = true;
			localStorage.setItem('adminAuth', 'true');
		} else {
			loginError = 'Invalid credentials';
		}
	}

	function logout() {
		isAuthenticated = false;
		localStorage.removeItem('adminAuth');
		username = '';
		password = '';
	}

	onMount(() => {
		if (localStorage.getItem('adminAuth') === 'true') {
			isAuthenticated = true;
		}
	});
</script>

<div class="min-h-screen bg-gray-100">
	{#if !isAuthenticated}
		<!-- Login Form -->
		<div class="flex items-center justify-center min-h-screen">
			<div class="bg-white p-8 rounded-lg shadow-lg w-96">
				<h1 class="text-2xl font-bold text-center mb-6">Admin Login</h1>
				
				<form onsubmit={(e) => { e.preventDefault(); login(); }}>
					<div class="mb-4">
						<label for="username" class="block text-gray-700 text-sm font-bold mb-2">Username</label>
						<input id="username" bind:value={username} type="text" class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500" required>
					</div>
					
					<div class="mb-6">
						<label for="password" class="block text-gray-700 text-sm font-bold mb-2">Password</label>
						<input id="password" bind:value={password} type="password" class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500" required>
					</div>
					
					{#if loginError}
						<p class="text-red-500 text-sm mb-4">{loginError}</p>
					{/if}
					
					<button type="submit" class="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700">Login</button>
				</form>
			</div>
		</div>
	{:else}
		<!-- Admin Dashboard -->
		<div class="container mx-auto px-4 py-8">
			<div class="flex justify-between items-center mb-8">
				<h1 class="text-3xl font-bold">Admin Dashboard</h1>
				<button onclick={logout} class="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700">Logout</button>
			</div>

			<!-- Stats Cards -->
			<div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
				<div class="bg-white p-6 rounded-lg shadow">
					<h3 class="text-lg font-semibold text-gray-700">Total Bookings</h3>
					<p class="text-3xl font-bold text-blue-600">{data.bookings.length}</p>
				</div>
				<div class="bg-white p-6 rounded-lg shadow">
					<h3 class="text-lg font-semibold text-gray-700">Total Users</h3>
					<p class="text-3xl font-bold text-green-600">{data.users.length}</p>
				</div>
				<div class="bg-white p-6 rounded-lg shadow">
					<h3 class="text-lg font-semibold text-gray-700">Revenue</h3>
					<p class="text-3xl font-bold text-purple-600">$0</p>
				</div>
			</div>


				<!-- Bookings Table -->
				<div class="bg-white rounded-lg shadow mb-8">
					<div class="px-6 py-4 border-b">
						<h2 class="text-xl font-semibold">Recent Bookings</h2>
					</div>
					<div class="overflow-x-auto">
						<table class="w-full">
							<thead class="bg-gray-50">
								<tr>
									<th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
									<th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
									<th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Location</th>
									<th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
									<th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Adults</th>
								</tr>
							</thead>
							<tbody class="divide-y divide-gray-200">
								{#each data.bookings.slice(0, 10) as booking}
									<tr class="hover:bg-gray-50 cursor-pointer" onclick={() => openBookingModal(booking)}>
										<td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{booking.name}</td>
										<td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{booking.email}</td>
										<td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{booking.location}</td>
										<td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{booking.travelDate}</td>
										<td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{booking.adults}</td>
									</tr>
								{/each}
							</tbody>
						</table>
					</div>
				</div>

				<!-- Users Table -->
				<div class="bg-white rounded-lg shadow">
					<div class="px-6 py-4 border-b">
						<h2 class="text-xl font-semibold">Recent Users</h2>
					</div>
					<div class="overflow-x-auto">
						<table class="w-full">
							<thead class="bg-gray-50">
								<tr>
									<th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
									<th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
									<th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Phone</th>
									<th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Country</th>
								</tr>
							</thead>
							<tbody class="divide-y divide-gray-200">
								{#each data.users.slice(0, 10) as user}
									<tr class="hover:bg-gray-50 cursor-pointer" onclick={() => openUserModal(user)}>
										<td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{user.name}</td>
										<td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.email}</td>
										<td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.phone_number}</td>
										<td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.nationality}</td>
									</tr>
								{/each}
							</tbody>
						</table>
					</div>
				</div>
		</div>
	{/if}

	<!-- Booking Modal -->
	{#if showBookingModal && selectedBooking}
		<div class="fixed inset-0 bg-opacity-50 flex items-center justify-center z-50" role="dialog" tabindex="-1" onclick={closeModals} onkeydown={(e) => e.key === 'Escape' && closeModals()}>
			<div class="glass rounded-lg p-6 max-w-2xl w-full mx-4" role="document" onclick={(e) => e.stopPropagation()} onkeydown={(e) => e.stopPropagation()}>
				<div class="flex justify-between items-center mb-4">
					<h2 class="text-2xl font-bold">Booking Details</h2>
					<button onclick={closeModals} class="text-gray-500 hover:text-gray-700" aria-label="Close modal">
						<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
						</svg>
					</button>
				</div>
				<div class="grid grid-cols-2 gap-4">
					<div><strong>Name:</strong> {selectedBooking.name}</div>
					<div><strong>Email:</strong> {selectedBooking.email}</div>
					<div><strong>Location:</strong> {selectedBooking.location}</div>
					<div><strong>Travel Date:</strong> {selectedBooking.travelDate}</div>
					<div><strong>Adults:</strong> {selectedBooking.adults}</div>
					<div><strong>Country:</strong> {selectedBooking.country}</div>
					<div><strong>Phone:</strong> {selectedBooking.phone}</div>
					<div><strong>Days:</strong> {selectedBooking.numberOfDays}</div>
					<div><strong>Pickup:</strong> {selectedBooking.pickup_location}</div>
					<div><strong>Payment:</strong> {selectedBooking.payment}</div>
				</div>
			</div>
		</div>
	{/if}

	<!-- User Modal -->
	{#if showUserModal && selectedUser}
		<div class="fixed inset-0 bg-opacity-50 flex items-center justify-center z-50" role="dialog" tabindex="-1" onclick={closeModals} onkeydown={(e) => e.key === 'Escape' && closeModals()}>
			<div class="glass rounded-lg p-6 max-w-lg w-full mx-4" role="document" onclick={(e) => e.stopPropagation()} onkeydown={(e) => e.stopPropagation()}>
				<div class="flex justify-between items-center mb-4">
					<h2 class="text-2xl font-bold">User Details</h2>
					<button onclick={closeModals} class="text-gray-500 hover:text-gray-700" aria-label="Close modal">
						<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
						</svg>
					</button>
				</div>
				<div class="space-y-3">
					<div><strong>ID:</strong> {selectedUser.id}</div>
					<div><strong>Name:</strong> {selectedUser.name}</div>
					<div><strong>Email:</strong> {selectedUser.email}</div>
					<div><strong>Phone:</strong> {selectedUser.phone_number || 'N/A'}</div>
					<div><strong>Nationality:</strong> {selectedUser.nationality || 'N/A'}</div>
					<div><strong>Created:</strong> {selectedUser.created_At}</div>
				</div>
			</div>
		</div>
	{/if}
</div>