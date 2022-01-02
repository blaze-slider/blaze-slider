import { BlazeSlider } from '../BlazeSlider'
import { setCSSVar } from '../dom/setCSSVar'
import { swipe } from '../dom/swipe'
import { disableTransition } from '../dom/transition'
import { wrapToLeft, wrapToRight } from '../dom/wrap'

export function handleDrag(blazeSlider: BlazeSlider) {
  const { track } = blazeSlider
  const { scroll } = blazeSlider.config.slides

  let posInitial: number
  let initialClientX: number
  let slideVector = 0

  const { grabCursor, threshold } = blazeSlider.config

  // number of slide-width length of drag done
  let slidesDragged = 0

  function handlePointerUp() {
    if (grabCursor) {
      track.style.cursor = 'grab'
    }

    // scroll in multiples of config.scroll
    let swipeAmount = scroll
    if (slidesDragged > scroll) {
      swipeAmount = Math.ceil(slidesDragged / scroll) * scroll
    }

    // enableTransition(blazeSlider)
    if (slideVector - posInitial < -threshold) {
      swipe(blazeSlider, swipeAmount)
    } else if (slideVector - posInitial > threshold) {
      swipe(blazeSlider, -1 * swipeAmount)
    }

    // reset slides drag related data
    slideVector = 0
    slidesDragged = 0

    // remove event listeners
    track.onpointerup = null
    track.onpointermove = null
  }

  function handlePointerMove(e: PointerEvent) {
    const diff = initialClientX - e.clientX

    // wrapping to prevent showing empty space
    if (slideVector > 0) {
      if (slideVector > slidesDragged * blazeSlider.slideWidth) {
        slidesDragged++
        if (blazeSlider.offset < slidesDragged) {
          wrapToLeft(blazeSlider, 1)
        }
      }
    } else {
      if (-1 * slideVector > slidesDragged * blazeSlider.slideWidth) {
        slidesDragged++
        const lastVisibleSlidePosition =
          blazeSlider.offset + blazeSlider.config.slides.show - 1
        if (
          lastVisibleSlidePosition + slidesDragged >
          blazeSlider.totalSlides - 1
        ) {
          wrapToRight(blazeSlider, 1)
        }
      }
    }

    initialClientX = e.clientX
    const slideAmount = slideVector - diff
    setCSSVar(blazeSlider, '--blaze-slide-amount', slideAmount + 'px')
    slideVector = slideAmount
  }

  function handlePointerDown(event: PointerEvent) {
    if (!blazeSlider.slideWidth) {
      blazeSlider.slideWidth = Number(
        getComputedStyle(blazeSlider.slides[0]).width.slice(0, -2)
      )
    }

    if (grabCursor) {
      track.style.cursor = 'grabbing'
    }
    // capture all events of this pointerId and consider it as it is meant for track only
    track.setPointerCapture(event.pointerId)
    disableTransition(blazeSlider)
    event.preventDefault()
    posInitial = slideVector

    initialClientX = event.clientX
    track.onpointermove = handlePointerMove
    track.onpointerup = handlePointerUp
  }

  track.onpointerdown = handlePointerDown
}
