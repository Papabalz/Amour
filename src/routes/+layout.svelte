<script lang="ts">
	import '../app.css';
import type { User } from '$lib/server/db/schema';
import { page } from '$app/state';
import { locales, localizeHref} from '$lib/paraglide/runtime';

interface LayoutData {
	user: Omit<User, 'password'> | null;
}

	let { children, data } = $props() as { children: any; data: LayoutData };

	 const languageNames = {
    en: 'English',
    es: 'Español',
  };


//  export const prerender = true

</script>

<nav class="navbar w-full bg-base-100 shadow-lg h-18 flex px-[5%] items-center justify-between">
	<div class="navbar-start md:hidden">
		<div class="dropdown">
		  <div tabindex="0" role="button" class="btn btn-ghost btn-circle">
			<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h7" /> </svg>
		  </div>
		  <ul
			class="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 gap-2 w-36 p-2 shadow">
			<li><a href="/" class="md:hidden"><img src="/logo_no_bg.png"  class="w-10"  alt="logo"/></a></li>
			<li><a href="/">Homepage</a></li>
			
			{#if data?.user}
			<li><a href="/profile">Profile</a></li>
				<li><a href="/booking">Booking</a></li>
				<form method="POST" action="/logout">
				<button type="submit" class="btn btn-neutral btn-sm">Logout</button>
			</form>
			{/if}
			
		  </ul>
		</div>
	  </div>
	<a href="/" class="max-md:hidden"><img src="/logo_no_bg.png"  class="w-16"  alt="logo"/></a>

	<div class="flex">
	{#if data?.user}
		<div class="flex items-center gap-4 max-md:hidden">
			<a href="/profile" class="btn btn-neutral">Profile</a>
			<form method="POST" action="/logout">
				<button type="submit" class="btn btn-neutral">Logout</button>
			</form>
		</div>
	{:else}
		<div class="flex items-center gap-4">
			<a href="/login">Login</a>
		</div>
	{/if}
	<div class="flex-none">
	
	<div class="dropdown dropdown-end">
  <button  class="btn btn-ghost gap-1 ml-2">
    <span class="uppercase">
		
		{page.url.pathname.split('/')[1] === "es"  ? 'es' : page.url.pathname.split('/')[1] === 'es' ? 'es' : 'en'}
		
	</span>
  </button>
  <ul  class="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-30">
  <li>{#each locales as locale}
		<a  class="btn btn-link style-none no-underline hover:underline-none text-black text-sm"  href={localizeHref(page.url.pathname,  {locale})} >{languageNames[locale]}</a>
		{/each}</li>
  </ul>
</div>
</div>
</div>
</nav>

<main class="flex-grow flex flex-col">
    {@render children()}
</main>

<!-- {@render children()} -->

<footer class="footer footer-center p-4 bg-base-200 text-base-content b-0">
	<div>
		
		<p>Copyright © 2023 Amour - All right reserved</p>
		<div class="grid grid-flow-col gap-4">
		<a href="/" class="">Home</a>
	<a href="/about">About</a>
	<a href="/contact">Contact</a>
	<a href="/privacy">Privacy Policy</a>
	<a href="/terms">Terms & Conditions</a>
</div>
	</div>
</footer>
