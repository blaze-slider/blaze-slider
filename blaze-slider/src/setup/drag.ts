import { BlazeSlider } from '../index'

export function handleDrag (blazeSlider: BlazeSlider) {
  const { track, config } = blazeSlider
  if (!config.slides.draggable) return

  let posInitial: number
  let posX1: number
  let slideVector = 0

  const { grabCursor, threshold } = blazeSlider.config

  // number of slide-width length of drag done
  let revealCount = 0

  function handlePointerUp () {
    if (grabCursor) {
      track.style.cursor = 'grab'
    }

    track.style.setProperty('--blaze-slide-amount', 0 + 'px')

    const swipeVector = Math.max(revealCount, config.slides.scroll)

    blazeSlider.enableTransition()
    if (slideVector - posInitial < -threshold) {
      blazeSlider.swipe(swipeVector)
    } else if (slideVector - posInitial > threshold) {
      blazeSlider.swipe(-1 * swipeVector)
    }

    slideVector = 0
    revealCount = 0
    track.onpointerup = null
    track.onpointermove = null
  }

  function handlePointerMove (e: PointerEvent) {
    const diff = posX1 - e.clientX

    // wrapping to prevent showing empty space
    if (slideVector > 0) {
      if (slideVector > revealCount * blazeSlider.slideWidth) {
        revealCount++
        if (blazeSlider.offset < revealCount) {
          blazeSlider.wrapToLeft(1)
        }
      }
    } else {
      if (-1 * slideVector > revealCount * blazeSlider.slideWidth) {
        revealCount++
        const lastVisibleSlidePosition = blazeSlider.offset + blazeSlider.config.slides.show - 1
        if (lastVisibleSlidePosition + revealCount > blazeSlider.totalSlides - 1) {
          blazeSlider.wrapToRight(1)
        }
      }
    }

    posX1 = e.clientX
    const slideAmount = (slideVector - diff)
    track.style.setProperty('--blaze-slide-amount', slideAmount + 'px')
    slideVector = slideAmount
  }

  function handlePointerDown (event: PointerEvent) {
    if (!blazeSlider.slideWidth) {
      blazeSlider.slideWidth = Number(getComputedStyle(blazeSlider.slides[0]).width.slice(0, -2))
    }

    if (grabCursor) {
      track.style.cursor = 'grabbing'
    }
    // capture all events of this pointerId and consider it as it is meant for track only
    track.setPointerCapture(event.pointerId)
    blazeSlider.disableTransition()
    event.preventDefault()
    posInitial = slideVector

    posX1 = event.clientX
    track.onpointermove = handlePointerMove
    track.onpointerup = handlePointerUp
  }

  track.onpointerdown = handlePointerDown
}
