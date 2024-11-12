<script>
	import { BarsOutline } from 'flowbite-svelte-icons';
	import Sidebar from './sidebar.svelte';
	// @ts-ignore
	import * as Sheet from '$lib/components/ui/sheet';
</script>

<Sheet.Root>
	<Sheet.Trigger><BarsOutline class="text-white" /></Sheet.Trigger>
	<Sheet.Content class="z-[100] p-0" side="left">
		<Sidebar />
		<Sheet.Header>
			<Sheet.Title>
				<!-- <div class="flex items-center gap-x-3 pb-7 pl-4 pt-8"> -->
				<img src="/images/gopher-student- 1300x1392.png" class="size-12" alt="Gengo app logo" />
				<!-- <img src="https://postimg.cc/Mnw4ypCr" class="size-12" alt="Gengo app logo" /> -->
				<h1 class="text-2xl font-extrabold tracking-wide text-green-600">Gengo</h1>
				<!-- </div> -->
			</Sheet.Title>
			<Sheet.Description>
				This action cannot be undone. This will permanently delete your account and remove your data
				from our servers.
			</Sheet.Description>
		</Sheet.Header>
	</Sheet.Content>
</Sheet.Root>
