import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';

export function baseOptions(): BaseLayoutProps {
  return {
    nav: {
      title: 'Blaze Slider',
    },
    links: [
      {
        text: 'Get Started',
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
