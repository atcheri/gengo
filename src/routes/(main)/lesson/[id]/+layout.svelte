<script lang="ts">
	let { children } = $props();
</script>

<div class="flex h-full flex-col">
	<div class="flex h-full w-full flex-col">
		{@render children()}
	</div>
</div>
