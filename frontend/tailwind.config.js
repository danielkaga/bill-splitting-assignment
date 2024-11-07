import formsPlugin from '@tailwindcss/forms'
import daisyuiPlugin from 'daisyui'

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {}
  },
  plugins: [formsPlugin, daisyuiPlugin],
  daisyui: {
    themes: ['nord']
  }
}
