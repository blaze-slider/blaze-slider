import { BlazeSlider } from '../slider'

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
}
