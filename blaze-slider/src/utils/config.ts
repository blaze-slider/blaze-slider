import { BlazeConfig, MediaConfig } from '../types'

export const defaultConfig: MediaConfig = {
  slideGap: '20px',
  slidesToScroll: 1,
  slidesToShow: 1,
  loop: true,
  paginationContainer: null,
  pauseAutoplayOnHover: true,
  enablePagination: false,
  enableAutoplay: false,
  autoplayInterval: 3000,
  transitionDuration: 500,
  transitionTimingFunction: 'ease',
  autoplayDirection: 'to left',
}

export function createConfig(blazeConfig: BlazeConfig) {
  // start with default config
  const config = defaultConfig
  Object.keys(blazeConfig.media).forEach((media: string) => {
    // if the media matches, override the config with media config
    if (window.matchMedia(media).matches) {
      const mediaConfig = blazeConfig.media[media]
      Object.keys(mediaConfig).forEach((key: string) => {
        // @ts-expect-error
        config[key] = mediaConfig[key]
      })
    }
  })

  return config
}
