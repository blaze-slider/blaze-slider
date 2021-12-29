import { BlazeSlider } from '../index'

export function handleA11y(blazeSlider: BlazeSlider) {
  // a11y
  blazeSlider.slider.addEventListener('keydown', (event: KeyboardEvent) => {
    if (
      event.key === 'ArrowRight' ||
      (event.key === 'Tab' && !event.shiftKey)
    ) {
      event.preventDefault()
      blazeSlider.swipeRight()
      blazeSlider.slides[blazeSlider.offset].focus()
    } else if (
      event.key === 'ArrowLeft' ||
      (event.key === 'Tab' && event.shiftKey)
    ) {
      event.preventDefault()
      blazeSlider.swipeLeft()
      blazeSlider.slides[blazeSlider.offset].focus()
    }
  })
}
