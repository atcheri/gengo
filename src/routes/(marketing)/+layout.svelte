<script lang="ts">
	import Footer from './footer.svelte';
	import Header from './header.svelte';

	let { children } = $props();
</script>

<!-- <div class="flex min-h-screen flex-col bg-gray-900 text-slate-100"> -->
<div class="flex min-h-screen flex-col text-slate-100">
	<Header />
	<main class="flex flex-1 flex-col items-center justify-center">
		{@render children()}
	</main>
	<Footer />
</div>
