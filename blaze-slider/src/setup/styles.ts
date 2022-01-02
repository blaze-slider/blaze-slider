import { BlazeSlider } from '../BlazeSlider'
import { setCSSVar } from '../dom/setCSSVar'

const slidesToShow = '--blaze-slides-to-show'
const slideGap = '--blaze-slide-gap'
const transitionTimingFunction = '--blaze-ttf'
const transitionDuration = '--blaze-td'
const slidesToScroll = '--blaze-slides-to-scroll'
export const $offset = '--blaze-offset'

export function setupStyles(blazeSlider: BlazeSlider) {
  const { show, gap, scroll } = blazeSlider.config.slides
  const { timingFunction, duration } = blazeSlider.config.transition

  // set css variables
  setCSSVar(blazeSlider, $offset, 0 + '')
  setCSSVar(blazeSlider, slidesToShow, show + '')
  setCSSVar(blazeSlider, slideGap, gap)
  setCSSVar(blazeSlider, transitionTimingFunction, timingFunction)
  setCSSVar(blazeSlider, transitionDuration, duration)
  setCSSVar(blazeSlider, slidesToScroll, scroll + '')
}
