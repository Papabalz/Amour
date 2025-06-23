
<div class="px-[5%] py-4 h-screen w-full justify-center items-center flex">
  
<fieldset class="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
    <legend class="fieldset-legend text-2xl">
        <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15.75 6a3.75 3.75 0 1 1-7.5 0a3.75 3.75 0 0 1 7.5 0M4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.9 17.9 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632"/></svg>
        Signin</legend>
     <!-- <div class="text-lg border-b-1 py-3 font-bold mb-4 flex items-center justify-start gap-5">
        <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M18 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 1 1-6.75 0a3.375 3.375 0 0 1 6.75 0M3 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.3 12.3 0 0 1 9.374 21C7.043 21 4.862 20.355 3 19.234"/></svg>
        <h1 class="ml-[23%]">Login</h1>
     </div> -->
  
    <label for="email" class="label">Email</label>
    <input id="email" type="email" class="input" placeholder="Email" />
  
    <label for="password" class="label">Password</label>
    <input id="password" type="password" class="input" placeholder="Password" />
   <a href="/forgot-password" class="text-sm text-blue-500 hover:underline mt-2">Forgot password</a>
    <div class="flex items-center justify-between mt-2">
    <button class="btn btn-neutral mt-4">Login</button>
    <a href="/signup" class="btn btn-link mt-4">Sign Up</a>
</div>
  </fieldset>
</div>