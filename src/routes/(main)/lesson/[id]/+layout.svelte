<script lang="ts">
	// import { setContext } from 'svelte';
	// import { writable } from 'svelte/store';

	let { children } = $props();

	// const exitDialogOpened = writable(false);
	// setContext('exitDialogOpened', exitDialogOpened);
</script>

<div class="flex h-full flex-col">
	<div class="flex h-full w-full flex-col">
		{@render children()}
	</div>
</div>
