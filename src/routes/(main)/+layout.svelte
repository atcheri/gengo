<script lang="ts">
	import MobileHeader from '$lib/components/mobile-header.svelte';
	import Sidebar from '$lib/components/sidebar.svelte';

	let { children } = $props();
</script>

<MobileHeader />
<Sidebar className="hidden lg:flex" />
<main class="h-screen pt-[50px] lg:pl-[256px] lg:pt-0">
	<div class="mx-auto h-full max-w-[1056px] pt-6">
		{@render children()}
	</div>
</main>
