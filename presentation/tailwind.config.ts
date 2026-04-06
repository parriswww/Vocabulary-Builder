import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand:     '#F05A28',
        'brand-dk':'#C43F10',
        'card-from':'#5B6CF0',
        'card-to':  '#9B5CF6',
        navy:       '#1A1A2E',
        accent:     '#FFC107',
        muted:      '#6B7280',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      backgroundImage: {
        'card-gradient': 'linear-gradient(135deg, #5B6CF0 0%, #9B5CF6 100%)',
        'brand-gradient':'linear-gradient(135deg, #F05A28 0%, #C43F10 100%)',
      },
    },
  },
  plugins: [],
}

export default config
