import React from 'react'
import BlazeSlider from 'blaze-slider'
import 'blaze-slider/dist/blaze.css'

/**
 *
 * @param {import('blaze-slider').BlazeConfig} config
 */
export function useBlazeSlider(config) {
  const sliderRef = React.useRef()
  React.useEffect(() => {
    if (sliderRef.current.init) return
    if (config.all && config.all && !config.all.transitionDuration) {
      config.all.transitionDuration = 300
    }
    new BlazeSlider(sliderRef.current, config)
    sliderRef.current.init = true
  })

  return sliderRef
}
