/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    screens: {
      xsm: '500px',
      // => @media (min-width: 500px) { ... }
      sm: '640px',
      // => @media (min-width: 640px) { ... }
      md: '768px',
      // => @media (min-width: 768px) { ... }
      lg: '1024px',
      // => @media (min-width: 1024px) { ... }
      xl: '1280px',
      // => @media (min-width: 1280px) { ... }
      '2xl': '1536px',
      // => @media (min-width: 1536px) { ... }
      mobileMax: { raw: '(max-width: 600px)' },

      smMax: { raw: '(max-width: 640px)' },

      xsmMax: { raw: '(max-width: 500px)' },

      mdMax: { raw: '(max-width: 768px)' },

      lgMax: { raw: '(max-width: 1023px)' },
      xlMax: { raw: '(max-width: 1280px)' },

      smallerMobile: { raw: '(max-width: 450px)' },
      smallestMobile: { raw: '(max-width: 375px)' },
      smallestMobileMin: { raw: '(min-width: 375px)' },
      extraSmallMobile: { raw: '(max-width: 345px)' },
      xxsm: { raw: '(min-width: 490px)' },

      // Heights
      '896min': { raw: '(min-height: 896px)' },
      '800max': { raw: '(max-height: 800px)' },
    },
    extend: {},
  },

  daisyui: {
    themes: [
      {
        'mytheme-light': {
          primary: '#3b82f6',

          secondary: '#8b5cf6',

          accent: '#d99c32',

          neutral: '#191D24',

          'base-100': '#E9EAEF',

          info: '#0891b2',

          success: '#36D399',

          warning: '#FBBD23',

          error: '#d41919',

          '.custom-sort-bg': {
            'background-color': '#E9EAEF',
          },

          '.custom-bg-color': {
            'background-color': '#f5f7fc',
          },

          '.output-text-color': {
            'text-color': '#000000',
            '-webkit-text-fill-color': '#000000',
            opacity: '1',
          },

          '.custom-border-color': {
            'border-color': '#000000',
          },
          '.create-border-color': {
            'border-color': '#e5e5e5',
          },
        },
        'mytheme-dark': {
          primary: '#d99c32',

          secondary: '#00FF7F',

          accent: '#d99c32',

          neutral: '#191D24',

          'base-100': '#121212',

          info: '#1DB954',

          success: '#00FF7F',

          warning: '#FBBD23',

          error: '#d41919',

          '.custom-sort-bg': {
            'background-color': '#3E3E3E',
          },

          '.custom-bg-color': {
            'background-color': '#282828',
          },

          '.output-text-color': {
            'text-color': '#ffffff',
            '-webkit-text-fill-color': '#ffffff',
            opacity: '1',
          },

          '.custom-border-color': {
            'border-color': '#ffffff',
          },

          '.create-border-color': {
            'border-color': '#404040',
          },
        },
      },
    ],
  },
  plugins: [require('@tailwindcss/typography'), require('daisyui')],
};
