
<script lang="ts">
  import type {ActionData, PageProps} from './$types';
  import useShowalert from '$lib/alert/useAlert';
	import { enhance } from '$app/forms';
	import { goto } from '$app/navigation';
  let isLoading = $state(false);
  let alerts = $state({
    message: '',
    success: false
  }); 
  const { alert, showAlert} = useShowalert();

  let {data, form }: {data: PageProps, form: ActionData} = $props();

  // console.log('Login Page Props:',  form);
  $effect(() => {
    if (form && form.success === true) {
      isLoading = false;
      alert.message = form.message;
      alert.success = form.success;
      showAlert();
      goto('/'); // Redirect to booking page on successful login
    } else if (form && form.success === false) {
      isLoading = false;
      alert.message = form.message;
      alert.success = form.success;
      showAlert();
      console.log(alert)
    }
  });

console.log('Login Page Props:',  form);

  console.log(alert)
</script>

<div class="px-[5%] py-4 h-full w-full flex justify-center items-center">
  
<fieldset class="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
    <legend class="fieldset-legend text-2xl">
        <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15.75 6a3.75 3.75 0 1 1-7.5 0a3.75 3.75 0 0 1 7.5 0M4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.9 17.9 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632"/></svg>
        Signin</legend>
   <form method="POST" action="/login" use:enhance={() => {
      isLoading = true;
      // return async ({result}: {result: any}) => {
      //   console.log('Form submitted:', result);
      //   if (result?.data?.success === true) {
      //     isLoading = false;
      //     alerts = { message: result.data.message, success: result.data.success };
      //     alert.message = alerts.message;
      //     alert.success = alerts.success;
      //     showAlert();
      //     goto('/'); // Redirect to booking page on successful login
      //   } else {
      //     isLoading = false;
      //     // alert.message = result?.data?.message;
      //     alerts = { message: result.data.message, success: result.data.success };
      //     alert.message = alerts.message;
      //     alert.success = alerts.success;
      //     showAlert();
      //   }
      // }
    } }>
    <input id="email" name="email" type="email" class="input" placeholder="Email" />
  
    <label for="password" class="label">Password</label>
    <input id="password" name="password" type="password" class="input" placeholder="Password" />
   <a href="/forgot-password" class="text-sm text-blue-500 hover:underline mt-2">Forgot password</a>
    <div class="flex items-center justify-between mt-2">
    <button type="submit" class="btn btn-neutral mt-4">
      {#if isLoading}
        <span class="loading loading-spinner loading-xs"></span>
      {:else}
        Login
      {/if}
    </button>
    <a href="/signup" class="btn btn-link mt-4">Sign Up</a>
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
  </fieldset>
</div>