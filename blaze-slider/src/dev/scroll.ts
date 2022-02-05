import { BlazeSlider } from '../BlazeSlider'

export function scrollGreaterThanMaxPossibleScroll(
  blazeSlider: BlazeSlider,
  scroll: number,
  maxPossibleScroll: number
) {
  console.warn(
    `slides.scroll:`,
    scroll,
    `is too high for`,
    blazeSlider.totalSlides,
    `slides in below slider:`,
    blazeSlider.slider,
    '\n\n setting the maximum possible slides.scroll:',
    maxPossibleScroll,
    'instead'
  )
}
