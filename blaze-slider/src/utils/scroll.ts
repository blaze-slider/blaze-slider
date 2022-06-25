import { BlazeSlider } from '../slider'
import {
  noLoopScroll,
  disableTransition,
  setOffset,
  wrapPrev,
  enableTransition,
  resetOffset,
  wrapNext,
} from './methods'

const rAf = requestAnimationFrame

export function scrollPrev(slider: BlazeSlider, slideCount: number) {
  if (!slider.config.loop) {
    noLoopScroll(slider)
  } else {
    disableTransition(slider)
    setOffset(slider, -1 * slideCount) // move the elements to start

    wrapPrev(slider, slideCount) // move the track so it looks like nothing is changed

    const reset = () => {
      rAf(() => {
        enableTransition(slider)
        rAf(() => {
          resetOffset(slider) // reset the offset to move the slider to new position
        })
      })
    }
    // if the scroll was done as part of dragging
    // reset should be done after the dragging is completed
    if (slider.isDragging) {
      slider.track.addEventListener('pointerup', reset, { once: true })
    } else {
      rAf(reset)
    }
  }
}

// <--- move slider to left for showing content on right
export function scrollNext(slider: BlazeSlider, slideCount: number) {
  if (!slider.config.loop) {
    noLoopScroll(slider)
  } else {
    // apply offset and let the slider scroll from  <- (right to left)
    setOffset(slider, -1 * slideCount)

    // once the transition is done
    setTimeout(() => {
      // remove the elements from start that are no longer visible and put them at the end
      wrapNext(slider, slideCount)
      disableTransition(slider)

      // disable transition and reset offset to prevent jumping
      rAf(() => {
        resetOffset(slider)
        // after that, enable transition again
        rAf(() => {
          enableTransition(slider)
        })
      })
    }, slider.config.transitionDuration)
  }
}
