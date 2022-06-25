import { MediaConfig } from '../src/types'
import { createConfig, defaultConfig } from '../src/utils/config'

// @ts-ignore - mock matchMedia
window.matchMedia = (media: string) => {
  // only foo and bar matches
  return {
    matches: media === 'foo' || media === 'bar',
  }
}

test('works', () => {
  const config = createConfig({
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
  })

  const expectedConfig: MediaConfig = {
    ...defaultConfig,
    slidesToShow: 5,
    slidesToScroll: 3,
    transitionTimingFunction: 'ease-out',
  }

  expect(config).toEqual(expectedConfig)
})
