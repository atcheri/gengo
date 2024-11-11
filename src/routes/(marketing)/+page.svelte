<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';

	const alertIt = () => {
		alert("it's going to driiiing!");
	};
</script>

<h1>Welcome to your library project</h1>
<p>Create your package using @sveltejs/package and preview/showcase your work with SvelteKit</p>
<p>Visit <a href="https://svelte.dev/docs/kit">svelte.dev/docs/kit</a> to read the documentation</p>
<div>
	<Button variant="default" onclick={alertIt}>T</Button>
	<Button variant="primary" onclick={alertIt}>T</Button>
	<Button variant="primaryOutline" onclick={alertIt}>T</Button>
	<Button variant="secondary" onclick={alertIt}>T</Button>
	<Button variant="secondaryOutline" onclick={alertIt}>T</Button>
	<Button variant="danger" onclick={alertIt}>T</Button>
	<Button variant="dangerOutline" onclick={alertIt}>T</Button>
	<Button variant="super" onclick={alertIt}>T</Button>
	<Button variant="superOutline" onclick={alertIt}>SuperOutline</Button>
	<Button variant="sidebar" onclick={alertIt}>sidebar</Button>
	<Button variant="sidebarOutline" onclick={alertIt}>sidebarOutline</Button>
	<Button variant="ghost" onclick={alertIt}>t</Button>
</div>
