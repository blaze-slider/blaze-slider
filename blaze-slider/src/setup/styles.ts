import { BlazeSlider } from '../BlazeSlider'

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
  blazeSlider.updateTrackOffset()
  blazeSlider.setCSSVar(slidesToShow, show + '')
  blazeSlider.setCSSVar(slideGap, gap)
  blazeSlider.setCSSVar(transitionTimingFunction, timingFunction)
  blazeSlider.setCSSVar(transitionDuration, duration)
  blazeSlider.setCSSVar(slidesToScroll, scroll + '')
}
