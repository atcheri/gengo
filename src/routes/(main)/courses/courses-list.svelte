<script lang="ts">
	import { courses as coursesSchema, userProgress as userProgressSchema } from '$lib/db/schema.js';
	import Card from './card.svelte';
	import { goto } from '$app/navigation';

	type Props = {
		activeCourseId: typeof userProgressSchema.$inferSelect.activeCourseId;
		courses: (typeof coursesSchema.$inferSelect)[];
	};

	let { activeCourseId, courses }: Props = $props();
	let pending = $state(false);

	const onClick = (id: number) => {
		if (pending) return;

		pending = true;

		// TODO: execute the side effect here

		if (id === activeCourseId) {
			pending = false;
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
