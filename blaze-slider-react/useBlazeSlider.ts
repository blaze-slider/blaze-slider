import type { BlazeConfig } from 'blaze-slider'
import BlazeSlider from 'blaze-slider'
import React from 'react'

export function useBlazeSlider(config: BlazeConfig) {
  const sliderRef = React.useRef<BlazeSlider>()
  const elRef = React.useRef<HTMLDivElement | null>(null)

  React.useEffect(() => {
    // if not already initialized
    if (!sliderRef.current) {
      new BlazeSlider(elRef.current!, config)
    }
    // eslint-disable-next-line
  }, [])

  return elRef
}
