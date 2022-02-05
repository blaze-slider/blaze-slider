import { AllRequired, Config } from '../types'

export const defaultConfig: AllRequired<Config> = {
  threshold: 0,
  slides: {
    show: 1,
    scroll: 1,
    gap: 20,
    draggable: true,
    loop: false,
  },
  navigation: false,
  pagination: false,
  transition: {
    timingFunction: 'ease',
    duration: '300ms',
  },
  autoplay: {
    enabled: false,
    interval: 3000,
    toLeft: false,
    stopOnInteraction: true,
    pauseOnHover: true,
  },
}
