
<script lang="ts">
    import type { ActionData } from './$types';
    
    type User = {
      name?: string;
      email?: string;
      phone_number?: string;
      nationality?: string;
    };
        
    type PageProps = {
      user?: User;
    };
    import useShowalert from '$lib/alert/useAlert';
      import { enhance } from '$app/forms';
    let isLoading = $state(false);

   const { alert, showAlert} = useShowalert();
  
    let {form, data }: {data: PageProps, form: ActionData} = $props();

    $effect(() => {
      if (form && form.success === true) {
        isLoading = false;
        alert.message = form.message;
        alert.success = form.success;
        showAlert("/profile");
       
      } else if (form && form.success === false) {
        isLoading = false;
        alert.message = form.message;
        alert.success = form.success;
        showAlert("");
        console.log(alert)
      }
    });

    // console.log('update Page Props:',  form, data);
  </script>
  
  <div class="px-[5%] py-4 h-full w-full flex justify-center items-center">
  
    <fieldset class="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
        <legend class="fieldset-legend text-2xl">
            <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M18 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 1 1-6.75 0a3.375 3.375 0 0 1 6.75 0M3 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.3 12.3 0 0 1 9.374 21C7.043 21 4.862 20.355 3 19.234"/></svg>
            Update User</legend>
      <form method="POST" action="/update_user" use:enhance={() => {
        isLoading = true;
      } }>
        <label for="name" class="label">Full Name</label>
        <input id="name" name="name" type="text" class="input" value={data?.user?.name} placeholder="Full Name" />
        <label for="email" class="label">Email</label>
        <input id="email" name="email" type="email" class="input" value={data?.user?.email} placeholder="Email" />
        <label for="phone" class="label">Phone Number</label>
        <input id="phone" name="phone_number" type="text" class="input" value={data?.user?.phone_number} placeholder="Phone Number" />
        <label for="nationality" class="label">Nationality</label>
        <input id="nationality" name="nationality" type="text" class="input" value={data?.user?.nationality} placeholder="Nationality" />
        <div class="flex items-center justify-between mt-2">
        <button type="submit" class="btn btn-neutral mt-4">{#if isLoading}
            <span class="loading loading-spinner loading-xs"></span>
          {:else}Update profile {/if}</button>
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