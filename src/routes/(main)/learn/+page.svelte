<script>
	import FeedWrapper from '$lib/components/feed-wrapper.svelte';
	import StickyWrapper from '$lib/components/sticky-wrapper.svelte';
	import UserProgress from '$lib/components/user-progress.svelte';
	import Header from './header.svelte';

	let activeCourse = $state({ title: 'Japanese', imageSrc: '/images/icons/jp.svg' });
</script>

<div class="flex flex-row-reverse gap-[48px] px-6">
	<StickyWrapper>
		<UserProgress {activeCourse} hearts={5} points={85} hasActiveSubscription={false} />
	</StickyWrapper>
	<FeedWrapper>
		<Header title={activeCourse.title} />
		<div class="space-y-4"></div>
	</FeedWrapper>
</div>
