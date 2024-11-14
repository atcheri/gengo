<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import InfinityIcon from '$lib/components/ui/icons/infinity-icon.svelte';
	import Heart from 'lucide-svelte/icons/heart';

	type Props = {
		hearts: number;
		points: number;
		hasActiveSubscription: boolean;
	};

	const { hearts, points, hasActiveSubscription }: Props = $props();
	let pending = $state(false);

	const POINTS_TO_REFILL = 50;

	const onRefillHearts = () => {};

	const onUpgrade = () => {};
</script>

<ul class="w-full">
	<div class="flex w-full items-center gap-x-4 border-t-2 p-4">
		<Heart class="size-9 fill-red-600 text-red-500" />
		<div class="flex-1">
			<p class="text-base font-bold text-neutral-700 lg:text-xl">Refill hearts</p>
		</div>
		<Button
			onclick={onRefillHearts}
			disabled={pending || hearts === 5 || points < POINTS_TO_REFILL}
		>
			{#if hearts === 5}
				full
			{:else}
				<div class="flex items-center">
					<img src="/points.svg" alt="Points" height={20} width={20} />
					<p>{POINTS_TO_REFILL}</p>
				</div>
			{/if}
		</Button>
	</div>
	<div class="flex w-full items-center gap-x-4 border-t-2 p-4 pt-8">
		<InfinityIcon className="size-9" />
		<div class="flex-1">
			<p class="text-base font-bold text-neutral-700 lg:text-xl">Unlimited hearts</p>
		</div>
		<Button onclick={onUpgrade} disabled={pending}>
			{hasActiveSubscription ? 'settings' : 'upgrade'}
		</Button>
	</div>
</ul>
