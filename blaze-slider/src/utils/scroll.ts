import { BlazeSlider } from '../slider'
import { isTouch } from './drag'
import {
  noLoopScroll,
  wrapPrev,
  wrapNext,
  updateTransform,
  disableTransition,
  enableTransition,
} from './methods'

export function scrollPrev(slider: BlazeSlider, slideCount: number) {
  const rAf = requestAnimationFrame

  if (!slider.config.loop) {
    noLoopScroll(slider)
  } else {
    // shift elements and apply negative transform to make it look like nothing changed

    // disable transition
    disableTransition(slider)
    // apply negative transform
    slider.offset = -1 * slideCount
    updateTransform(slider)
    // and move the elements
    wrapPrev(slider, slideCount)

    const reset = () => {
      rAf(() => {
        enableTransition(slider)
        rAf(() => {
          slider.offset = 0
          updateTransform(slider)
          onSlideEnd(slider)
        })
      })
    }

    // if the scroll was done as part of dragging
    // reset should be done after the dragging is completed
    if (slider.isDragging) {
      if (isTouch()) {
        slider.track.addEventListener('touchend', reset, { once: true })
      } else {
        slider.track.addEventListener('pointerup', reset, { once: true })
      }
    } else {
      rAf(reset)
    }
  }
}

// <--- move slider to left for showing content on right
export function scrollNext(slider: BlazeSlider, slideCount: number) {
  const rAf = requestAnimationFrame

  if (!slider.config.loop) {
    noLoopScroll(slider)
  } else {
    // apply offset and let the slider scroll from  <- (right to left)
    slider.offset = -1 * slideCount
    updateTransform(slider)

    // once the transition is done
    setTimeout(() => {
      // remove the elements from start that are no longer visible and put them at the end
      wrapNext(slider, slideCount)

      disableTransition(slider)

      // apply transform where the slider should go
      slider.offset = 0
      updateTransform(slider)

      rAf(() => {
        rAf(() => {
          enableTransition(slider)
          onSlideEnd(slider)
        })
      })
    }, slider.config.transitionDuration)
  }
}

export function onSlideEnd(slider: BlazeSlider) {
  if (slider.onSlideCbs) {
    const state = slider.states[slider.stateIndex]
    const [firstSlideIndex, lastSlideIndex] = state.page
    slider.onSlideCbs.forEach((cb) =>
      cb(slider.stateIndex, firstSlideIndex, lastSlideIndex)
    )
  }
}
