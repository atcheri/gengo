<script>
	import Button from './ui/button/button.svelte';
	import Coins from './ui/icons/coins.svelte';
</script>

<div class="space-y-4 rounded-xl border-2 p-4">
	<div class="space-y-2">
		<div class="flex items-center gap-x-2">
			<Coins className="size-9 text-orange-500" />
			<h3 class="text-lg font-bold">Upgrade to Pro</h3>
		</div>
		<p class="text-muted-foreground">Get unlimited hearts and more!</p>
	</div>
	<Button variant="super" class="w-full" size="lg">
		<a href="/shop"> Upgrade today </a>
	</Button>
</div>
