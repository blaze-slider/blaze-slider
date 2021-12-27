import { Rollify } from '../index'

export function handleDrag (rollify: Rollify) {
  const { track } = rollify

  let posInitial: number
  let posX1: number
  let offsetLeft = 0

  const threshold = 100

  function handlePointerUp () {
    track.style.cursor = 'grab'
    const posFinal = offsetLeft
    track.style.setProperty('--rollify-slide-amount', 0 + 'px')

    rollify.enableTransition()
    if (posFinal - posInitial < -threshold) {
      rollify.swipeRight()
    } else if (posFinal - posInitial > threshold) {
      rollify.swipeLeft()
    }

    offsetLeft = 0
    track.onpointerup = null
    track.onpointermove = null
  }

  function handlePointerMove (e: PointerEvent) {
    const diff = posX1 - e.clientX
    // handle peeking
    // wrapping to prevent showing empty space
    if (diff < 0 && rollify.offset === 0) {
      rollify.wrapToLeft(1)
    } else if (diff > 0 && rollify.offset === rollify.totalSlides - rollify.config.slides.show) {
      rollify.wrapToRight(1)
    }
    posX1 = e.clientX
    const slideAmount = (offsetLeft - diff)
    track.style.setProperty('--rollify-slide-amount', slideAmount + 'px')
    offsetLeft = slideAmount
  }

  function handlePointerDown (event: PointerEvent) {
    track.style.cursor = 'grabbing'
    // capture all events of this pointerId and consider it as it is meant for track only
    track.setPointerCapture(event.pointerId)
    rollify.disableTransition()
    event.preventDefault()
    posInitial = offsetLeft

    posX1 = event.clientX
    track.onpointermove = handlePointerMove
    track.onpointerup = handlePointerUp
  }

  track.onpointerdown = handlePointerDown
}
