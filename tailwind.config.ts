import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        azul:    { DEFAULT: '#2a2f76', dark: '#1e2260', deep: '#161a4c' },
        dorado:  { DEFAULT: '#E07222', soft: '#E8884A', deep: '#B85510' },
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
        'ping-slow': 'pingSlow 2.4s cubic-bezier(0,0,0.2,1) infinite',
      },
      keyframes: {
        fadeUp: {
          from: { opacity: '0', transform: 'translateY(24px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
        pingSlow: {
          '0%':   { boxShadow: '0 0 0 0 rgba(224,114,34,0.55)' },
          '70%':  { boxShadow: '0 0 0 18px rgba(224,114,34,0)' },
          '100%': { boxShadow: '0 0 0 0 rgba(224,114,34,0)' },
        },
      },
    },
  },
  plugins: [],
}

export default config
