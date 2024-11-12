<script lang="ts">
	import type { getCourses } from '@db/queries.js';
	import Card from './card.svelte';
	import { goto } from '$app/navigation';

	type Props = {
		activeCourseId?: number;
		courses: Awaited<ReturnType<typeof getCourses>>;
	};

	let { activeCourseId, courses }: Props = $props();

	const onClick = (id: number) => {
		// if (pending) return;

		if (id === activeCourseId) {
			goto('/learn');
		}
	};
</script>

<div class="grid grid-cols-2 gap-4 pt-6 lg:grid-cols-[repeat(auto-fill,minmax(210px,1fr))]">
	{#each courses as course}
		<Card
			id={course.id}
			title={course.title}
			imageSrc={course.imageSrc}
			onclick={onClick}
			active={course.id === activeCourseId}
		/>
	{/each}
</div>
