<script lang="ts">
	import Ga from '$lib/utils/Ga.svelte'
	import Header from '$lib/components/Header.svelte'
	import '../app.css'

	import type { LayoutProps } from './$types'

	let { data, children }: LayoutProps = $props()
</script>

<div class="app flex flex-col min-h-screen">
	<Ga />
	<Header />

	<main class="container mx-auto p-4">
		{@render children()}
	</main>

	<footer class="mt-auto">
		<p>
			<a href="https://hololog.dev" class="text-blue-500 hover:text-blue-700 font-medium"
				>Visit hololog</a
			> by hojun Lee
		</p>
	</footer>
</div>

<style>
	.app {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
	}

	footer {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		padding: 12px;
	}

	@media (min-width: 480px) {
		footer {
			padding: 12px 0;
		}
	}
</style>
