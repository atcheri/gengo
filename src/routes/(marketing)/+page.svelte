<script lang="ts">
	import { page } from '$app/stores';
	import Button from '$lib/components/ui/button/button.svelte';
	import { signIn } from '@auth/sveltekit/client';
</script>

<main
	class="mx-auto flex w-full max-w-[988px] flex-1 flex-col items-center justify-center gap-2 p-4 lg:flex-row"
>
	<div class="relative mb-8 h-[240px] w-[240px] lg:mb-0 lg:h-[424px] lg:w-[424px]">
		<img src="/images/hero.svg" alt="Hero" />
	</div>
	<div class="flex flex-col items-center gap-y-8">
		<h1 class="max-w-[480px] text-center text-xl font-bold text-neutral-600 lg:text-3xl">
			Learn and practice new languages with <span class="italic text-green-600"> Gengo</span> !
		</h1>
		<div class="flex w-full max-w-[330px] flex-col items-center gap-y-3">
			{#if $page.data.session}
				<Button size="lg" variant="secondary" class="w-full capitalize">
					<a href="/learn">Continue Learning</a>
				</Button>
			{:else}
				<Button
					size="lg"
					variant="secondary"
					onclick={() => signIn('github')}
					class="w-full capitalize">Get started</Button
				>
				<Button
					size="lg"
					variant="primaryOutline"
					onclick={() => signIn('github')}
					class="w-full capitalize">I already have an account</Button
				>
			{/if}
		</div>
	</div>
</main>
