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
    new BlazeSlider(sliderRef.current, config)
    sliderRef.current.init = true
  })

  return sliderRef
}
