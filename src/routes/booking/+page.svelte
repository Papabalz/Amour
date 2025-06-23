
<script lang="ts">

    import { get } from 'svelte/store';// Adjust the path according to where your user store is defined
	// import { createBooking } from "$lib/action/booking";
	// import { user } from "../../store/user";
  
    let booking = {
      // userId: Number(get(user)?.id ?? 0),
      guideType: '',
      arriveDate: '',
      departDate: '',
      guests: 1,
      status: 'pending',
      vehicle: '',
      isPaid: 'false',
    };
  
    let isLoading = false;
  
    async function submitBooking() {
      // Basic date validation
      if (new Date(booking.arriveDate) > new Date(booking.departDate)) {
        alert('Departure date must be after arrival date');
        return;
      }
  
      isLoading = true;
      try {
        // await createBooking(booking);
        alert('Booking submitted successfully!');
        // Optionally reset form:
        // booking = { ...initialBookingState };
      } catch (error) {
        alert('Booking failed. Please try again.');
        console.error(error);
      } finally {
        isLoading = false;
      }
    }

    // Removed duplicate imports and booking definition
    // Removed duplicate submitBooking function
  </script>

  


  <form on:submit|preventDefault={submitBooking} class="space-y-4 p-4 flex items-center justify-center">
    <fieldset class="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
      <legend class="fieldset-legend">Booking</legend>
    
      <label class="label" for="guideType">Choose a Guide</label>
      <select class="select" id="guideType" bind:value={booking.guideType} required placeholder="Choose a Guide">
        <option disabled selected>Choose a Guide</option>
        <option>Kenedy Bolo</option>
        <option>Amina Bello</option>
        <option>Chinyere Eze</option>
        <option>Peter Nwankwo</option>
        <option>Tunde Lawal</option>
        <option>Fatima Hassan</option>
      </select>
      <!-- <input id="guideType" type="text" class="input" bind:value={booking.guideType} placeholder="Guide Type" required /> -->
    
      <label class="label" for="vehicle">Vehicle Type</label>
      <select class="select" id="guideType" bind:value={booking.guideType} required placeholder="Choose a Guide">
        <option disabled selected>Choose a Guide</option>
        <option>Kenedy Bolo</option>
        <option>Amina Bello</option>
        <option>Chinyere Eze</option>
        <option>Peter Nwankwo</option>
        <option>Tunde Lawal</option>
        <option>Fatima Hassan</option>
      </select>
      <input type="text" id="vehicle" class="input"  bind:value={booking.vehicle} placeholder="Vehicle (optional)" />
      
      
      <label class="label" for="arriveDate">Arrival Date</label>
      <input type="date" id="arriveDate" class="input"  bind:value={booking.arriveDate} required />
      
      <label class="label" for="departDate">Departure Date</label>
      <input type="date" id="departDate" class="input" bind:value={booking.departDate} required />
      <label class="label" id="guests" for="departDate">Number of Guests</label>
      <select class="select" bind:value={booking.guests} required>
        <option selected>Number of Guests</option>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>  
        <option value="6">6</option>
        <option value="7">7</option>
        <option value="8">8</option>
        <option value="9">9</option>
        <option value="10">10</option>
        <option value="11+">11+</option>
      </select>
  
      <button type="submit"  class="btn btn-neutral mt-4" disabled={isLoading}> {#if isLoading}
        Submitting...
      {:else}
        Book Now
      {/if}</button>
    </fieldset>
  </form>
  