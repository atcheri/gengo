<script lang="ts">
	import { quests } from '$lib/constants.js';
	import Button from './ui/button/button.svelte';
	import Progress from './ui/progress/progress.svelte';

	type Props = {
		points: number;
	};

	const { points }: Props = $props();
</script>

<div class="space-y-4 rounded-xl border-2 p-4">
	<div class="flex w-full items-center justify-between space-y-2">
		<h3 class="text-lg font-bold">Quests</h3>
		<a href="/quests">
			<Button size="sm" variant="primaryOutline">View all</Button>
		</a>
	</div>
	<ul class="w-full space-y-4">
		{#each quests as quest}
			{@const progress = (points / quest.value) * 100}

			<div class="flex w-full items-center gap-x-3 pb-4">
				<img src="/images/points.svg" alt="Points" />
				<div class="flex w-full flex-col gap-y-2">
					<p class="text-sm font-bold text-neutral-700">
						{quest.title}
					</p>
					<Progress value={progress} class="h-2" />
				</div>
			</div>
		{/each}
	</ul>
</div>
