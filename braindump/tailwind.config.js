/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    'src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      typography: ({ theme }) => ({
        DEFAULT: {
          css: {
            '--tw-prose-links': theme('colors.blue.500'),
            '--tw-prose-bold': theme('colors.rose.500'),
            '--tw-prose-pre-bg': theme('colors.gray.100'),
            '--tw-prose-pre-code': theme('colors.gray.800'),
            a: {
              '&:hover': {
                color: theme('colors.purple.500'),
              },
              '&:visited': {
                color: theme('colors.purple.500'),
              },
            },
          },
        },
      })
    }
  },
  plugins: [
    require('@tailwindcss/typography')
  ],
}
