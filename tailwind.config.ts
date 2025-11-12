
import type { Config } from 'tailwindcss'
const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: '#0d0d0f',
        card: '#141419',
        primary: '#f5d48f',
        accent: '#88e0d0',
      },
      boxShadow: { soft: '0 10px 30px rgba(0,0,0,0.35)' }
    },
  },
  plugins: [],
}
export default config
