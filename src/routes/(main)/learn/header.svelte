<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import { ArrowLeftOutline } from 'flowbite-svelte-icons';
	export let title: string;
</script>

<div
	class="sticky top-0 mb-5 flex items-center justify-between border-b-2 pb-3 text-neutral-400 dark:text-slate-200 lg:z-50 lg:mt-[-28px] lg:pt-[28px]"
>
	<a href="/courses">
		<Button variant="ghost" size="sm">
			<ArrowLeftOutline class="h-5 w-5 stroke-2 text-neutral-400 dark:text-slate-200" />
		</Button>
	</a>
	<h1 class="text-lg font-bold">
		{title}
	</h1>
</div>
