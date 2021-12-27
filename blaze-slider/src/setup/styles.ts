import { Rollify } from '../index'

const slidesCount = '--rollify-total-slides'
const slidesToShow = '--rollify-slides-to-show'
const slideGap = '--rollify-item-gap'
const transitionTimingFunction = '--rollify-ttf'
const transitionDuration = '--rollify-td'
const slidesToScroll = '--rollify-slides-to-scroll'
export const $offset = '--rollify-offset'

export function setupStyles (rollify: Rollify) {
  const { show, gap, scroll } = rollify.config.slides
  const { timingFunction, duration } = rollify.config.transition

  // set css variables
  rollify.setOffset(0)
  rollify.setCSSVar(slidesCount, rollify.totalSlides + '')
  rollify.setCSSVar(slidesToShow, show + '')
  rollify.setCSSVar(slideGap, gap)
  rollify.setCSSVar(transitionTimingFunction, timingFunction)
  rollify.setCSSVar(transitionDuration, duration)
  rollify.setCSSVar(slidesToScroll, scroll + '')
}
