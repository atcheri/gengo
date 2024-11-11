<script lang="ts">
	import Footer from './footer.svelte';
	import Header from './header.svelte';

	let { children } = $props();
</script>

<div class="flex min-h-screen flex-col">
	<Header />
	<main class="flex flex-1 flex-col items-center justify-center">
		{@render children()}
	</main>
	<Footer />
</div>
