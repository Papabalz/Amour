
<script lang="ts">
	import { enhance } from "$app/forms";
	import { goto } from "$app/navigation";
	import { page } from '$app/stores';
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
    name: data?.user?.name || '',
    email: data?.user?.email || '',
    country: data?.user?.nationality || '',
    phone: data?.user?.phone_number || '',
    location: '',
    numberOfDays: 1,
    adults: 1,
    childrenAges: '',
    guideType: '',
    guests: 1,
    status: 'pending',
    isPaid: false,
    payment: '',
    special_requests: '',
    travelDate: '',

    moreInfo: '',
    pickup_location: ''
  }

  // Auto-fill location from URL parameters
  let packageType = $state('');
  
  function getGroupPrice(people: number, packageType: string): number {
    const pricing: Record<string, Record<number | string, number>> = {
      'Stone Town Tour': { 1: 140, 2: 100, 3: 70, 4: 60, 5: 50, '6+': 40 },
      'Sandbank Day Trip': { 1: 170, 2: 130, 3: 90, 4: 65, 5: 50, '6+': 45 },
      'Safari Blue Tour': { 1: 200, 2: 140, 3: 110, 4: 75, 5: 55, '6+': 50 },
      'Spice Tour': { 1: 120, 2: 90, 3: 65, 4: 50, 5: 40, '6+': 35 },
      'Prison Island Tour': { 1: 150, 2: 110, 3: 70, 4: 60, 5: 55, '6+': 45 },
      'Jozani Forest Tour': { 1: 130, 2: 90, 3: 60, 4: 50, 5: 40, '6+': 35 },
      'Mnemba Snorkel Trip': { 1: 180, 2: 140, 3: 90, 4: 70, 5: 60, '6+': 55 },
      'Culture Tour': { 1: 150, 2: 110, 3: 70, 4: 50, 5: 45, '6+': 35 },
      'Sunset Cruise': { 1: 110, 2: 90, 3: 60, 4: 50, 5: 40, '6+': 30 },
      'Blue Lagoon': { 1: 110, 2: 110, 3: 65, 4: 40, 5: 40, '6+': 35 },
      'Kizimkazi Dolphin Tour': { 1: 160, 2: 160, 3: 80, 4: 65, 5: 60, '6+': 40 },
      'Buggy/Quad Bike Adventure': { 1: 190, 2: 190, 3: 190, 4: 190, 5: 190, '6+': 190 },
      'Salaam Cave Tour': { 1: 120, 2: 90, 3: 60, 4: 40, 5: 40, '6+': 30 },
      'The Rock Restaurant': { 1: 110, 2: 60, 3: 40, 4: 40, 5: 40, '6+': 30 },
      'Stone Town Tour & Spice Tour': { 1: 230, 2: 120, 3: 80, 4: 70, 5: 55, '6+': 50 },
      'Stone Town & Prison Island Tour': { 1: 220, 2: 130, 3: 90, 4: 80, 5: 70, '6+': 60 },
      'Prison Island & Nakupenda Tour': { 1: 240, 2: 140, 3: 120, 4: 80, 5: 65, '6+': 50 },
      'Stone Town & Spice & Prison Tour': { 1: 370, 2: 310, 3: 270, 4: 230, 5: 160, '6+': 120 },
      'Jozani & Spice Tour': { 1: 210, 2: 120, 3: 90, 4: 70, 5: 55, '6+': 40 },
      'Jozani & The Rock Tour': { 1: 240, 2: 170, 3: 170, 4: 160, 5: 120, '6+': 55 },
      'The Rock & Salaam Cave Tour': { 1: 240, 2: 140, 3: 90, 4: 80, 5: 60, '6+': 40 }
    };
    
    const packagePricing = pricing[packageType];
    if (!packagePricing) return 100;
    
    if (people >= 6) return packagePricing['6+'] || 100;
    return packagePricing[people] || 100;
  }
  
  $effect(() => {
    const urlParams = new URLSearchParams($page.url.search);
    const locationParam = urlParams.get('location');
    const packageParam = urlParams.get('package');
    
    if (locationParam && packageParam) {
      const locationName = locationParam.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
      const packageName = packageParam.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
      booking.location = `${packageName}`;
      packageType = packageName;
    }
  });

  let booking = $state(initialBookingState);

  let dailyPrice = $state(0);
  let totalPrice = $state(0);

  $effect(() => {
    let adultsOver15 = 0;
    
    if (booking.childrenAges.trim()) {
      const ages = booking.childrenAges.split(',').map(age => parseInt(age.trim())).filter(age => !isNaN(age));
      adultsOver15 = ages.filter(age => age >= 15).length;
    }
    
    const totalAdults = booking.adults + adultsOver15;
    const pricePerPerson = getGroupPrice(totalAdults, packageType);
    dailyPrice = pricePerPerson * totalAdults;
    totalPrice = dailyPrice * Number(booking.numberOfDays || 1);
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




<div class="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 py-8">
  <div class="container mx-auto px-4">
    <div class="max-w-4xl mx-auto">
      <div class="text-center mb-8">
        <h1 class="text-4xl font-bold text-gray-800 mb-2">{t.booking_title()}</h1>
        <p class="text-gray-600">Complete your booking details below</p>
      </div>

      <form method="POST" bind:this={formElement} action="/booking" use:enhance={() => {
        isLoading = true;
      }}>
        <div class="grid lg:grid-cols-3 gap-8">
          <!-- Main Form -->
          <div class="lg:col-span-2">
            <div class="bg-white rounded-2xl shadow-xl p-8">
              <h2 class="text-2xl font-semibold text-gray-800 mb-6 flex items-center">
                <svg class="w-6 h-6 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                </svg>
                Personal Information
              </h2>
              
              <div class="grid md:grid-cols-2 gap-6 mb-8">

                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2" for="name">Full Name</label>
                  <input type="text" id="name" name="name" class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" bind:value={booking.name} placeholder="Enter your full name" required />
                </div>
                
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2" for="email">Email Address</label>
                  <input type="email" id="email" name="email" class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" bind:value={booking.email} placeholder="your@email.com" required />
                </div>
                
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2" for="country">Country</label>
                  <input type="text" id="country" name="country" class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" bind:value={booking.country} placeholder="Your country" required />
                </div>
                
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2" for="phone">WhatsApp/Phone</label>
                  <input type="tel" id="phone" name="phone" class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" bind:value={booking.phone} placeholder="+1 234 567 8900" required />
                </div>
              </div>

              <h3 class="text-xl font-semibold text-gray-800 mb-6 flex items-center">
                <svg class="w-5 h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                </svg>
                Tour Details
              </h3>
              
              <div class="grid md:grid-cols-2 gap-6 mb-8">
                <div class="md:col-span-2">
                  <label class="block text-sm font-medium text-gray-700 mb-2" for="location">Tour Package</label>
                  <input type="text" id="location" name="location" class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50" bind:value={booking.location} placeholder="Selected tour package" required readonly />
                </div>
                
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2" for="numberOfDays">Duration</label>
                  <input type="number" id="numberOfDays" name="numberOfDays" class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" bind:value={booking.numberOfDays} min="1" placeholder="Days" required />
                </div>

                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2" for="travelDate">Travel Date</label>
                  <input type="date" id="travelDate" name="travelDate" class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" bind:value={booking.travelDate} required />
                </div>

                <div class="md:col-span-2">
                  <label class="block text-sm font-medium text-gray-700 mb-2" for="pickupLocation">Pickup Location</label>
                  <input type="text" id="pickupLocation" name="pickup_location" class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" bind:value={booking.pickup_location} placeholder="Hotel name or address" required />
                </div>
              </div>

              <h3 class="text-xl font-semibold text-gray-800 mb-6 flex items-center">
                <svg class="w-5 h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
                </svg>
                Group Information
              </h3>
              
              <div class="grid md:grid-cols-2 gap-6 mb-8">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2" for="adults">Adults</label>
                  <input type="number" class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" name="adults" id="adults" bind:value={booking.adults} min="1" required />
                </div>
                
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2" for="childrenAges">Children</label>
                  <input type="text" id="childrenAges" name="childrenAges" class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" bind:value={booking.childrenAges} placeholder="e.g. 2 kids (8, 12)" />
                  <p class="text-xs text-gray-500 mt-1">Format: Number of kids (ages). Under 15 free, 15+ charged as adults</p>
                </div>
              </div>

              <div class="mb-8">
                <label class="block text-sm font-medium text-gray-700 mb-2" for="more_info">Additional Notes</label>
                <textarea class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" id="more_info" name="moreInfo" rows="4" placeholder="Any special requests or additional information..." bind:value={booking.moreInfo}></textarea>
              </div>
              {#if custom === false}
                <button onclick={() => custom = true} type="button" class="text-blue-600 hover:text-blue-800 font-medium flex items-center gap-2 mb-6">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" class="flex-shrink-0">
                    <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m6 9l6 6l6-6"/>
                  </svg>
                  Add Special Requests
                </button>
              {/if}
              
              {#if custom === true}
                <div class="mb-6">
                  <label class="block text-sm font-medium text-gray-700 mb-2" for="special_requests">Special Requests</label>
                  <textarea class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" id="special_requests" name="special_requests" rows="3" placeholder="Any special services or accommodations needed..." bind:value={booking.special_requests}></textarea>
                </div>
              {/if}
              
              <input id="userId" type="hidden" name="userId" value={booking.userId} />
            </div>
          </div>

          <!-- Sidebar -->
          <div class="lg:col-span-1">
            <div class="bg-white rounded-2xl shadow-xl p-6 sticky top-8">
              <h3 class="text-xl font-semibold text-gray-800 mb-6">Booking Summary</h3>
              
              {#if packageType}
                <div class="mb-6 p-4 bg-blue-50 rounded-lg">
                  <h4 class="font-semibold text-gray-800 mb-3 text-center">Group Pricing (per person)</h4>
                  <div class="grid grid-cols-2 gap-2 text-xs">
                    <div class="flex justify-between"><span>1 person:</span><span class="font-semibold">${getGroupPrice(1, packageType)}</span></div>
                    <div class="flex justify-between"><span>2 people:</span><span class="font-semibold">${getGroupPrice(2, packageType)}</span></div>
                    <div class="flex justify-between"><span>3 people:</span><span class="font-semibold">${getGroupPrice(3, packageType)}</span></div>
                    <div class="flex justify-between"><span>4 people:</span><span class="font-semibold">${getGroupPrice(4, packageType)}</span></div>
                    <div class="flex justify-between"><span>5 people:</span><span class="font-semibold">${getGroupPrice(5, packageType)}</span></div>
                    <div class="flex justify-between"><span>6+ people:</span><span class="font-semibold">${getGroupPrice(6, packageType)}</span></div>
                  </div>
                  <p class="text-xs text-gray-600 mt-2 text-center">Larger groups get better rates!</p>
                </div>
              {/if}
              
              <div class="space-y-4 mb-6">
                <div class="flex justify-between text-sm">
                  <span class="text-gray-600">Price per person:</span>
                  <span class="font-medium">${getGroupPrice(booking.adults + (booking.childrenAges.trim() ? booking.childrenAges.split(',').map(age => parseInt(age.trim())).filter(age => !isNaN(age) && age >= 15).length : 0), packageType)}</span>
                </div>
                <div class="flex justify-between text-sm">
                  <span class="text-gray-600">Daily Rate:</span>
                  <span class="font-medium">${dailyPrice}</span>
                </div>
                <div class="flex justify-between text-sm">
                  <span class="text-gray-600">Duration:</span>
                  <span class="font-medium">{booking.numberOfDays} day{booking.numberOfDays > 1 ? 's' : ''}</span>
                </div>
                <div class="border-t pt-4">
                  <div class="flex justify-between text-lg font-bold">
                    <span>Total:</span>
                    <span class="text-blue-600">${totalPrice}</span>
                  </div>
                </div>
              </div>

              <button type="button" class="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-6 rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed" disabled={!booking.name || !booking.email || !booking.country || !booking.phone || !booking.location || !booking.numberOfDays || !booking.travelDate || !booking.pickup_location || !booking.adults} onclick={()=> (document.getElementById('my_modal_2') as HTMLDialogElement)?.showModal()}>
                {#if isLoading}
                  <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white inline" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                {/if}
                Complete Booking
              </button>
              
              <p class="text-xs text-gray-500 text-center mt-4">Secure booking powered by Amour Tours</p>
            </div>
          </div>
        </div>
      </form>
    </div>
  </div>
</div>
<dialog id="my_modal_2" class="modal">
  <div class="modal-box max-w-md">
    <h3 class="text-xl font-bold text-gray-800 mb-4">{t.booking_modal_hello()}{data?.user?.name?.replace(/\b\w/g, (i) => i.toUpperCase())}</h3>
    
    <div class="bg-blue-50 rounded-lg p-4 mb-6">
      <div class="flex justify-between items-center">
        <span class="text-gray-700">Total Amount:</span>
        <span class="text-2xl font-bold text-blue-600">${totalPrice}</span>
      </div>
    </div>
    
    <p class="text-gray-600 mb-6">{t.booking_modal_select_type()}</p>
    
    <div class="space-y-3">
      <label class="flex items-center p-4 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
        <input type="radio" name="payment" value="pay_later" class="mr-3" onchange={handlePaymentSubmit} />
        <div>
          <div class="font-medium text-gray-800">{t.booking_modal_pay_on_arrival()}</div>
          <div class="text-sm text-gray-500">Pay when you arrive at the destination</div>
        </div>
      </label>
      
      <label class="flex items-center p-4 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
        <input type="radio" name="payment" value="pay_now" class="mr-3" onchange={handlePaymentSubmit} />
        <div>
          <div class="font-medium text-gray-800">{t.booking_modal_pay_now()}</div>
          <div class="text-sm text-gray-500">Secure online payment</div>
        </div>
      </label>
    </div>
    
    <button onclick={handleClose} type="button" class="absolute top-4 right-4 text-gray-400 hover:text-gray-600" aria-label="close">
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <line x1="18" y1="6" x2="6" y2="18"></line>
        <line x1="6" y1="6" x2="18" y2="18"></line>
      </svg>
    </button>
  </div>
</dialog>


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
