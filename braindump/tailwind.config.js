/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		container: {
			center: true
		},
		extend: {
			typography: ({ theme }) => ({
				DEFAULT: {
					css: {
						'--tw-prose-links': theme('colors.blue.500'),
						'--tw-prose-bold': theme('colors.rose.500'),
						'--tw-prose-pre-bg': '#ede5c3',
						'--tw-prose-pre-code': theme('colors.gray.800'),
            '--tw-prose-quote-borders': '#e5dfb0',
						'blockquote p:first-of-type::before': {
							content: 'none'
						},
						'blockquote p:last-of-type::after': {
							content: 'none'
						},
						a: {
							'&:hover': {
								color: theme('colors.purple.500')
							},
							'&:visited': {
								color: theme('colors.purple.500')
							}
						}
					}
				}
			})
		}
	},
	plugins: [require('@tailwindcss/typography')]
}
