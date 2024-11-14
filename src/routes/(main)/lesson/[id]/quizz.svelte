<script lang="ts">
	import { goto } from '$app/navigation';
	import { playSound } from '$lib/utils.js';
	import type { PageData } from './$types.js';
	import Challenge from './challenge.svelte';
	import ExitDialog from './exit-dialog.svelte';
	import Footer from './footer.svelte';
	import Header from './header.svelte';
	import QuestionBubble from './question-bubble.svelte';
	import QuizzFinished from './quizz-finished.svelte';

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
	let percentage = $state(initialPercentage === 100 ? 0 : initialPercentage);
	const uncompletedIndex = initialLessonChallenges.findIndex((challenge) => !challenge.completed);
	let activeIndex = $state(uncompletedIndex === -1 ? 0 : uncompletedIndex);
	const challenge = $derived(initialLessonChallenges[activeIndex]);
	const options = $derived(challenge.challengeOptions ?? []);
	const title = $derived.by(() => {
		return challenge.type === 'ASSIST' ? 'Select the correct meaning' : challenge.question;
	});
	let status = $state<'correct' | 'wrong' | 'none'>('none');
	let selectedOption = $state(0);
	let pending = $state(false);

	const onSelect = (id: number) => {
		if (status !== 'none') return;

		selectedOption = id;
	};

	const onNext = () => {
		activeIndex++;
	};

	const onContinue = async () => {
		if (!selectedOption) return;

		if (status === 'wrong') {
			status = 'none';
			selectedOption = 0;
			return;
		}

		if (status === 'correct') {
			status = 'none';
			selectedOption = 0;
			onNext();
			return;
		}

		const correctOption = options.find((option) => option.correct);

		if (!correctOption) {
			return;
		}

		if (correctOption.id === selectedOption) {
			await fetch('/api/lesson/update-challenge-progress', {
				method: 'POST',
				body: JSON.stringify({ challengeId: challenge.id })
			})
				.then(async (response) => {
					if (!response.ok) {
						const { message } = await response.json();
						throw message;
					}
					await playSound('/sounds/correct.wav');
					status = 'correct';
					percentage = percentage + 100 / initialLessonChallenges.length;
					if (initialPercentage === 100) {
						hearts = Math.min(hearts + 1, 5);
					}
				})
				.catch((error) => {
					if (error === 'hearts') {
						// openHeartsModal();
						console.error('something went wrong with the hearts');
						return;
					}
					// toast.error('Something went wrong. Please try again.')
				});
		} else {
			await fetch('/api/lesson/reduce-hearts', {
				method: 'POST',
				body: JSON.stringify({ challengeId: challenge.id })
			})
				.then(async (response) => {
					console.log('response:', response);
					if (!response.ok) {
						const { message } = await response.json();
						throw message;
					}
					await playSound('/sounds/incorrect.wav');
					status = 'wrong';
					percentage = percentage + 100 / initialLessonChallenges.length;
					if (initialPercentage === 100) {
						hearts = Math.max(hearts - 1, 0);
					}
				})
				.catch((error) => {
					if (error === 'hearts') {
						// openHeartsModal();
						console.error('something went wrong with the hearts');
						return;
					} else if (error === 'practice') {
						console.log("nothing to do, it's just practice");
					}
					// toast.error('Something went wrong. Please try again.')
				});
		}
	};
</script>

{#if !challenge}
	<QuizzFinished challenges={initialLessonChallenges} {hearts} lessonId={initialLessonId} />
{:else}
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
					{selectedOption}
					disabled={pending}
					{status}
					type={challenge.type}
				/>
			</div>
		</div>
	</div>
	<Footer disabled={pending || !selectedOption} {status} onCheck={onContinue} />
{/if}
