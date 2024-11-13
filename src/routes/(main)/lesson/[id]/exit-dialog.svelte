<script lang="ts">
	import DialogContent from '$lib/components/ui/dialog/dialog-content.svelte';
	import DialogDescription from '$lib/components/ui/dialog/dialog-description.svelte';
	import DialogHeader from '$lib/components/ui/dialog/dialog-header.svelte';
	import DialogTitle from '$lib/components/ui/dialog/dialog-title.svelte';
	// @ts-ignore
	import * as Dialog from '$lib/components/ui/dialog';
	import DialogFooter from '$lib/components/ui/dialog/dialog-footer.svelte';
	import Button from '$lib/components/ui/button/button.svelte';
	import { goto } from '$app/navigation';
	import { exitDialogOpened } from './store.js';

	const close = () => {
		exitDialogOpened.set(false);
	};
</script>

<Dialog.Root open={$exitDialogOpened} onOpenChange={close}>
	<DialogContent>
		<DialogHeader>
			<div class="mb-5 flex w-full items-center justify-center">
				<img src="/images/mascot_sad.svg" alt="Mascot" />
			</div>
			<DialogTitle class="text-center text-2xl font-bold">Wait, don&apos;t go!</DialogTitle>
			<DialogDescription class="text-center text-base">
				You&apos;re about to leave the lesson. Are you sure?
			</DialogDescription>
		</DialogHeader>
		<DialogFooter class="mb-4">
			<div class="flex w-full flex-col gap-y-4">
				<Button variant="primary" class="w-full" size="lg" onclick={close}>Keep learning</Button>
				<Button
					variant="dangerOutline"
					class="w-full"
					size="lg"
					onclick={() => {
						close();
						goto('/learn');
					}}
				>
					End session
				</Button>
			</div>
		</DialogFooter>
	</DialogContent>
</Dialog.Root>
