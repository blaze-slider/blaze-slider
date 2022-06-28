# blaze-slider-react

A lightweight hook to integration blaze-slider with react.

<br/>

## Installation

```bash
npm i blaze-slider react-blaze-slider
```

## Usage

```jsx
import { useBlazeSlider } from 'react-blaze-slider'
import 'blaze-slider/dist/blaze.css'

function Example() {
  const ref = useBlazeSlider({
    all: {
      slidesToShow: 3,
    },
  })

  return (
    <div className="App">
      <div className="blaze-slider" ref={ref}>
        <div className="blaze-container">
          <div className="blaze-track-container">
            <div className="blaze-track">
              <div> 1 </div>
              <div> 2 </div>
              <div> 3 </div>
              <div> 4 </div>
              <div> 5 </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
```

# Live Demo

Checkout this [sandbox](https://codesandbox.io/s/react-blaze-slider-3g6cw1?file=/src/App.tsx) to see the live demo

<br/>

## Blaze Slider Documentation

Checkout the Website [blaze-slider.dev](https://blaze-slider.dev/) for Documentation about the blaze-slider core library.
