import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        azul:    { DEFAULT: '#2a2f76', dark: '#1e2260', deep: '#161a4c' },
        dorado:  { DEFAULT: '#C8A96A', soft: '#d4ba87', deep: '#a88845' },
        crema:   { DEFAULT: '#f7f4ef', warm: '#efeae0' },
        texto:   '#1a1a2e',
        gris:    '#6b7280',
        borde:   '#e5e7eb',
      },
      fontFamily: {
        title:   ['var(--font-nunito)', 'sans-serif'],
        body:    ['var(--font-inter)', 'sans-serif'],
        article: ['var(--font-lora)', 'serif'],
      },
      animation: {
        'fade-up': 'fadeUp 0.6s cubic-bezier(0.16,1,0.3,1) forwards',
      },
      keyframes: {
        fadeUp: {
          from: { opacity: '0', transform: 'translateY(24px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}

export default config
