<script lang="ts">
	import type { PageData } from './$types.js';
	import Challenge from './challenge.svelte';
	import ExitDialog from './exit-dialog.svelte';
	import Header from './header.svelte';
	import QuestionBubble from './question-bubble.svelte';

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
	const activeIndex = $derived.by(() => {
		const uncompletedIndex = initialLessonChallenges.findIndex((challenge) => !challenge.completed);
		return uncompletedIndex === -1 ? 0 : uncompletedIndex;
	});
	const challenge = $derived(initialLessonChallenges[activeIndex]);
	const options = $derived(challenge.challengeOptions ?? []);
	const title = $derived.by(() => {
		return challenge.type === 'ASSIST' ? 'Select the correct meaning' : challenge.question;
	});
	const status = $state<'correct' | 'wrong' | 'none'>('none');
	let option = $state(0);
	let pending = $state(false);

	const onSelect = (id: number) => {
		if (status !== 'none') return;

		option = id;
	};
</script>

<Header {hearts} {percentage} hasActiveSubscription={!!userSubscription?.isActive} />
<ExitDialog />
<div class="flex-1">
	<div class="flex h-full items-center justify-center">
		<div class="flex w-full flex-col gap-y-12 px-6 lg:min-h-[350px] lg:w-[600px] lg:px-0">
			<h1 class="text-center text-lg font-bold text-neutral-700 lg:text-start lg:text-3xl">
				{title}
			</h1>
			{#if challenge.type === 'ASSIST'}
				<QuestionBubble question={challenge.question} />
			{/if}
			<Challenge
				{options}
				{onSelect}
				selectedOption={option}
				disabled={pending}
				{status}
				type={challenge.type}
			/>
		</div>
	</div>
</div>
