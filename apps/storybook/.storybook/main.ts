import type { StorybookConfig } from '@storybook/react-vite'

const config: StorybookConfig = {
  // Lê stories direto do pacote ui-kit
  stories: ['../../packages/ui-kit/src/**/*.stories.@(ts|tsx)'],
  addons: [
    '@chromatic-com/storybook',
    '@storybook/addon-a11y',
    '@storybook/addon-docs',
  ],
  framework: '@storybook/react-vite',
}

export default config
