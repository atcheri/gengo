<script lang="ts">
	import { sound } from 'svelte-sound';
	import { cn, playSound } from '$lib/utils.js';
	import type { PageData } from './$types.js';
	import { preventDefault } from 'svelte/legacy';

	type Props = {
		id: number;
		imageSrc: string | null;
		audioSrc: string | null;
		text: string;
		shortcut: string;
		selected?: boolean;
		onClick: (id: number) => void;
		disabled?: boolean;
		status?: 'correct' | 'wrong' | 'none';
		type: PageData['lesson']['challenges'][0]['type'];
	};

	const {
		id,
		imageSrc,
		audioSrc,
		text,
		shortcut,
		selected,
		onClick,
		status,
		disabled,
		type
	}: Props = $props();

	const handleKeyStroke = async (event: KeyboardEvent) => {
		event.preventDefault();
		if (![`Digit${shortcut}`].includes(event.code)) {
			return;
		}
		if (!audioSrc) {
			return;
		}

		await playSound(audioSrc);
		onClick(id);
	};
</script>

<svelte:body onkeydown={handleKeyStroke} />

<button
	use:sound={{ src: audioSrc, events: ['click'] }}
	onclick={() => onClick(id)}
	class={cn(
		'h-full cursor-pointer rounded-xl border-2 border-b-4 p-4 hover:bg-black/5 active:border-b-2 lg:p-6',
		selected && 'border-sky-300 bg-sky-100 hover:bg-sky-100',
		selected && status === 'correct' && 'border-green-300 bg-green-100 hover:bg-green-100',
		selected && status === 'wrong' && 'border-rose-300 bg-rose-100 hover:bg-rose-100',
		disabled && 'pointer-events-none hover:bg-white',
		type === 'ASSIST' && 'w-full lg:p-3'
	)}
>
	{#if imageSrc}
		<div class="mb-4 flex aspect-square max-h-[80px] w-full justify-center lg:max-h-[150px]">
			<img src={imageSrc} class="h-full" alt={text} />
		</div>
	{/if}
	<div class={cn('flex items-center justify-between', type === 'ASSIST' && 'flex-row-reverse')}>
		{#if type === 'ASSIST'}
			<div></div>
		{/if}
		<p
			class={cn(
				'text-sm text-neutral-600 lg:text-base',
				selected && 'text-sky-500',
				selected && status === 'correct' && 'text-green-500',
				selected && status === 'wrong' && 'text-rose-500'
			)}
		>
			{text}
		</p>
		<div
			class={cn(
				'flex h-[20px] w-[20px] items-center justify-center rounded-lg border-2 text-xs font-semibold text-neutral-400 lg:h-[30px] lg:w-[30px] lg:text-[15px]',
				selected && 'border-sky-300 text-sky-500',
				selected && status === 'correct' && 'border-green-500 text-green-500',
				selected && status === 'wrong' && 'border-rose-500 text-rose-500'
			)}
		>
			{shortcut}
		</div>
	</div>
</button>
