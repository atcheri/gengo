<script lang="ts">
	import { goto } from '$app/navigation';
	import Footer from './footer.svelte';
	import { playSound } from '$lib/utils.js';
	import { FallingConfetti } from 'svelte-canvas-confetti';
	import ResultCard from './result-card.svelte';
	import type { PageData } from './$types.js';

	type Props = {
		challenges: PageData['lesson']['challenges'];
		hearts: number;
		lessonId: number;
	};

	const { challenges, hearts, lessonId }: Props = $props();

	playSound('/sounds/finish.mp3', 100);
</script>

<FallingConfetti />
<div
	class="mx-auto flex h-full max-w-lg flex-col items-center justify-center gap-y-4 text-center lg:gap-y-8"
>
	<img src="/images/finish.svg" alt="Finish" class="block size-32" />
	<h1 class="text-xl font-bold text-neutral-700 lg:text-3xl">
		Congratulations! <br /> You&apos;ve completed the lesson.
	</h1>
	<div class="flex w-full items-center gap-x-4">
		<ResultCard variant="points" value={challenges.length * 10} />
		<ResultCard variant="hearts" value={hearts} />
	</div>
</div>
<Footer {lessonId} status="completed" onCheck={() => goto('/learn')} />
