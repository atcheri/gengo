<script lang="ts">
	import InfinityIcon from '$lib/components/ui/icons/infinity-icon.svelte';
	import Progress from '$lib/components/ui/progress/progress.svelte';
	import { HeartSolid } from 'flowbite-svelte-icons';
	import X from 'lucide-svelte/icons/x';

	type Props = {
		hearts: number;
		percentage: number;
		hasActiveSubscription: boolean;
	};

	const { hasActiveSubscription, hearts, percentage }: Props = $props();

	const open = () => {};
</script>

<header
	class="mx-auto flex w-full max-w-[1140px] items-center justify-between gap-x-7 px-10 pt-[20px] lg:pt-[50px]"
>
	<X onclick={open} class="cursor-pointer text-slate-500 transition hover:opacity-75" />
	<Progress value={percentage} />
	<div class="flex items-center font-bold text-rose-500">
		<HeartSolid class="size-6" />
		{#if hasActiveSubscription}
			<InfinityIcon className="h-6 w-6 shrink-0 stroke-[3]" />
		{:else}
			{hearts}
		{/if}
	</div>
</header>
