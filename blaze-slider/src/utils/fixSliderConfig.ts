import { Automata } from '../automata/automata'
import { DEV } from '../constants'

/**
 * it fixes below scenarios which are wrong (and adds a warning in console in development)
 * - config.slidesToShow greater than totalSlides
 * - config.slidesToScroll greater than config.slidesToShow which skips showing certain slides
 * - config.slidesToScroll too high such that it causes glitches
 */
export function fixSliderConfig(slider: Automata) {
  const { slidesToScroll, slidesToShow } = slider.config
  const { totalSlides, config } = slider
  if (totalSlides < slidesToShow) {
    if (DEV) {
      console.warn(
        'slidesToShow can not be larger than number of slides. Setting slidesToShow = totalSlides instead.'
      )
    }
    config.slidesToShow = totalSlides
  }

  if (totalSlides <= slidesToShow) {
    // return because slidesToScroll does not need to be checked
    return
  }

  // detect slider skipping
  if (slidesToScroll > slidesToShow) {
    if (DEV) {
      console.warn(
        'slidesToScroll can not be greater than slidesToShow. Setting slidesToScroll = slidesToShow instead'
      )
    }
    config.slidesToScroll = slidesToShow
  }

  // detect slider jumping glitch
  if (totalSlides < slidesToScroll + slidesToShow) {
    const properSlidesToScroll = totalSlides - slidesToShow
    if (DEV) {
      console.warn(
        `slidesToScroll = ${slidesToScroll} is too large for a slider with ${totalSlides} slides with slidesToShow=${slidesToShow}, setting max possible slidesToScroll = ${properSlidesToScroll} instead.`
      )
    }
    config.slidesToScroll = properSlidesToScroll
  }
}
