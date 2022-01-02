import { BlazeSlider } from '../BlazeSlider'

export function handleA11y(blazeSlider: BlazeSlider) {
  // a11y
  blazeSlider.slider.addEventListener('keydown', (event: KeyboardEvent) => {
    const { key, shiftKey } = event
    if (key === 'ArrowRight' || (key === 'Tab' && !shiftKey)) {
      event.preventDefault()
      blazeSlider.swipeRight()
      blazeSlider.slides[blazeSlider.offset].focus()
    } else if (key === 'ArrowLeft' || (key === 'Tab' && shiftKey)) {
      event.preventDefault()
      blazeSlider.swipeLeft()
      blazeSlider.slides[blazeSlider.offset].focus()
    }
  })
}
