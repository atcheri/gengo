<script lang="ts">
	import { cn } from '$lib/utils.js';
	import ModeToggler from './mode-toggler.svelte';
	import SidebarItem from './ui/sidebar-item.svelte';

	let { className = '' } = $props();
</script>

<div class={cn('left-0 top-0  h-full flex-col border-r-2 px-4 lg:fixed lg:w-[256px]', className)}>
	<a href="/" class="flex items-center gap-x-3 pb-7 pl-4 pt-8">
		<img src="/images/gopher-student- 1300x1392.png" class="size-12" alt="Gengo app logo" />
		<h1 class="text-2xl font-extrabold tracking-wide text-green-600">Gengo</h1>
	</a>
	<div class="flex flex-1 flex-col gap-y-2">
		<SidebarItem href="/learn" label="Learn" />
		<SidebarItem href="/leaderboard" label="Leaderboard" />
		<SidebarItem href="/quests" label="Quests" />
		<SidebarItem href="/shop" label="Shop" />
		<ModeToggler class="self-center" />
	</div>
</div>
