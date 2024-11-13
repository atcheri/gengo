<script lang="ts">
	import type { PageData } from './$types.js';
	import ExitDialog from './exit-dialog.svelte';
	import Header from './header.svelte';

	type Props = {
		initialPercentage: number;
		initialHearts: number;
		initialLessonId: number;
		initialLessonChallenges: PageData['lesson']['challenges'];
		userSubscription: any;
	};

	const {
		initialHearts,
		initialLessonChallenges,
		initialPercentage,
		initialLessonId,
		userSubscription
	}: Props = $props();
	let hearts = $state(initialHearts);
	let percentage = $derived.by(() => (initialPercentage === 100 ? 0 : initialPercentage));
</script>

<Header {hearts} {percentage} hasActiveSubscription={!!userSubscription?.isActive} />
<ExitDialog />
