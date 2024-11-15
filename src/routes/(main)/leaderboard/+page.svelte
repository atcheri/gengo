<script lang="ts">
	import FeedWrapper from '$lib/components/feed-wrapper.svelte';
	import Promo from '$lib/components/promo.svelte';
	import StickyWrapper from '$lib/components/sticky-wrapper.svelte';
	import UserProgress from '$lib/components/user-progress.svelte';
	import Avatar from '$lib/components/ui/avatar/avatar.svelte';
	import AvatarImage from '$lib/components/ui/avatar/avatar-image.svelte';
	import Separator from '$lib/components/ui/separator/separator.svelte';
	import type { PageData } from './$types.js';

	export let data: PageData;
	let { isPro, userProgress, leaderboard }: PageData = data;
</script>

<div class="flex flex-row-reverse gap-[48px] px-6">
	<StickyWrapper>
		<UserProgress
			activeCourse={userProgress.activeCourse}
			hearts={userProgress.hearts}
			points={userProgress.points}
			hasActiveSubscription={isPro}
		/>
		{#if isPro}
			<Promo />
		{/if}
		<!-- <Quests points={userProgress.points} /> -->
	</StickyWrapper>
	<FeedWrapper>
		<div class="flex w-full flex-col items-center">
			<img src="/images/star-medal.svg" alt="Leaderboard" height={90} width={90} />
			<h1 class="my-6 text-center text-2xl font-bold text-neutral-800">Leaderboard</h1>
			<p class="mb-6 text-center text-lg text-muted-foreground">
				See where you stand among other learners in the community.
			</p>
			<Separator class="mb-4 h-0.5 rounded-full" />
			{#each leaderboard as userProgress, index}
				<div class="flex w-full items-center rounded-xl p-2 px-4 hover:bg-gray-200/50">
					<p class="mr-4 font-bold text-lime-700">{index + 1}</p>
					<Avatar class="ml-3 mr-6 h-12 w-12 border bg-green-500">
						<AvatarImage class="object-cover" src={userProgress.userImageSrc} />
					</Avatar>
					<p class="flex-1 font-bold text-neutral-800">
						{userProgress.userName}
					</p>
					<p class="text-muted-foreground">
						{userProgress.points} XP
					</p>
				</div>
			{/each}
		</div>
	</FeedWrapper>
</div>
