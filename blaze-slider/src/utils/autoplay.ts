import { BlazeSlider } from '../slider'
import { isTouch } from './drag'

export function handleAutoplay(slider: BlazeSlider) {
  const config = slider.config
  if (!config.enableAutoplay) return
  const dir = config.autoplayDirection === 'to left' ? 'next' : 'prev'

  slider.autoplayTimer = setInterval(() => {
    slider[dir]()
  }, config.autoplayInterval)

  if (config.stopAutoplayOnInteraction) {
    slider.el.addEventListener(
      isTouch() ? 'touchstart' : 'mousedown',
      () => {
        clearInterval(slider.autoplayTimer)
      },
      { once: true }
    )
  }
}
