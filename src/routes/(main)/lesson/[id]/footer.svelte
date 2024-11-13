<script lang="ts">
	import { createMediaStore } from 'svelte-media-queries';
	import XCircle from 'lucide-svelte/icons/circle-x';
	import CheckCircle from 'lucide-svelte/icons/circle-check';
	import Button from '$lib/components/ui/button/button.svelte';
	import { cn } from '$lib/utils.js';
	type Props = {
		onCheck: () => void;
		status: 'correct' | 'wrong' | 'none' | 'completed';
		disabled?: boolean;
		lessonId?: number;
	};

	const { onCheck, status, disabled, lessonId }: Props = $props();
	const buttonText = $derived.by(() => {
		return { none: 'Check', correct: 'Next', wrong: 'Retry', completed: 'Continue' }[status];
	});

	const query = '(max-width: 480px)';
	const isMobile = createMediaStore(query);
</script>

<footer
	class={cn(
		'lg:-h[140px] h-[100px] border-t-2',
		status === 'correct' && 'border-transparent bg-green-100',
		status === 'wrong' && 'border-transparent bg-rose-100'
	)}
>
	<div class="mx-auto flex h-full max-w-[1140px] items-center justify-between px-6 lg:px-10">
		{#if status === 'correct'}
			<div class="flex items-center text-base font-bold text-green-500 lg:text-2xl">
				<CheckCircle class="mr-4 h-6 w-6 lg:h-10 lg:w-10" />
				Nicely done!
			</div>
		{:else if status === 'wrong'}
			<div class="flex items-center text-base font-bold text-rose-500 lg:text-2xl">
				<XCircle class="mr-4 h-6 w-6 lg:h-10 lg:w-10" />
				Try again.
			</div>
		{:else if status === 'completed'}
			<Button
				variant="default"
				size={$isMobile ? 'sm' : 'lg'}
				onclick={() => (window.location.href = `/lesson/${lessonId}`)}
			>
				Practice again
			</Button>
		{/if}
		<Button
			{disabled}
			class="ml-auto"
			onclick={onCheck}
			size={$isMobile ? 'sm' : 'lg'}
			variant={status === 'wrong' ? 'danger' : 'secondary'}>{buttonText}</Button
		>
	</div>
</footer>
