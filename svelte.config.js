import adapter from '@sveltejs/adapter-auto'
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte'
import path from 'path'

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://svelte.dev/docs/kit/integrations
	// for more information about preprocessors
	preprocess: vitePreprocess(),
	kit: {
		// adapter-auto only supports some environments, see https://kit.svelte.dev/docs/adapter-auto for a list.
		// If your environment is not supported or you settled on a specific environment, switch out the adapter.
		// See https://kit.svelte.dev/docs/adapters for more information about adapters.
		adapter: adapter(),
		alias: {
			$lib: path.resolve('./src/lib'),
			$components: path.resolve('./src/components'),
			$stores: path.resolve('./src/stores'),
			$styles: path.resolve('./src/styles'),
			$types: path.resolve('./src/types')
		},
		typescript: {
			config: (config) => ({
				...config,
				include: [...config.include, '../.svelte-kit/types/**/*.d.ts']
			})
		}
	},
	preprocess: [
		vitePreprocess({
			style: {
				css: {
					postcss: './postcss.config.cjs'
				}
			}
		})
	],
	compilerOptions: {
		runes: true
	}
}

export default config
