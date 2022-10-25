import { BlazeConfig, MediaConfig } from '../types'

export const defaultConfig: MediaConfig = {
  // layout
  slideGap: '20px',
  slidesToScroll: 1,
  slidesToShow: 1,
  // behavior
  loop: true,
  // autoplay
  enableAutoplay: false,
  stopAutoplayOnInteraction: true,
  autoplayInterval: 3000,
  autoplayDirection: 'to left',
  // pagination
  enablePagination: true,
  // transition
  transitionDuration: 300,
  transitionTimingFunction: 'ease',
  draggable: true,
}

export function createConfig(blazeConfig: BlazeConfig) {
  // start with default config clone
  const config = { ...defaultConfig }

  for (const media in blazeConfig) {
    // if the media matches, override the config with media config
    if (window.matchMedia(media).matches) {
      const mediaConfig = blazeConfig[media]
      for (const key in mediaConfig) {
        // @ts-expect-error
        config[key] = mediaConfig[key]
      }
    }
  }

  return config
}
