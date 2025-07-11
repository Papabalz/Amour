<script lang="ts">
    import { enhance } from '$app/forms';
  
    let amount = 100;
    let email = '';
    let name = '';
    let loading = false;
    let paymentLink = '';
    let error = '';
  
    async function handlePayment() {
      try {
        loading = true;
        error = '';
        
        const response = await fetch('/payments', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            amount,
            currency: 'NGN',
            email,
            name
          }),
        });
  
        const data = await response.json();
        
        if (response.ok) {
          paymentLink = data.payment_link;
          // Redirect to Flutterwave payment page
          window.location.href = paymentLink;
        } else {
          error = data.error || 'Payment initialization failed';
        }
      } catch (err) {
        error = 'An unexpected error occurred';
        console.error(err);
      } finally {
        loading = false;
      }
    }
  </script>
  
  <div class="payment-container">
    <h1>Make a Payment</h1>
    
    {#if paymentLink}
      <p>Redirecting to payment page...</p>
      <a href={paymentLink}>Click here if not redirected</a>
    {:else}
      <form on:submit|preventDefault={handlePayment}>
        <div class="form-group">
          <label for="amount">Amount (NGN)</label>
          <input
            type="number"
            id="amount"
            bind:value={amount}
            min="100"
            step="100"
            required
          />
        </div>
        
        <div class="form-group">
          <label for="email">Email</label>
          <input
            type="email"
            id="email"
            bind:value={email}
            required
          />
        </div>
        
        <div class="form-group">
          <label for="name">Full Name</label>
          <input
            type="text"
            id="name"
            bind:value={name}
          />
        </div>
        
        {#if error}
          <div class="error">{error}</div>
        {/if}
        
        <button type="submit" disabled={loading}>
          {loading ? 'Processing...' : 'Pay with Flutterwave'}
        </button>
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
      margin-bottom: 0.5rem;
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