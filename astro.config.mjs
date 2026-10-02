// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

const SITE = 'https://shahmeerhashmii.github.io';
const BASE = '/maximo-field-guide';

// https://astro.build/config
export default defineConfig({
	site: SITE,
	base: BASE,
	integrations: [
		starlight({
			title: 'Maximo Field Guide',
			description: 'Plain-English Maximo, explained through one real-feeling utility.',
			logo: {
				light: './src/assets/logo-light.svg',
				dark: './src/assets/logo-dark.svg',
				replacesTitle: false,
			},
			social: {
				github: 'https://github.com/shahmeerhashmii/maximo-field-guide',
			},
			customCss: [
				'./src/styles/theme.css',
				'@fontsource/source-serif-4/400.css',
				'@fontsource/source-serif-4/500.css',
				'@fontsource/source-serif-4/600.css',
				'@fontsource/ibm-plex-sans/400.css',
				'@fontsource/ibm-plex-sans/500.css',
				'@fontsource/ibm-plex-sans/600.css',
				'@fontsource/ibm-plex-mono/400.css',
				'@fontsource/ibm-plex-mono/500.css',
			],
			components: {
				Footer: './src/components/CustomFooter.astro',
				Head: './src/components/CustomHead.astro',
			},
			sidebar: [
				{ label: 'Home', link: '/' },
				{ label: 'Start Here', slug: 'start-here' },
				{
					label: 'Learning Paths',
					collapsed: false,
					autogenerate: { directory: 'paths' },
				},
				{
					label: 'Modules',
					collapsed: false,
					autogenerate: { directory: 'modules' },
				},
				{ label: 'Riverbend Water', slug: 'riverbend' },
				{ label: 'Sources', slug: 'sources' },
				{ label: 'About', slug: 'about' },
			],
		}),
	],
});
