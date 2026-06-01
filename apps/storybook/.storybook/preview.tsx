import type { Preview } from '@storybook/react-vite'
import '@cre/ui-kit/src/styles/globals.css'

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    a11y: { test: 'todo' },
    viewport: {
      viewports: {
        xs:   { name: 'XS — Mobile (320px)',      styles: { width: '320px',  height: '812px'  } },
        sm:   { name: 'SM — Smartphone (600px)',   styles: { width: '600px',  height: '812px'  } },
        md:   { name: 'MD — Tablet (840px)',       styles: { width: '840px',  height: '1024px' } },
        lg:   { name: 'LG — Laptop (1024px)',      styles: { width: '1024px', height: '768px'  } },
        xl:   { name: 'XL — Desktop HD (1440px)',  styles: { width: '1440px', height: '900px'  } },
        wide: { name: 'Wide — Ultrawide (1920px)', styles: { width: '1920px', height: '1080px' } },
      },
    },
  },
}

export default preview
