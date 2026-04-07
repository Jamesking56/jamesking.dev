/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        tokyo: {
          bg: '#1a1b26',
          'bg-alt': '#24283b',
          fg: '#a9b1d6',
          'fg-bright': '#c0caf5',
          accent: '#7aa2f7',
          'accent-hover': '#89b4fa',
          muted: '#565f89',
          border: '#414868',
          success: '#9ece6a',
          warning: '#e0af68',
          error: '#f7768e',
          purple: '#bb9af7',
          cyan: '#7dcfff',
        }
      },
      fontFamily: {
        mono: ['JetBrains Mono', 'monospace'],
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            '--tw-prose-body': theme('colors.tokyo.fg'),
            '--tw-prose-headings': theme('colors.tokyo.fg-bright'),
            '--tw-prose-links': theme('colors.tokyo.accent'),
            '--tw-prose-bold': theme('colors.tokyo.fg-bright'),
            '--tw-prose-counters': theme('colors.tokyo.muted'),
            '--tw-prose-bullets': theme('colors.tokyo.muted'),
            '--tw-prose-hr': theme('colors.tokyo.border'),
            '--tw-prose-quotes': theme('colors.tokyo.fg'),
            '--tw-prose-quote-borders': theme('colors.tokyo.accent'),
            '--tw-prose-captions': theme('colors.tokyo.muted'),
            '--tw-prose-code': theme('colors.tokyo.cyan'),
            '--tw-prose-pre-code': theme('colors.tokyo.fg'),
            '--tw-prose-pre-bg': theme('colors.tokyo.bg-alt'),
            '--tw-prose-th-borders': theme('colors.tokyo.border'),
            '--tw-prose-td-borders': theme('colors.tokyo.border'),
            maxWidth: 'none',
            lineHeight: '1.8',
            p: {
              marginTop: '1.5em',
              marginBottom: '1.5em',
            },
            'h2, h3, h4': {
              marginTop: '2em',
              marginBottom: '0.75em',
              fontWeight: '700',
            },
            h2: { 
              fontSize: '1.5rem',
              color: theme('colors.tokyo.fg-bright'),
              borderLeft: '3px solid ' + theme('colors.tokyo.accent'),
              paddingLeft: '1rem',
              backgroundColor: theme('colors.tokyo.bg-alt'),
              paddingTop: '0.75rem',
              paddingBottom: '0.75rem',
            },
            h3: { fontSize: '1.25rem' },
            code: {
              backgroundColor: theme('colors.tokyo.bg-alt'),
              padding: '0.2em 0.4em',
              borderRadius: '0.25rem',
              fontWeight: '400',
            },
            'code::before': { content: 'none' },
            'code::after': { content: 'none' },
            pre: {
              backgroundColor: theme('colors.tokyo.bg-alt'),
              borderRadius: '0.5rem',
              padding: '1rem',
              marginTop: '1.5em',
              marginBottom: '1.5em',
            },
            a: {
              textDecoration: 'underline',
              textDecorationColor: theme('colors.tokyo.accent/50'),
              '&:hover': {
                color: theme('colors.tokyo.accent-hover'),
              },
            },
            blockquote: {
              borderLeftColor: theme('colors.tokyo.accent'),
              color: theme('colors.tokyo.fg'),
              fontStyle: 'italic',
            },
            'ul, ol': {
              marginTop: '1em',
              marginBottom: '1em',
              paddingLeft: '1.5em',
            },
            li: {
              marginTop: '0.5em',
              marginBottom: '0.5em',
            },
          },
        },
      }),
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
