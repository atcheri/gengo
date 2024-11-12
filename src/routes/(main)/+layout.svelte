<script lang="ts">
	import MobileHeader from '$lib/components/mobile-header.svelte';
	import Sidebar from '$lib/components/sidebar.svelte';

	let { children } = $props();
</script>

<MobileHeader />
<Sidebar className="hidden lg:flex" />
<main class="h-screen pt-[50px] lg:pl-[256px] lg:pt-0">
	<div class="h-full bg-red-500">
		{@render children()}
	</div>
</main>
