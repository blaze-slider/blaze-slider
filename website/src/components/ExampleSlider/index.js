import { useBlazeSlider } from '../../hooks/useBlazeSlider'
import React from 'react'
import './example-slider.css'
import '../../css/blaze-custom.css'

export const ExampleSlider = ({ children, config, addNav }) => {
  const ref = useBlazeSlider(config)
  return (
    <div className="example-slider">
      <div className="blaze-slider" ref={ref}>
        <div className="blaze-container">
          <div className="blaze-track-container">
            <div className="blaze-track">{children}</div>
          </div>

          {addNav && (
            <div className="my-structure">
              <button
                className="blaze-prev"
                aria-label="Go To previous slide"
              ></button>
              <div className="blaze-pagination"> </div>
              <button
                className="blaze-next"
                aria-label="Go to next slide"
              ></button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
