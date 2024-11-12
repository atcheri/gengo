<script lang="ts">
	import Card from './card.svelte';
	import { goto } from '$app/navigation';

	type Props = {
		activeCourseId: number | null;
		courses: { id: number; title: string; imageSrc: string }[];
	};

	let { activeCourseId, courses }: Props = $props();
	let pending = $state(false);

	const onClick = async (id: number) => {
		if (pending) return;

		pending = true;

		if (id === activeCourseId) {
			goto('/learn');
			return;
		}

		await fetch('api/courses', {
			method: 'POST',
			body: JSON.stringify({ courseId: id })
		});
		pending = false;
		activeCourseId = id;
	};
</script>

<div class="grid grid-cols-2 gap-4 pt-6 lg:grid-cols-[repeat(auto-fill,minmax(210px,1fr))]">
	{#each courses as course}
		<Card
			id={course.id}
			title={course.title}
			imageSrc={course.imageSrc}
			onclick={onClick}
			active={!!activeCourseId && course.id === activeCourseId}
		/>
	{/each}
</div>
