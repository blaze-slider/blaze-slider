import React, { useState } from 'react'
import { ExampleSlider } from './index'
import './layout-shift-slider.css'

export const LayoutShiftSlider = ({ config, children, shift, className }) => {
  const [status, setStatus] = useState('after')

  const getRef = (ref) => {
    if (!shift) return
    if (!ref.current) return
    if (status === 'before') {
      ref.current.style.setProperty('--slides-to-show', shift[0])
    } else {
      ref.current.style.setProperty('--slides-to-show', shift[1])
    }
  }

  return (
    <div
      className={`layout-shift-slider ${
        status === 'before' ? 'before-js' : 'after-js'
      } ${className || ''}`}
    >
      <div className="buttons-container">
        <button onClick={() => setStatus('before')} className="before">
          Before JS Execution
        </button>
        <button onClick={() => setStatus('after')} className="after">
          After JS Execution
        </button>
      </div>

      <ExampleSlider config={config} getRef={getRef}>
        {children}
      </ExampleSlider>
    </div>
  )
}
