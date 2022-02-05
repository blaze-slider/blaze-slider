import { BlazeSlider } from '../BlazeSlider'
import { scrollGreaterThanMaxPossibleScroll } from '../dev/scroll'

export function testConfig(blazeSlider: BlazeSlider) {
  const { slides } = blazeSlider.config
  const { totalSlides } = blazeSlider

  // check for invalid config and fix
  if (slides.scroll > slides.show) {
    if (process.env.NODE_ENV !== 'production') {
      console.warn(
        'slides.scroll can not be greater than slides.show, that can skip certain slides'
      )
    }
    slides.scroll = slides.show
  }

  // number of slides that can be scrolled without visible slides being suddenly moved to another place
  const maxPossibleScroll = Math.floor(totalSlides - slides.show)

  // limit the scroll to maxPossibleScroll
  if (slides.scroll > maxPossibleScroll) {
    if (process.env.NODE_ENV !== 'production') {
      scrollGreaterThanMaxPossibleScroll(
        blazeSlider,
        slides.scroll,
        maxPossibleScroll
      )
    }

    slides.scroll = maxPossibleScroll
  }

  // maxScroll must also be multiple of scroll to maintain the page order
  blazeSlider.maxScroll =
    Math.floor(maxPossibleScroll / slides.scroll) * slides.scroll
}
