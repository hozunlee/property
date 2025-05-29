<script lang="ts">
	import { page } from '$app/state'

	$effect(() => {
		if (typeof gtag !== 'undefined') {
			gtag('config', 'G-Q0P3YWP903', {
				page_title: document.title,
				page_path: page.url.pathname
			})
		}
	})
</script>

<svelte:head>
	<script async src="https://www.googletagmanager.com/gtag/js?id=G-Q0P3YWP903">
	</script>
	<script>
		window.dataLayer = window.dataLayer || []

		function gtag() {
			dataLayer.push(arguments)
		}

		gtag('js', new Date())
		gtag('config', 'G-Q0P3YWP903')
	</script>
</svelte:head>
