<script>
	import { page } from '$app/stores';
	import { signIn, signOut } from '@auth/sveltekit/client';
	import Button from '$lib/components/ui/button/button.svelte';
</script>

<header class="h-20 w-full border-b-2 border-slate-200 px-4">
	<div class="mx-auto flex h-full items-center justify-between lg:max-w-screen-lg">
		<div class="flex items-center gap-x-3 pb-7 pl-4 pt-8">
			<img src="/images/gopher-student- 1300x1392.png" class="size-12" alt="Gengo app logo" />
			<!-- <img src="https://postimg.cc/Mnw4ypCr" class="size-12" alt="Gengo app logo" /> -->
			<h1 class="text-2xl font-extrabold tracking-wide text-green-600">Gengo</h1>
		</div>
		{#if $page.data.session}
			{#if $page.data.session.user?.image}
				<img src={$page.data.session.user.image} class="size-10" alt="User Avatar" />
			{:else}
				<span class="signedInText">
					<strong>{$page.data.session.user?.name ?? 'User'}</strong>
				</span>
			{/if}
			<Button variant="ghost" onclick={() => signOut()}>Sign out</Button>
		{:else}
			<Button variant="ghost" onclick={() => signIn('github')}>Sign in</Button>
		{/if}
	</div>
</header>
