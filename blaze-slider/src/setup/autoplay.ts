import { Rollify } from '..'

export function setupAutoplay (rollify: Rollify) {
  const {
    config, slider, swipeLeft, swipeRight
  } = rollify
  // autoplay
  let autoplayInterval: NodeJS.Timer
  let interactionDone = false

  function autoplayStart () {
    if (interactionDone) return
    const fn = config.autoplay.toLeft ? swipeLeft.bind(rollify) : swipeRight.bind(rollify)
    autoplayInterval = setInterval(() => {
      requestAnimationFrame(fn)
    }, config.autoplay.interval)
  }

  function autoplayStop () {
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
