import { BlazeSlider } from '../BlazeSlider'
import { setCSSVar } from '../dom/setCSSVar'
import { swipe } from '../dom/swipe'
import { disableTransition, enableTransition } from '../dom/transition'
import { wrapToLeft, wrapToRight } from '../dom/wrap'

const grabbingClass = 'grabbing'

export function handleDrag(blazeSlider: BlazeSlider) {
  const { track, slider } = blazeSlider
  const { scroll } = blazeSlider.config.slides

  let initialClientX: number

  // pixels dragged
  let slideVector = 0

  // number of slide-width length of drag done
  let slidesDragged = 0

  const { threshold } = blazeSlider.config

  function handlePointerUp() {
    slider.classList.remove(grabbingClass)

    // scroll in multiples of config.scroll
    let swipeAmount = scroll
    if (slidesDragged > scroll) {
      swipeAmount = Math.ceil(slidesDragged / scroll) * scroll
      // scroll can not be larger than maxScroll
      swipeAmount = Math.min(swipeAmount, blazeSlider.maxScroll)
    }

    if (slideVector < -threshold) {
      swipe(blazeSlider, swipeAmount)
    } else if (slideVector > threshold) {
      swipe(blazeSlider, -1 * swipeAmount)
    } else {
      enableTransition(blazeSlider)
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

    // limit the slidesDragged to be less maxScroll also
    if (slidesDragged <= blazeSlider.maxScroll) {
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
    }

    const slideAmount = slideVector - diff

    if (Math.abs(slideAmount) < blazeSlider.maxSlideAmount) {
      initialClientX = e.clientX
      setCSSVar(blazeSlider, '--blaze-slide-amount', slideAmount + 'px')
      slideVector = slideAmount
    } else {
      const dir = slideAmount < 0 ? -1 : 1
      slideVector = blazeSlider.maxSlideAmount * dir
      handlePointerUp()
    }
  }

  function handlePointerDown(event: PointerEvent) {
    if (!blazeSlider.slideWidth) {
      blazeSlider.slideWidth = Number(
        getComputedStyle(blazeSlider.slides[0]).width.slice(0, -2)
      )

      blazeSlider.maxSlideAmount =
        blazeSlider.slideWidth +
        blazeSlider.config.slides.gap * (blazeSlider.config.slides.show - 1)
    }

    slider.classList.add(grabbingClass)

    // capture all events of this pointerId and consider it as it is meant for track only
    track.setPointerCapture(event.pointerId)
    disableTransition(blazeSlider)
    event.preventDefault()

    initialClientX = event.clientX
    track.onpointermove = handlePointerMove
    track.onpointerup = handlePointerUp
  }

  track.onpointerdown = handlePointerDown
}
