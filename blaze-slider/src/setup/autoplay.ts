import { BlazeSlider } from '../BlazeSlider'

export function handleAutoplay(blazeSlider: BlazeSlider) {
  const { config, slider } = blazeSlider

  blazeSlider.autoplay = {
    intervalId: 0,
    interactionDone: false,
  }

  window.addEventListener('load', () => {
    blazeSlider.play()
  })

  if (config.autoplay.pauseOnHover) {
    slider.addEventListener('mouseover', () => {
      blazeSlider.pause()
    })
    slider.addEventListener('mouseout', () => {
      blazeSlider.play()
    })
  }

  // stopOnInteraction
  if (config.autoplay.stopOnInteraction) {
    slider.addEventListener(
      'click',
      () => {
        blazeSlider.autoplay!.interactionDone = true
        blazeSlider.pause()
      },
      { once: true }
    )
  }
}
