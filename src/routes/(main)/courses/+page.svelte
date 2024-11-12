<script lang="ts">
	import type { PageData } from './$types.js';
	import CoursesList from './courses-list.svelte';

	export let data: PageData;
	const { activeCourseId, courses } = data;
</script>

<CoursesList {activeCourseId} {courses} />
