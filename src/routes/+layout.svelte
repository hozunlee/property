<script>
	import '@skeletonlabs/skeleton/styles/skeleton.css'
	import '@skeletonlabs/skeleton/themes/theme-skeleton.css'
	import Ga from '$lib/utils/Ga.svelte'
	import '../app.css'
</script>

<div class="app">
	<Ga />
	<header>
		<!-- <Header /> -->
	</header>

	<main class="container mx-auto p-4">
		<slot />
	</main>

	<footer class="mt-auto">
		<p>
			<a href="https://hololog.dev" class="text-blue-500 hover:text-blue-700 font-medium"
				>Visit hololog</a
			> by hojunLee
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
