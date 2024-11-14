<script lang="ts">
	import FeedWrapper from '$lib/components/feed-wrapper.svelte';
	import StickyWrapper from '$lib/components/sticky-wrapper.svelte';
	import type { PageData } from './$types.js';
	import Items from './items.svelte';

	export let data: PageData;
	const { userProgress, isPro } = data;
	// let isPro = $state(false);
</script>

<div class="flex flex-row-reverse gap-[48px] px-6">
	<StickyWrapper>
		<!-- <UserProgress
          activeCourse={userProgress.activeCourse}
          hearts={userProgress.hearts}
          points={userProgress.points}
          hasActiveSubscription={isPro}
        />
        {!isPro && (
          <Promo />
        )} -->
		<!-- <Quests points={userProgress.points} /> -->
	</StickyWrapper>
	<FeedWrapper>
		<div class="flex w-full flex-col items-center">
			<img src="/images/shop.svg" alt="Shop" />
			<h1 class="my-6 text-center text-2xl font-bold text-neutral-800">Shop</h1>
			<p class="mb-6 text-center text-lg text-muted-foreground">Spend your points on cool stuff.</p>
			<Items
				hearts={userProgress.hearts}
				points={userProgress.points}
				hasActiveSubscription={isPro}
			/>
		</div>
	</FeedWrapper>
</div>
