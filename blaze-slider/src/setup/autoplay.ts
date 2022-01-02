import { BlazeSlider } from '../BlazeSlider'

export function handleAutoplay(blazeSlider: BlazeSlider) {
  const { config, slider, swipeLeft, swipeRight } = blazeSlider
  let autoplayInterval: NodeJS.Timer
  let interactionDone = false

  function autoplayStart() {
    if (interactionDone) return
    const fn = config.autoplay.toLeft
      ? swipeLeft.bind(blazeSlider)
      : swipeRight.bind(blazeSlider)
    autoplayInterval = setInterval(() => {
      requestAnimationFrame(fn)
    }, config.autoplay.interval)
  }

  function autoplayStop() {
    clearInterval(autoplayInterval)
  }

  if (config.autoplay.enabled) {
    // to prevent layout shifts during page load, start autoplay after the page load is done
    window.addEventListener('load', autoplayStart)

    // stopOnInteraction
    if (config.autoplay.stopOnInteraction) {
      slider.addEventListener(
        'click',
        () => {
          interactionDone = true
          autoplayStop()
        },
        { once: true }
      )
    }

    // pauseOnHover
    if (config.autoplay.pauseOnHover) {
      slider.addEventListener('mouseover', autoplayStop)
      slider.addEventListener('mouseout', autoplayStart)
    }
  }
}
