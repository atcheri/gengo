<script lang="ts">
	import Toaster from '$lib/components/ui/sonner/sonner.svelte';

	let { children } = $props();
</script>

<Toaster />
{@render children()}
