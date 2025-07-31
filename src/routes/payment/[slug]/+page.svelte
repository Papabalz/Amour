<script lang="ts">
    import { enhance } from '$app/forms';
	import { page } from '$app/state';
	import type { ActionData, PageData } from './$types';
  import { onMount } from 'svelte';

    let { data, form }: { data: PageData; form: ActionData } = $props();

let params = $state({totalPrice: ''});

onMount(() => {
  const url = new URL(window.location.href);
  const searchParams = new URLSearchParams(url.search);
  
  params = {
    totalPrice: searchParams.get('totalPrice') ?? '',
  };

 
});
let loading = $state(false);
let error = $state('');
let paymentLink = $state('');
let amount = $state(page?.url?.searchParams.get('totalPrice') ?? '');
let email = $state(page?.data.user?.email ?? '');
let name = $state(page?.data?.user?.name ?? '');

//console.log(amount, name, email);

    // async function handlePayment() {
    //   try {
    //     loading = true;
    //     error = '';
        
    //     const response = await fetch('/payments', {
    //       method: 'POST',
    //       headers: {
    //         'Content-Type': 'application/json',
    //       },
    //       body: JSON.stringify({
    //         amount,
    //         currency: "USD",
    //         email,
    //         name
    //       }),
    //     });
  
    //     const data = await response.json();
        
    //     if (response.ok) {
    //       paymentLink = data.payment_link;
    //       // Redirect to Flutterwave payment page
    //       window.location.href = paymentLink;
    //     } else {
    //       error = data.error || 'Payment initialization failed';
    //     }
    //   } catch (err) {
    //     error = 'An unexpected error occurred';
    //     console.error(err);
    //   } finally {
    //     loading = false;
    //   }
    // }

    // console.log(amount, name, email)
  </script>
  
  <div class="payment-container">
    <!-- <h1>Make a Payment</h1> -->
    
    {#if paymentLink}
      <p>Redirecting to payment page...</p>
      <a href={paymentLink}>Click here if not redirected</a>
    {:else}
      <form method="POST" action="https://checkout.flutterwave.com/v3/hosted/pay">
        <fieldset class="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
          <legend class="fieldset-legend text-2xl">Make Payment</legend>
          <input type="hidden" name="public_key" value="FLWPUBK_TEST-SANDBOXDEMOKEY-X" />
<input type="hidden" name="tx_ref" value={`amour-${Date.now()}`} />
<input type="hidden" name="currency" value="USD" />
          <!-- <label class="label" for="amount">Amount (NGN)</label> -->
          <input
          type="hidden"
            name="amount"
            class="input"
            bind:value={amount}
            required
          />
        
          <!-- <label class="label" for="email">Email</label> -->
          <input
          type="hidden"
          class="input"
            name="customer[email]"
            bind:value={email}
            required
          />
        
          <!-- <label class="label" for="name">Full Name</label> -->
          <input
          type="hidden"
          class="input" 
          name="customer[name]"
          bind:value={name}
        />
        <input
	type="hidden"
	name="redirect_url"
	value={`/payment/${data?.booking?.id}`}
/>
        {#if error}
        <div class="error">{error}</div>
      {/if}
      
      <button type="submit" class="btn mt-5" disabled={loading}>
        {loading ? 'Processing...' : `$${(params.totalPrice)} Pay with Flutterwave`}
      </button>
        </fieldset>
        
      </form>
    {/if}
  </div>
  
  <style>
    .payment-container {
      max-width: 500px;
      margin: 2rem auto;
      padding: 2rem;
      border-radius: 8px;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    }
    
    .form-group {
      margin-bottom: 1.5rem;
    }
    
    label {
      display: block;
      font-weight: 600;
    }
    
    input {
      width: 100%;
      padding: 0.75rem;
      border: 1px solid #ddd;
      border-radius: 4px;
      font-size: 1rem;
    }
    
    button {
      background-color: #F5A623;
      color: white;
      border: none;
      padding: 0.75rem 1.5rem;
      border-radius: 4px;
      font-size: 1rem;
      cursor: pointer;
      width: 100%;
    }
    
    button:disabled {
      opacity: 0.7;
      cursor: not-allowed;
    }
    
    .error {
      color: #e74c3c;
      margin-bottom: 1rem;
      padding: 0.5rem;
      background-color: #fde8e8;
      border-radius: 4px;
    }
  </style>