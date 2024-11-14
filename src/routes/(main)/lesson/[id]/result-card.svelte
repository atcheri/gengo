<script lang="ts">
	import { cn } from '$lib/utils.js';

	type Props = {
		value: number;
		variant: 'points' | 'hearts';
	};

	const { variant, value }: Props = $props();

	const imageSrc = variant === 'hearts' ? '/images/heart.svg' : '/images/points.svg';
</script>

<div
	class={cn(
		'w-full rounded-2xl border-2',
		variant === 'points' && 'border-orange-400 bg-orange-400',
		variant === 'hearts' && 'border-rose-500 bg-rose-500'
	)}
>
	<div
		class={cn(
			'rounded-t-xl p-1.5 text-center text-xs font-bold uppercase text-white',
			variant === 'hearts' && 'bg-rose-500',
			variant === 'points' && 'bg-orange-400'
		)}
	>
		{variant === 'hearts' ? 'Hearts Left' : 'Total XP'}
	</div>
	<div
		class={cn(
			'flex items-center justify-center rounded-2xl bg-white p-6 text-lg font-bold',
			variant === 'hearts' && 'text-rose-500',
			variant === 'points' && 'text-orange-400'
		)}
	>
		<img alt="Icon" src={imageSrc} class="mr-1.5" />
		{value}
	</div>
</div>
