<script lang="ts">
	import { toast, type ExternalToast } from 'svelte-sonner';

	const { status }: { status: 'success' | 'cancel' } = $props();

	$effect(() => {
		const options: ExternalToast = { duration: 10000, position: 'top-center' };
		if (status === 'success') {
			toast.success('Subscription payment Successful', options);
		} else if (status === 'cancel') {
			toast.error('Subcription payment Cancelled', options);
		}
	});
</script>
