<script lang="ts">
	import { cn } from '$lib/utils.js';
	import type { PageData } from './$types.js';
	import Card from './card.svelte';

	type Props = {
		options: PageData['lesson']['challenges'][0]['challengeOptions'];
		onSelect: (id: number) => void;
		status: 'correct' | 'wrong' | 'none';
		selectedOption?: number;
		disabled?: boolean;
		type: PageData['lesson']['challenges'][0]['type'];
	};

	const { options, onSelect, status, selectedOption, disabled, type }: Props = $props();
	const handleKeyStroke = (event: KeyboardEvent) => {
		if ('Enter' !== event.code) {
			return;
		}

		console.log('shoudl validate here');
	};
</script>

<svelte:body onkeydown={handleKeyStroke} />

<div
	class={cn(
		'grid gap-2',
		type === 'ASSIST' && 'grid-cols-1',
		type === 'SELECT' && 'grid-cols-2 lg:grid-cols-[repeat(auto-fit,minmax(0,1fr))]'
	)}
>
	{#each options as option, i}
		<Card
			id={option.id}
			text={option.text}
			imageSrc={option.imageSrc}
			shortcut={`${i + 1}`}
			selected={selectedOption === option.id}
			onClick={(id: number) => onSelect(id)}
			{status}
			audioSrc={option.audioSrc}
			{disabled}
			{type}
		/>
	{/each}
</div>
