import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';

export function baseOptionsDocs(): BaseLayoutProps {
  return {
    nav: {
      title: 'Blaze Slider',
      transparentMode: 'top',
    },
    links: [
      {
        text: 'Playground',
        url: 'https://codesandbox.io/s/blaze-slider-playground-ps0b9u',
        external: true,
      },
    ],
    githubUrl: 'https://github.com/blaze-slider/blaze-slider',
  };
}

export function baseOptionsLanding(): BaseLayoutProps {
  return {
    nav: {
      title: 'Blaze Slider',
      transparentMode: 'top',
    },
    links: [
      {
        text: 'Docs',
        url: '/docs',
      },
      {
        text: 'Playground',
        url: 'https://codesandbox.io/s/blaze-slider-playground-ps0b9u',
        external: true,
      },
    ],
    githubUrl: 'https://github.com/blaze-slider/blaze-slider',
  };
}
