<script lang="ts">
  import { onMount } from 'svelte';
  import { page } from '$app/state';
  
  let status = $state('processing');
  let message = $state('Verifying your payment...');
  
  onMount(() => {
    const urlParams = new URLSearchParams(page.url.search);
    const success = urlParams.get('success');
    const error = urlParams.get('error');
    
    if (success === 'payment_completed') {
      status = 'success';
      message = 'Payment completed successfully!';
      setTimeout(() => {
        window.location.href = '/';
      }, 3000);
    } else if (error) {
      status = 'error';
      message = 'Payment verification failed. Please contact support.';
    }
  });
</script>

<div class="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 flex items-center justify-center">
  <div class="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full mx-4 text-center">
    {#if status === 'processing'}
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
      <h2 class="text-xl font-semibold text-gray-800 mb-2">Processing</h2>
      <p class="text-gray-600">{message}</p>
    {:else if status === 'success'}
      <div class="text-green-500 text-5xl mb-4">✅</div>
      <h2 class="text-xl font-semibold text-gray-800 mb-2">Payment Successful</h2>
      <p class="text-gray-600 mb-4">{message}</p>
      <p class="text-sm text-gray-500">Redirecting to home page...</p>
    {:else}
      <div class="text-red-500 text-5xl mb-4">❌</div>
      <h2 class="text-xl font-semibold text-gray-800 mb-2">Payment Failed</h2>
      <p class="text-gray-600 mb-4">{message}</p>
      <a href="/booking" class="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors">
        Try Again
      </a>
    {/if}
  </div>
</div>