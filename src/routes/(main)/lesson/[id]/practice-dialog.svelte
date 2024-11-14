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
	import { practiceDialogOpened } from './store.js';

	const close = () => {
		practiceDialogOpened.set(false);
	};
</script>

<Dialog.Root open={$practiceDialogOpened} onOpenChange={close}>
	<DialogContent>
		<DialogHeader>
			<div class="mb-5 flex w-full items-center justify-center">
				<img src="/images/heart.svg" class="size-20" alt="Mascot" />
			</div>
			<DialogTitle class="text-center text-2xl font-bold">Practice lesson</DialogTitle>
			<DialogDescription class="text-center text-base">
				Use practice lessons to regain hearts and points. You cannot loose hearts or points in
				practice lessons.
			</DialogDescription>
		</DialogHeader>
		<DialogFooter class="mb-4">
			<div class="flex w-full flex-col gap-y-4">
				<Button variant="primary" class="w-full" size="lg" onclick={close}>I got it!</Button>
			</div>
		</DialogFooter>
	</DialogContent>
</Dialog.Root>
