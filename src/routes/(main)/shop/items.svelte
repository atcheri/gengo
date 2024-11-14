<script lang="ts">
	import { invalidateAll } from '$app/navigation';
	import Button from '$lib/components/ui/button/button.svelte';
	import Coins from '$lib/components/ui/icons/coins.svelte';
	import InfinityIcon from '$lib/components/ui/icons/infinity-icon.svelte';
	import { MAX_HEARTS, POINTS_TO_REFILL } from '$lib/constants.js';
	import Heart from 'lucide-svelte/icons/heart';

	type Props = {
		hearts: number;
		points: number;
		hasActiveSubscription: boolean;
	};

	let { hearts, points, hasActiveSubscription }: Props = $props();
	let pending = $state(false);

	let hasMaxHearts = $derived(hearts === MAX_HEARTS);
	let refillDisabled = $derived(pending || hearts === MAX_HEARTS || points < POINTS_TO_REFILL);

	const onRefillHearts = async () => {
		const response = await fetch('/api/shop/refill-hearts', {
			method: 'POST'
		});
		await response.json();
		await invalidateAll();
	};

	const onUpgrade = () => {};
</script>

<ul class="w-full">
	<div class="flex w-full items-center gap-x-4 border-t-2 p-4">
		<Heart class="size-9 fill-red-600 text-red-500" />
		<div class="flex-1">
			<p class="text-base font-bold text-neutral-700 lg:text-xl">Refill hearts</p>
		</div>
		<Button onclick={onRefillHearts} disabled={refillDisabled}>
			{#if hasMaxHearts}
				full
			{:else}
				<div class="flex items-center gap-1">
					<Coins className="size-9 text-orange-500" />
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
