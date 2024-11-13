<script lang="ts">
	import CircularProgress from '$lib/components/circular-progress.svelte';
	import Button from '$lib/components/ui/button/button.svelte';
	import { cn } from '$lib/utils.js';
	import Check from 'lucide-svelte/icons/check';
	import Crown from 'lucide-svelte/icons/crown';
	import Star from 'lucide-svelte/icons/star';

	type Props = {
		id: number;
		index: number;
		totalCount: number;
		locked?: boolean;
		current?: boolean;
		percentage: number;
	};

	let { id, index, totalCount, locked, current, percentage }: Props = $props();

	const cycleLength = 8;
	let cycleIndex = $derived(index % cycleLength);

	let indentationLevel = $derived.by(() => {
		if (cycleIndex <= 2) {
			return cycleIndex;
		} else if (cycleIndex <= 6) {
			return 4 - cycleIndex;
		} else {
			return cycleIndex - 8;
		}
	});

	let rightPosition = $derived(indentationLevel * 40);

	let isFirst = $state(index === 0);
	let isLast = $state(index === totalCount);
	let isCompleted = $state(!current && !locked);
	let href = $derived(!current && !locked ? `/lesson/${id}` : '/lesson');
	let Icon = $derived(!current && !locked ? Check : isLast ? Crown : Star);
</script>

<a
	{href}
	aria-disabled={locked}
	class:pointer-events-none={locked}
	class:pointer-events-auto={!locked}
>
	<div
		class={cn(
			'relative',
			isFirst ? 'mt-16' : 'mt-10',
			!!rightPosition && `right-[${rightPosition}px]`
		)}
	>
		{#if current}
			<div class="relative h-[102px] w-[102px]">
				<div
					class="absolute -top-6 left-2.5 z-10 animate-bounce rounded-xl border-2 bg-white px-3 py-2.5 font-bold uppercase tracking-wide text-green-500"
				>
					Start
					<div
						class="absolute -bottom-2 left-1/2 h-0 w-0 -translate-x-1/2 transform border-x-8 border-t-8 border-x-transparent"
					></div>
				</div>
				<CircularProgress max={100} value={Number.isNaN(percentage) ? 0 : percentage}>
					<Button
						size="rounded"
						variant={locked ? 'locked' : 'secondary'}
						class="relative left-4 top-5 h-[70px] w-[70px] border-b-8"
					>
						<Icon
							class={cn(
								'h-10 w-10',
								locked
									? 'fill-neutral-400 stroke-neutral-400 text-neutral-400'
									: 'text-primary-foreground',
								isCompleted && 'fill-none stroke-[4]'
							)}
						/>
					</Button>
				</CircularProgress>
			</div>
		{:else}
			<Button
				size="rounded"
				variant={locked ? 'locked' : 'secondary'}
				class="relative left-4 top-5 h-[70px] w-[70px] border-b-8"
			>
				<Icon
					class={cn(
						'h-10 w-10',
						locked
							? 'fill-neutral-400 stroke-neutral-400 text-neutral-400'
							: 'text-primary-foreground',
						isCompleted && 'fill-none stroke-[4]'
					)}
				/>
			</Button>
		{/if}
	</div>
</a>
