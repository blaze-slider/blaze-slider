import { BlazeSlider } from '../slider'

export function handleNavigation(slider: BlazeSlider) {
  const prev = slider.el.querySelector('.blaze-prev') as HTMLButtonElement
  if (prev) {
    prev.onclick = () => {
      slider.prev()
    }
  }

  const next = slider.el.querySelector('.blaze-next') as HTMLButtonElement
  if (next) {
    next.onclick = () => {
      slider.next()
    }
  }
}
