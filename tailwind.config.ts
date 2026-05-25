import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './index.html',
    './src/**/*.{ts,tsx}',
    './.storybook/**/*.{ts,tsx}',
  ],
  theme: {
    // Sobrescreve os breakpoints padrão do Tailwind.
    // Fonte: DS PUCPR Core Web — Figma / Grid & States (22/05/2026)
    screens: {
      'xs':   '320px',   // mobile:      4 cols | 8px gutter  | 24px margin
      'sm':   '600px',   // smartphone:  8 cols | 16px gutter | 32px margin
      'md':   '840px',   // tablet/ipad: 12 cols | 24px gutter | 40px margin
      'lg':   '1024px',  // laptop:      12 cols | 24px gutter | fluído
      'xl':   '1440px',  // desktop-hd:  12 cols | 24px gutter | 72px/col fixo
      'wide': '1920px',  // ultrawide:   12 cols | 24px gutter | ~96px/col fixo
    },
    extend: {
      fontFamily: {
        heading: ['Poppins', 'sans-serif'],
        body:    ['"Source Sans 3"', 'sans-serif'],
      },
      maxWidth: {
        'container-xl':   '1440px',
        'container-wide': '1920px',
      },
      colors: {
        // ⚠️ Placeholder — confirmar hex exato na página Tokens do Figma
        brand: {
          DEFAULT: '#7B1234',
        },
        // Confirmado: Figma DS PUCPR Core Web — neutral/400
        neutral: {
          400: '#B5A8AD',
        },
      },
    },
  },
  plugins: [],
}

export default config
