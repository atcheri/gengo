<script lang="ts">
	import { cn } from '$lib/utils.js';
	import Check from 'lucide-svelte/icons/check';

	type Props = {
		active?: boolean;
		disabled?: boolean;
		id: number;
		imageSrc: string;
		onclick: (id: number) => void;
		title: string;
	};

	let { active, disabled, id, imageSrc, title, onclick }: Props = $props();
</script>

<button
	class={cn(
		'flex h-full min-h-[217px] min-w-[200px] cursor-pointer flex-col items-center justify-between rounded-xl border-2 border-b-4 p-3 pb-6 hover:bg-black/5 active:border-b-2',
		disabled && 'pointer-events-none opacity-50'
	)}
	onclick={() => onclick(id)}
>
	<div class="min-[24px] flex w-full items-center justify-end">
		{#if active}
			<div class="flex items-center justify-center rounded-md bg-green-600 p-1.5">
				<Check class="h-4 w-4 stroke-[4] text-white" />
			</div>
		{/if}
	</div>
	<img
		src={imageSrc}
		alt={title}
		height={70}
		width={93.33}
		class="rounded-lg border object-cover drop-shadow-md"
	/>
	<p class="mt-3 text-center font-bold text-neutral-700">
		{title}
	</p>
</button>
