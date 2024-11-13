<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import NotebookText from 'lucide-svelte/icons/notebook-text';

	type Props = {
		title: string;
		description: string;
	};

	let { title, description } = $props();
</script>

<div class="flex w-full items-center justify-between rounded-xl bg-green-500 p-5 text-white">
	<div class="space-y-2.5">
		<h3 class="text-2xl font-bold">
			{title}
		</h3>
		<p class="text-lg">
			{description}
		</p>
	</div>
	<Button
		size="lg"
		variant="secondary"
		class="hidden border-2 border-b-4 active:border-b-2 xl:flex"
	>
		<a href="/lesson">
			<NotebookText class="mr-2" />
			Continue
		</a>
	</Button>
</div>
