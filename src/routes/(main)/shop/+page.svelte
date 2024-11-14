<script lang="ts">
	import { invalidateAll } from '$app/navigation';
	import FeedWrapper from '$lib/components/feed-wrapper.svelte';
	import Promo from '$lib/components/promo.svelte';
	import StickyWrapper from '$lib/components/sticky-wrapper.svelte';
	import UserProgress from '$lib/components/user-progress.svelte';
	import type { PageData } from './$types.js';
	import Items from './items.svelte';

	export let data: PageData;
</script>

<div class="flex flex-row-reverse gap-[48px] px-6">
	<StickyWrapper>
		<UserProgress
			activeCourse={data.userProgress.activeCourse}
			hearts={data.userProgress.hearts}
			points={data.userProgress.points}
			hasActiveSubscription={data.isPro}
		/>
		{#if data.isPro}
			<Promo />
		{/if}
		<!-- <Quests points={userProgress.points} /> -->
	</StickyWrapper>
	<FeedWrapper>
		<div class="flex w-full flex-col items-center">
			<img src="/images/shop.svg" alt="Shop" />
			<h1 class="my-6 text-center text-2xl font-bold text-neutral-800">Shop</h1>
			<p class="mb-6 text-center text-lg text-muted-foreground">Spend your points on cool stuff.</p>
			<Items
				hearts={data.userProgress.hearts}
				points={data.userProgress.points}
				hasActiveSubscription={data.isPro}
			/>
		</div>
	</FeedWrapper>
</div>
