<script lang="ts">
  import { onMount } from 'svelte';
  import type { PageData } from './$types';
  
  let { data }: { data: PageData } = $props();
  
  let loading = $state(true);
  
  onMount(() => {
    loading = false;
  });
</script>

<div class="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 flex items-center justify-center">
  <div class="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full mx-4">
    {#if loading}
      <div class="text-center">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <h2 class="text-xl font-semibold text-gray-800 mb-2">Processing Payment</h2>
        <p class="text-gray-600">Processing your payment...</p>
      </div>
    {:else}
      <div class="text-center">
        <div class="text-red-500 text-5xl mb-4">⚠️</div>
        <h2 class="text-xl font-semibold text-gray-800 mb-2">Payment Error</h2>
        <p class="text-gray-600 mb-4">{data.error || 'There was an issue processing your payment request.'}</p>
        <a href="/booking" class="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors">
          Return to Booking
        </a>
      </div>
    {/if}
  </div>
</div>