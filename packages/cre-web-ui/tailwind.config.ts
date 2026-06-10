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

      // ─── Border Width ──────────────────────────────────────────────
      // Fonte: Figma DS PUCPR Core Web — Foundation > Tokens > Width (22/08/2025)
      borderWidth: {
        'small':  '1px',  // separar elementos de background
        'medium': '2px',  // hover e pressed
        'large':  '3px',  // foco
        'xlarge': '4px',
      },

      // ─── Border Radius ─────────────────────────────────────────────
      // Fonte: Figma DS PUCPR Core Web — Foundation > Tokens > Radius (22/08/2025)
      borderRadius: {
        'radius-0':    '0px',
        'radius-4':    '4px',
        'radius-8':    '8px',
        'radius-12':   '12px',  // dev addition — pending design sign-off
        'radius-16':   '16px',
        'radius-full': '9999px',
      },

      // ─── Ring Width ────────────────────────────────────────────────
      ringWidth: {
        DEFAULT: '3px',
      },

      // ─── Shadows ───────────────────────────────────────────────────
      // Nomes confirmados: shadow-level-1, shadow-level-2, shadow-level-3
      // Intensidade visual confirmada pelos popups do Figma.
      // ⚠️ Valores CSS provisórios — substituir quando pegar X/Y/Blur/Spread/Cor
      //    do painel Efeitos do Figma (clicar no ⊙ ao lado do efeito num componente)
      boxShadow: {
        'level-1': '0px 1px 4px 0px rgba(0, 0, 0, 0.08), 0px 1px 2px 0px rgba(0, 0, 0, 0.06)',
        'level-2': '0px 4px 12px 0px rgba(0, 0, 0, 0.10), 0px 2px 6px 0px rgba(0, 0, 0, 0.06)',
        'level-3': '0px 12px 32px 0px rgba(0, 0, 0, 0.12), 0px 4px 12px 0px rgba(0, 0, 0, 0.08)',
      },

      colors: {
        // ⚠️ Placeholders — aguardando zoom na tabela Brand/Neutral do Figma
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
