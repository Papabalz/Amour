
<script lang="ts">
	import { enhance } from "$app/forms";
	import { goto } from "$app/navigation";
	import useShowalert from "$lib/alert/useAlert";
	import type { User } from "$lib/server/db/schema";
	import type { ActionData } from "./$types";
	import { m as t } from '$lib/paraglide/messages.js';

  type PageProps = {
      user?: User;
    };

  let {data, form}: {data: PageProps, form: ActionData} = $props();

  let custom = $state(false);

  const initialBookingState = {
    userId: data?.user?.id || 0,
    guideType: '',
    arriveDate: '',
    departDate: '',
    guests: 1,
    status: 'pending',
    isPaid: false,
    payment: '',
    special_requests: '',
    pickup_time: '',
    length_of_stay: 1,
    moreInfo: '',
    pickup_location: ''
  }

  let booking = $state(initialBookingState);

  let dailyPrice = $state(0);
  let totalPrice = $state(0);

  $effect(() => {
    dailyPrice = booking.guideType ? 200 : 0;
    totalPrice = dailyPrice * Number(booking.length_of_stay || 0);
  });


  let isLoading = $state(false);

  let formElement: HTMLFormElement;

  function handlePaymentSubmit(event: Event) {
    const input = event.currentTarget as HTMLInputElement;
    booking.payment = input.value;
    if (formElement) {
      isLoading = true;
      formElement.requestSubmit();
    }
  }

const { alert, showAlert} = useShowalert();



$effect(() => {
  if (form) {
    isLoading = false;
    (document.getElementById('my_modal_2') as HTMLDialogElement)?.close();
    
    if (form.success === true) {
      alert.message = form.message;
      alert.success = form.success;
      showAlert("/");
    } else if (form.success === false) {
      alert.message = form.message;
      alert.success = form.success;
      showAlert("");
    } else if (form.data?.[0]?.id) {
      showAlert(`/payment/${form.data[0].id}?totalPrice=${totalPrice}`);
    }
  }
});
 
  const handleClose = () => {
    (document.getElementById('my_modal_2') as HTMLDialogElement)?.close()
  }



</script>




<form class="space-y-4 p-4 flex items-center justify-center" method="POST" bind:this={formElement} action="/booking" use:enhance={() => {
  isLoading = true;
}}>
  <fieldset class="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4 relative">
    <legend class="fieldset-legend text-2xl">{t.booking_title()}</legend>
    <label class="label" for="guideType">{t.booking_choose_guide()}</label>
    <select class="select" name="guideType" id="guideType" bind:value={booking.guideType} required>
      <option value="">{t.booking_choose_guide()}</option>
      <option value="Kenedy Bolo">Kenedy Bolo</option>
      <option value="Amina Bello">Amina Bello</option>
      <option value="Chinyere Eze">Chinyere Eze</option>
      <option value="Peter Nwankwo">Peter Nwankwo</option>
      <option value="Tunde Lawal">Tunde Lawal</option>
      <option value="Fatima Hassan">Fatima Hassan</option>
    </select>
    <!-- <input id="guideType" type="text" class="input" bind:value={booking.guideType} placeholder="Guide Type" required /> -->
    
    <label class="label" for="arriveDate">{t.booking_arrival_date()}</label>
    <input type="date" id="arriveDate" name="arriveDate" class="input" bind:value={booking.arriveDate} required />
    
    <label class="label" for="departDate">{t.booking_departure_date()}</label>
    <input type="date" name="departDate" id="departDate" class="input" bind:value={booking.departDate} required />

    <label class="label" for="pcikupTime">{t.booking_pickup_time()}</label>
    <input type="time" id="pickupTime" name="pickup_time" class="input" bind:value={booking.pickup_time} />

    <label class="label" for="pcikupLocation">{t.booking_pickup_location()}</label>
    <input type="text" id="pickupLocation" name="pickup_location" class="input" bind:value={booking.pickup_location} placeholder="Pickup Location" required />

    <label class="label" for="number_of_guests">{t.booking_number_of_guests()}</label>
    <input type="number" class="input" name="guests" id="number_of_guests" bind:value={booking.guests} min="1" required />
    <!-- <select class="select" name="guests" id="number_of_guests" bind:value={booking.guests} placeholder="Number of Guests">
      <option value="">Number of Guests</option>
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
      <option value="11">11</option>
      <option value="12">12</option>
      <option value="13">13</option>
      <option value="14">14</option>
      <option value="15">15</option>
      <option value="16">16</option>
      <option value="17">17</option>
      <option value="18">18</option>
      <option value="19">19</option>
      <option value="20">20</option>
    </select> -->

    <label class="label" for="duration">{t?.booking_length_of_stay()}</label>
    <input type="number" class="input" name="length_of_stay" id="duration" bind:value={booking.length_of_stay} min="1" required />

    <!-- <select class="select" name="length_of_stay" id="duration" bind:value={booking.length_of_stay} placeholder="Length of Stay">
      <option value="">Length of Stay</option>
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
      <option value="11">11</option>
      <option value="12">12</option>
      <option value="13">13</option>
      <option value="14">14</option>
      <option value="15">15</option>
      <option value="16">16</option>
      <option value="17">17</option>
      <option value="18">18</option>
      <option value="19">19</option>
      <option value="20">20</option>
      <option value="21">21</option>
      <option value="22">22</option>
      <option value="23">23</option>
      <option value="24">24</option>
      <option value="25">25</option>
      <option value="26">26</option>
      <option value="27">27</option>
      <option value="28">28</option>
      <option value="29">29</option>
      <option value="30">30</option>
      <option value="31">31</option>
    </select> -->
    <label class="label" for="more_info">{t.booking_note()}</label>
          <textarea class="textarea" id="more_info" name="moreInfo" placeholder="Note" bind:value={booking.moreInfo}></textarea>
    <div>
      <input  id="userId" type="hidden" name="userId" class="input"  value={booking.userId} placeholder="userId" />
{#if custom === false}
      <button onclick={() => custom = true} type="button" class="btn btn-ghost flex flex-row items-center mt-3">{t.booking_customize()}
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m6 9l6 6l6-6"/></svg>
      </button>
      {/if}
      {#if custom === true}
      <div>
           <!-- <label class="label" for="vehicle">Vehicle Type</label> -->
          <!-- <input type="text" id="vehicle" name="vehicle" class="input"  bind:value={booking.vehicle} onchange={(e) => booking.vehicle = (e.target as HTMLInputElement)?.value} placeholder="Vehicle" /> -->
          <label class="label" for="special_requests">{t.booking_special_request()}</label>
          <textarea class="textarea" id="special_requests" name="special_requests" placeholder="Tell us about extra services you want to include" bind:value={booking.special_requests}></textarea>
      </div>
      {/if}
    </div>

    <div class="items bg-[#f5f5f5] w-auto p-2 rounded-box">
      <h4 class="text-md font-bold">{t.booking_daily_price()}: ${dailyPrice}</h4>
      <h4 class="text-lg font-bold">{t.booking_total_price()}: ${totalPrice}</h4>
    </div>

    <button type="button" class="btn btn-neutral mt-4" disabled={!booking.guideType || !booking.arriveDate || !booking.departDate || !booking.pickup_location || !booking.guests || !booking.length_of_stay} onclick={()=> (document.getElementById('my_modal_2') as HTMLDialogElement)?.showModal()}>
      {#if isLoading}
        <span class="loading loading-spinner loading-sm"></span>
      {/if}
      {t.booking_book_button()}
    </button>
  </fieldset>
  <div>
    <dialog id="my_modal_2" class="modal">
      <div class="modal-box">
        <h3 class="text-lg font-bold">{t.booking_modal_hello()}{data?.user?.name.replace(/\b\w/g, (i) => i.toUpperCase())}</h3>
        <div class="flex flex-row justify-between items-center">
        <p class="py-4">{t.booking_modal_select_type()}</p>
        <h6 class="font-semibold text-lg px-2 rounded-lg bg-cyan-700 text-white">{totalPrice}</h6>
      </div>
      <div class="join">
        <input class="join-item btn" type="radio"  name="payment" value="pay_later" aria-label={t.booking_modal_pay_on_arrival()}  onchange={handlePaymentSubmit}  />
        <input class="join-item btn" type="radio" name="payment" value="pay_now" aria-label={t.booking_modal_pay_now()}  onchange={handlePaymentSubmit}  />
       
      </div>
      <button onclick={handleClose} type="button" class="btn btn-circle btn-sm float-right" aria-label="close"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"><path fill="currentColor" d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12z"/></svg></button>
      </div>
    </dialog>
    </div>
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
