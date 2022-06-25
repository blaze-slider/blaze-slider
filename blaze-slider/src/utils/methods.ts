import { NO_TRANSITION, __OFFSET } from '../constants'
import { BlazeSlider } from '../slider'

export function disableTransition(slider: BlazeSlider) {
  slider.el.classList.add(NO_TRANSITION)
}

export function enableTransition(slider: BlazeSlider) {
  slider.el.classList.remove(NO_TRANSITION)
}

export function resetOffset(slider: BlazeSlider) {
  slider.el.style.setProperty(__OFFSET, '0')
}

export function noLoopScroll(slider: BlazeSlider) {
  setOffset(slider, -1 * slider.states[slider.stateIndex].page[0])
}

export function setOffset(slider: BlazeSlider, offset: number) {
  slider.el.style.setProperty(__OFFSET, offset + '')
}

export function wrapPrev(slider: BlazeSlider, count: number) {
  const len = slider.slides.length
  for (let i = 0; i < count; i++) {
    // pick the last and move to first
    const slide = slider.slides[len - 1]
    // @ts-ignore
    slider.track.prepend(slide)
  }
}

export function wrapNext(slider: BlazeSlider, count: number) {
  for (let i = 0; i < count; i++) {
    slider.track.append(slider.slides[0])
  }
}

export function setDrag(slider: BlazeSlider, amount: number) {
  slider.el.style.setProperty('--dragged', amount + '')
}
