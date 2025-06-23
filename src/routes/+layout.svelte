<script lang="ts">
	import '../app.css';

	let { children } = $props();
</script>

<nav class="navbar w-full bg-base-100 shadow-lg h-18 flex px-[5%] items-center justify-between">
	<a href="/" class=" w-16 h-16"><img src="/Amour_logo.png"    alt="logo"/></a>
	
	<a href="/login">Login</a>
</nav>


{@render children()}

<footer class="footer footer-center p-4 bg-base-200 text-base-content b-0">
	<div>
		<p>Copyright © 2023 Amour - All right reserved</p>
		<div class="grid grid-flow-col gap-4">
		<a href="/" class="">Home</a>
	<a href="/about">About</a>
	<a href="/contact">Contact</a>
</div>
	</div>
</footer>
