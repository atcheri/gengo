<script lang="ts">
	import FeedWrapper from '$lib/components/feed-wrapper.svelte';
	import Promo from '$lib/components/promo.svelte';
	import StickyWrapper from '$lib/components/sticky-wrapper.svelte';
	import UserProgress from '$lib/components/user-progress.svelte';
	import type { PageData } from './$types.js';
	import Progress from '$lib/components/ui/progress/progress.svelte';
	import { quests } from '$lib/constants.js';
	import Coins from '$lib/components/ui/icons/coins.svelte';

	export let data: PageData;
	let { isPro, userProgress }: PageData = data;
</script>

<div class="flex flex-row-reverse gap-[48px] px-6">
	<StickyWrapper>
		<UserProgress
			activeCourse={userProgress.activeCourse}
			hearts={userProgress.hearts}
			points={userProgress.points}
			hasActiveSubscription={isPro}
		/>
		{#if !isPro}
			<Promo />
		{/if}
	</StickyWrapper>
	<FeedWrapper>
		<div class="flex w-full flex-col items-center">
			<img src="/images/quests.svg" alt="Quests" height={90} width={90} />
			<h1 class="my-6 text-center text-2xl font-bold text-neutral-800">Quests</h1>
			<p class="mb-6 text-center text-lg text-muted-foreground">
				Complete quests by earning points.
			</p>
			<ul class="w-full">
				{#each quests as quest}
					{@const progress = (userProgress.points / quest.value) * 100}

					<div class="flex w-full items-center gap-x-4 border-t-2 p-4">
						<Coins className="size-9 text-orange-500" />
						<div class="flex w-full flex-col gap-y-2">
							<p class="text-xl font-bold text-neutral-700">
								{quest.title}
							</p>
							<Progress value={progress} class="h-3" />
						</div>
					</div>
				{/each}
			</ul>
		</div>
	</FeedWrapper>
</div>
