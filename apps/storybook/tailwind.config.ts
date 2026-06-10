import type { Config } from 'tailwindcss'

// O Storybook precisa escanear o pacote ui-kit para gerar as classes Tailwind
const config: Config = {
  content: [
    './src/**/*.{ts,tsx}',
    '../../packages/cre-web-ui/src/**/*.{ts,tsx}',
  ],
  presets: [require('../../packages/cre-web-ui/tailwind.config.ts')],
}

export default config
