import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './pages/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          blue: '#0a84ff',
          ink: '#0b1220',
        }
      },
      boxShadow: {
        card: '0 10px 30px rgba(2,13,48,0.08)'
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'ui-sans-serif', 'system-ui']
      }
    }
  },
  plugins: []
};

export default config;


