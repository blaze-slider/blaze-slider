import { MediaConfig } from '../src/types'
import { createConfig, defaultConfig } from '../src/utils/config'

// @ts-ignore - mock matchMedia
window.matchMedia = (media: string) => {
  return {
    matches: media === 'foo' || 'bar',
  }
}

test('works', () => {
  const config = createConfig({
    media: {
      foo: {
        slidesToShow: 5,
        transitionTimingFunction: 'ease-in',
      },
      bar: {
        slidesToScroll: 3,
        transitionTimingFunction: 'ease-out',
      },
      bazz: {
        transitionDuration: 10000,
      },
    },
  })

  const expectedConfig: MediaConfig = {
    ...defaultConfig,
    slidesToShow: 5,
    slidesToScroll: 3,
    transitionTimingFunction: 'ease-out',
  }

  expect(config).toEqual(expectedConfig)
})
