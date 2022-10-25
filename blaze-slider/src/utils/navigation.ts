import { BlazeSlider } from '../slider'
import { DEV } from '../constants'

export function handleNavigation(slider: BlazeSlider) {
  const prev = slider.el.querySelector(
    '.blaze-prev'
  ) as HTMLButtonElement | null

  const next = slider.el.querySelector(
    '.blaze-next'
  ) as HTMLButtonElement | null

  if (prev) {
    prev.onclick = () => {
      slider.prev()
    }
  }

  if (next) {
    next.onclick = () => {
      slider.next()
    }
  }

  if (slider.config.slideOnScroll) {
    if (DEV) console.info('Enabling slide on scroll.')
    slider.el.addEventListener('wheel', (ev) => {
      if (ev.deltaY > 0) slider.next()
      else slider.prev()
    })
  }
}
