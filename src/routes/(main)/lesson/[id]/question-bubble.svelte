<script lang="ts">
	type Props = {
		question: string;
	};

	const { question }: Props = $props();
</script>

<div class="mb-6 flex items-center gap-x-4">
	<img src="/images/cartoon-robot.svg" alt="Robot" height={60} width={60} class="hidden lg:block" />
	<img src="/images/cartoon-robot.svg" alt="Robot" height={40} width={40} class="block lg:hidden" />
	<div class="relative rounded-xl border-2 px-4 py-2 text-sm lg:text-base">
		{question}
		<div
			class="absolute -left-3 top-1/2 h-0 w-0 -translate-y-1/2 rotate-90 transform border-x-8 border-t-8 border-x-transparent"
		></div>
	</div>
</div>
