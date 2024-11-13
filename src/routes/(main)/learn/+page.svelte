<script lang="ts">
	import FeedWrapper from '$lib/components/feed-wrapper.svelte';
	import StickyWrapper from '$lib/components/sticky-wrapper.svelte';
	import UserProgress from '$lib/components/user-progress.svelte';
	import type { PageData } from './$types.js';
	import Header from './header.svelte';

	export let data: PageData;
	let { activeCourse, hearts, points, units } = data;
</script>

{#if activeCourse}
	<div class="flex flex-row-reverse gap-[48px] px-6">
		<StickyWrapper>
			<UserProgress {activeCourse} {hearts} {points} hasActiveSubscription={false} />
		</StickyWrapper>
		<FeedWrapper>
			<Header title={activeCourse.title} />
			{#each units as unit}
				{JSON.stringify(unit)}
			{/each}
		</FeedWrapper>
	</div>
{/if}
