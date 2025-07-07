<script lang="ts">
	import { enhance } from '$app/forms';
	import useShowalert from '$lib/alert/useAlert';
	import type { ActionData, PageData } from './$types';

	let { data, form }: { data: PageData; form: ActionData } = $props();

    let custom = $state(false);
	// Initialize the booking state with the data loaded from the server
	let booking = $state(data.booking);
	let isLoading = $state(false);

	// Re-using the price calculation logic from your booking page
	let dailyPrice = $state(0);
	let totalPrice = $state(0);

	function calculateDailyPrice() {
		if (booking.guideType) dailyPrice = 200; // Example price
	}

	$effect(() => {
		calculateDailyPrice();
	});

	$effect(() => {
		totalPrice = dailyPrice * Number(booking.length_of_stay);
	});

	const { alert, showAlert } = useShowalert();

	// Effect to handle form submission feedback
	$effect(() => {
		if (form?.success) {
			isLoading = false;
			alert.message = form.message;
			alert.success = form.success;
			showAlert('/profile'); // Redirect to profile after successful update
		} else if (form?.success === false) {
			isLoading = false;
			alert.message = form.message;
			alert.success = form.success;
			showAlert('');
		}
	});

    console.log(data, form)
</script>

<form
	class="flex items-center justify-center p-4"
	method="POST"
	use:enhance={() => {
		isLoading = true;
		return async ({ update }) => {
			update();
		};
	}}
>
	<fieldset class="fieldset w-xs rounded-box border border-base-300 bg-base-200 p-4 relative space-y-2">
		<legend class="fieldset-legend text-2xl">Update Booking</legend>

		<!-- Hidden input to send the booking ID with the form -->
		<input type="hidden" name="id" bind:value={booking.id} />

		<label class="label" for="guideType">Guide</label>
		<select class="select" name="guideType" id="guideType" bind:value={booking.guideType}>
			<option value="Kenedy Bolo">Kenedy Bolo</option>
			<option value="Amina Bello">Amina Bello</option>
			<option value="Chinyere Eze">Chinyere Eze</option>
			<option value="Peter Nwankwo">Peter Nwankwo</option>
			<option value="Tunde Lawal">Tunde Lawal</option>
			<option value="Fatima Hassan">Fatima Hassan</option>
		</select>

		<label class="label" for="arriveDate">Arrival Date</label>
		<input type="date" id="arriveDate" name="arriveDate" class="input" bind:value={booking.arriveDate} />

		<label class="label" for="departDate">Departure Date</label>
		<input type="date" name="departDate" id="departDate" class="input" bind:value={booking.departDate} />

		<label class="label" for="pickupTime">Pickup time</label>
		<input type="time" id="pickupTime" name="pickup_time" class="input" bind:value={booking.pickup_time} />

        <label class="label" for="pcikupLocation">Pickup location</label>
    <input type="text" id="pickupLocation" name="pickup_location" class="input" value={booking.pickup_location} onchange={(e) => booking.pickup_location = (e.target as HTMLInputElement)?.value}  placeholder="Pickup Location" />


		<label class="label" for="number_of_guests">Number of Guests</label>
		<input type="number" class="input" name="guests" id="number_of_guests" bind:value={booking.guests} min="1" />

		<label class="label" for="duration">Length of Stay (days)</label>
		<input type="number" class="input" name="length_of_stay" id="duration" bind:value={booking.length_of_stay} min="1" />

        <label class="label" for="more_info">Note</label>
        <textarea class="textarea" id="more_info" name="moreInfo" placeholder="Note" value={booking.moreInfo} ></textarea>
  <div>
    <input  id="userId" type="hidden" name="userId" class="input"  value={booking.userId} placeholder="userId" />
{#if custom === false}
    <button onclick={() => custom = true} type="button" class="btn btn-ghost flex flex-row items-center mt-3">Customize
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m6 9l6 6l6-6"/></svg>
    </button>
    {/if}
    {#if custom === true}
    <div>
         <!-- <label class="label" for="vehicle">Vehicle Type</label> -->
        <!-- <input type="text" id="vehicle" name="vehicle" class="input"  bind:value={booking.vehicle} onchange={(e) => booking.vehicle = (e.target as HTMLInputElement)?.value} placeholder="Vehicle" /> -->
        <label class="label" for="special_requests">Special Request</label>
        <textarea class="textarea" id="special_requests" name="special_requests" placeholder="Tell us about extra services you want to include" value={booking.special_requests} onchange={(e) => booking.special_requests = (e.target as HTMLTextAreaElement)?.value}></textarea>
    </div>
    {/if}
  </div>
        
        <div class="items mt-4 w-auto rounded-box bg-[#f5f5f5] p-2">
			<h4 class="text-md font-bold">Daily Price: ${dailyPrice}</h4>
			<h4 class="text-lg font-bold">Total Price: ${totalPrice}</h4>
		</div>

		<button type="submit" class="btn btn-neutral mt-4 w-full" disabled={isLoading}>
			{#if isLoading}
				<span class="loading loading-spinner"></span>
			{:else}
				Update Booking
			{/if}
		</button>
	</fieldset>
</form>

<div>
    {#if form?.success === true}
      <div id="alert" class="toast toast-top toast-start">
        <div class="alert alert-success">
          <span class="text-white">{form?.message}.</span>
        </div>
      </div>
    {/if}
    {#if form?.success === false}
      <div id="alert" class="toast toast-bottom toast-star mb-[7%]">
        <div class="alert alert-error">
          <span class="text-white">{form?.message}.</span>
        </div>
      </div>
    {/if}
    </div>

<!-- You can add your alert/toast component here to show form messages -->