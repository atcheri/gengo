<script lang="ts">
	import type { Lesson, Unit } from '$lib/types.js';
	import LessonButton from './lesson-button.svelte';
	import UnitBanner from './unit-banner.svelte';

	type Props = {
		id: number;
		order: number;
		title: string;
		description: string;
		lessons: (Lesson & {
			completed: boolean;
		})[];
		activeLesson:
			| (Lesson & {
					unit: Unit;
			  })
			| undefined;
		activeLessonPercentage: number;
	};

	let { id, order, title, description, lessons, activeLesson, activeLessonPercentage }: Props =
		$props();
</script>

<UnitBanner {id} {title} {description} />
<div class="relative flex flex-col items-center">
	{#each lessons as lesson, index}
		{@const isCurrent = lesson.id === activeLesson?.id}
		{@const isLocked = !lesson.completed && !isCurrent}

		<LessonButton
			id={lesson.id}
			{index}
			totalCount={lessons.length - 1}
			current={isCurrent}
			locked={isLocked}
			percentage={activeLessonPercentage}
		/>
	{/each}
</div>
