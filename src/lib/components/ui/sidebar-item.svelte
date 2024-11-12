<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import { type Props as ButtonProps } from '$lib/components/ui/button/index.js';
	import { page } from '$app/stores';

	let { label, href = '' } = $props();
	let variant: ButtonProps['variant'] = $page.url.pathname.includes(href)
		? 'sidebarOutline'
		: 'sidebar';
</script>

<Button {variant} class="h-[52px] justify-start">
	<a {href}>{label}</a>
</Button>
