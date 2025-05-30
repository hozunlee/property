<script lang="ts">
	import { page } from '$app/stores'
	import { spring } from 'svelte/motion'

	const { className = '' } = $props<{
		className?: string
	}>()

	const links = [
		{
			href: '/',
			icon: '🏠',
			label: '평형계산기',
			shortLabel: '평형',
			isExternal: false
		},
		{
			href: '/address',
			icon: '🔍',
			label: '만능주소찾기',
			shortLabel: '주소',
			isExternal: false
		},
		{
			href: 'https://hololog.dev/about',
			icon: '✨',
			label: 'About',
			shortLabel: 'About',
			isExternal: true
		}
	]

	// Spring animation for the active indicator
	const activeIndicator = spring({ x: 0, width: 0 })
	let navRef: HTMLElement | null = null

	// Update active indicator position when route changes
	$effect(() => {
		if (typeof window !== 'undefined' && navRef) {
			const path = $page.url.pathname
			// Find the active link that matches the current path
			const activeLink = Array.from(navRef.querySelectorAll('a')).find((link) => {
				const linkPath = new URL(link.href).pathname
				return path === linkPath || (path.startsWith(linkPath) && linkPath !== '/')
			})

			if (activeLink) {
				const { x, width } = activeLink.getBoundingClientRect()
				const navRect = navRef.getBoundingClientRect()
				activeIndicator.set({
					x: x - navRect.left,
					width
				})
			}
		}
	})
</script>

<header class="bg-white shadow-sm sticky top-0 z-50 {className}">
	<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
		<div class="flex justify-between h-16">
			<div class="flex items-center">
				<a href="/" class="text-xl font-bold text-pink-500 hover:text-pink-600 transition-colors">
					🏠 Property Tools
				</a>
			</div>

			<nav class="flex items-center space-x-1 relative text-sm md:text-base" bind:this={navRef}>
				{#each links as link}
					<a
						href={link.href}
						class="px-2 sm:px-3 py-2 rounded-md font-medium transition-colors relative z-10 whitespace-nowrap
						{$page.url.pathname === link.href || ($page.url.pathname.startsWith(link.href) && link.href !== '/')
							? 'text-pink-600'
							: 'text-gray-700 hover:text-pink-500'}"
						target={link.isExternal ? '_blank' : undefined}
						rel={link.isExternal ? 'noopener noreferrer' : undefined}
					>
						<span class="hidden sm:inline">{link.icon} {link.label}</span>
						<span class="sm:hidden">{link.icon} {link.shortLabel}</span>
					</a>
				{/each}

				<!-- Animated underline -->
				<div
					class="absolute bottom-0 h-1 bg-pink-400 rounded-full transition-all duration-300"
					style="left: {Math.round($activeIndicator.x)}px; width: {Math.round(
						$activeIndicator.width
					)}px;"
				></div>
			</nav>
		</div>
	</div>
</header>

<style>
	/* Add a subtle hover effect */
	nav a {
		position: relative;
		transition: all 0.2s ease;
	}

	nav a:hover {
		transform: translateY(-1px);
	}

	@keyframes popIn {
		0% {
			transform: translateY(-50%) scale(0.5);
			opacity: 0;
		}
		70% {
			transform: translateY(-50%) scale(1.2);
		}
		100% {
			transform: translateY(-50%) scale(1);
			opacity: 1;
		}
	}
</style>
