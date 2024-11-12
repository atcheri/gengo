<script lang="ts">
	import { signIn, signOut } from '@auth/sveltekit/client';

	let password = $state('');
</script>

<nav>
	<p>
		These actions are all using the methods exported from
		<code>@auth/sveltekit/client</code>
	</p>
	<div class="actions">
		<div class="wrapper-form">
			<button onclick={() => signIn('github')}>Sign In with GitHub</button>
		</div>
		<div class="wrapper-form">
			<div class="input-wrapper">
				<label for="password">Password</label>
				<input bind:value={password} type="password" id="password" name="password" required />
			</div>
			<button onclick={() => signIn('credentials', { password })}>
				Sign In with Credentials
			</button>
			<button onclick={() => signOut()}> Sign Out </button>
		</div>
	</div>
</nav>
