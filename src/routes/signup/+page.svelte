<script lang="ts">
import type {ActionData, PageProps} from './$types';
import useShowalert from '$lib/alert/useAlert';
import { enhance } from '$app/forms';
import { m as t } from '$lib/paraglide/messages.js';
let isLoading = $state(false);
let {form }: {data: PageProps, form: ActionData} = $props();

const { alert, showAlert} = useShowalert();
$effect(() => {
    if (form && form.success === true) {
        alert.message = form.message;
        alert.success = form.success;
        showAlert("/login");
    } else if (form && form.success === false) {
        alert.message = form.message;
        alert.success = form.success;
        showAlert("");
    }
    });
</script>
 
<div class="px-[5%] py-4 h-full w-full flex justify-center items-center">
  
    <fieldset class="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
        <legend class="fieldset-legend text-2xl">
            <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M18 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 1 1-6.75 0a3.375 3.375 0 0 1 6.75 0M3 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.3 12.3 0 0 1 9.374 21C7.043 21 4.862 20.355 3 19.234"/></svg>
            {t.signup_title()}</legend>
      <form method="POST" action="/signup" use:enhance={() => {
        isLoading = true;
    
      } }>
        <label for="name" class="label">{t.signup_full_name()}</label>
        <input id="name" name="name" type="text" class="input" placeholder="{t.signup_full_name_placeholder()}" />
        <label for="email" class="label">{t.signup_email()}</label>
        <input id="email" name="email" type="email" class="input" placeholder="{t.signup_email_placeholder()}" />
        <label for="password" class="label">{t.signup_password()}</label>
        <input id="password" name="password" type="password" class="input" placeholder="{t.signup_password_placeholder()}" />
        <label for="confirmPassword" class="label">{t.signup_confirm_password()}</label>
        <input id="confirmPassword" name="confirmPassword" type="password" class="input" placeholder="{t.signup_confirm_password_placeholder()}" />
        <label for="phone" class="label">{t.signup_phone_number()}</label>
        <input id="phone" name="phone_number" type="text" class="input" placeholder="{t.signup_phone_number_placeholder()}" />
        <label for="nationality" class="label">{t.signup_nationality()}</label>
        <input id="nationality" name="nationality" type="text" class="input" placeholder="{t.signup_nationality_placeholder()}" />
        <div class="flex items-center justify-between mt-2">
        <button type="submit" class="btn btn-neutral mt-4">{#if isLoading}
        <span class="loading loading-spinner loading-xs"></span>
      {:else}
        {t.signup_register_button()}
      {/if}
      </button>
        <a href="/login" class="btn btn-link mt-4">{t.signup_signin_link()}</a>
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