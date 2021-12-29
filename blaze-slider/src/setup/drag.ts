import { BlazeSlider } from '../index'

export function handleDrag (blazeSlider: BlazeSlider) {
  const { track, config } = blazeSlider
  if (!config.slides.draggable) return

  let posInitial: number
  let posX1: number
  let offsetLeft = 0

  const threshold = 100

  const { grabCursor } = blazeSlider.config

  function handlePointerUp () {
    if (grabCursor) {
      track.style.cursor = 'grab'
    }
    const posFinal = offsetLeft
    track.style.setProperty('--blaze-slide-amount', 0 + 'px')

    blazeSlider.enableTransition()
    if (posFinal - posInitial < -threshold) {
      blazeSlider.swipeRight()
    } else if (posFinal - posInitial > threshold) {
      blazeSlider.swipeLeft()
    }

    offsetLeft = 0
    track.onpointerup = null
    track.onpointermove = null
  }

  function handlePointerMove (e: PointerEvent) {
    const diff = posX1 - e.clientX
    // handle peeking
    // wrapping to prevent showing empty space
    if (diff < 0 && blazeSlider.offset === 0) {
      blazeSlider.wrapToLeft(1)
    } else if (diff > 0 && blazeSlider.offset === blazeSlider.totalSlides - blazeSlider.config.slides.show) {
      blazeSlider.wrapToRight(1)
    }
    posX1 = e.clientX
    const slideAmount = (offsetLeft - diff)
    track.style.setProperty('--blaze-slide-amount', slideAmount + 'px')
    offsetLeft = slideAmount
  }

  function handlePointerDown (event: PointerEvent) {
    if (grabCursor) {
      track.style.cursor = 'grabbing'
    }
    // capture all events of this pointerId and consider it as it is meant for track only
    track.setPointerCapture(event.pointerId)
    blazeSlider.disableTransition()
    event.preventDefault()
    posInitial = offsetLeft

    posX1 = event.clientX
    track.onpointermove = handlePointerMove
    track.onpointerup = handlePointerUp
  }

  track.onpointerdown = handlePointerDown
}
