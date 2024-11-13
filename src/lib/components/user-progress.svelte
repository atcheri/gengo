<script lang="ts">
	import Button from './ui/button/button.svelte';
	import { HeartSolid } from 'flowbite-svelte-icons';
	import InfinityIcon from './ui/icons/infinity-icon.svelte';
	import Coins from './ui/icons/coins.svelte';

	type Props = {
		activeCourse: { id: number; title: string; imageSrc: string };
		hearts: number | undefined;
		points: number | undefined;
		hasActiveSubscription: boolean;
	};

	let { activeCourse, hearts, points, hasActiveSubscription }: Props = $props();
</script>

<div class="flex w-full items-center justify-between gap-x-2">
	<Button variant="ghost">
		<a href="/courses">
			<img
				src={activeCourse.imageSrc}
				alt={activeCourse.title}
				class="rounded-md border"
				width={32}
				height={32}
			/>
		</a>
	</Button>
	<Button variant="ghost" class="text-orange-500">
		<a href="/shop">
			<Coins className="size-6" />
			{points}
		</a>
	</Button>
	<Button variant="ghost" class="text-rose-500">
		<a href="/shop">
			<HeartSolid class="size-6" />
			{#if hasActiveSubscription}
				<InfinityIcon />
			{:else}
				{hearts}
			{/if}
		</a>
	</Button>
</div>
