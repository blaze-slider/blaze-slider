import { AllRequired, Config } from './types'

export const defaultConfig: AllRequired<Config> = {
  slides: {
    show: 1,
    scroll: 1,
    gap: '10px'
  },
  transition: {
    timingFunction: 'ease',
    duration: '300ms'
  },
  autoplay: {
    enabled: false,
    interval: 3000,
    toLeft: false,
    stopOnInteraction: true,
    pauseOnHover: true
  }
}
