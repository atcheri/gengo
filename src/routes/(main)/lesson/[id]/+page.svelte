<script lang="ts">
	import type { PageData } from './$types.js';
	import Quizz from './quizz.svelte';

	export let data: PageData;
	const { lesson, userProgress, initialPercentage, userSubscription } = data;
</script>

<Quizz
	initialLessonId={lesson.id}
	initialLessonChallenges={lesson.challenges}
	initialHearts={userProgress.hearts}
	{initialPercentage}
	{userSubscription}
/>
