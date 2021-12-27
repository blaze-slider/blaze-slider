import { Rollify } from '../../dist/lib.cjs.dev'

export function handleA11y (rollify: Rollify) {
  // a11y
  rollify.slider.addEventListener('keydown', (event: KeyboardEvent) => {
    if (event.key === 'ArrowRight' || (event.key === 'Tab' && !event.shiftKey)) {
      event.preventDefault()
      rollify.swipeRight()
      rollify.slides[rollify.offset].focus()
    }
    else if (event.key === 'ArrowLeft' || (event.key === 'Tab' && event.shiftKey)) {
      event.preventDefault()
      rollify.swipeLeft()
      rollify.slides[rollify.offset].focus()
    }
  })
}
