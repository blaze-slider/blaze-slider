<img height='200' src='https://raw.githubusercontent.com/blaze-slider/blaze-slider/main/blaze-slider-react/logo.svg' />

# react-blaze-slider

A lightweight hook to integrate [blaze-slider](https://github.com/blaze-slider/blaze-slider) with react

<br/>

## Installation

```bash
npm i blaze-slider react-blaze-slider
```

<br/>

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

<br/>

# Example

Checkout this [sandbox](https://codesandbox.io/s/react-blaze-slider-3g6cw1?file=/src/App.tsx) to see the live demo

<br/>

## Blaze Slider Documentation

check out the Website [blaze-slider.dev](https://blaze-slider.dev/) for Documentation about the blaze-slider core library.

The documentation is divided into several sections:

- [Getting Start](https://blaze-slider.dev/docs/intro)
- [Installation](http://blaze-slider.dev/docs/installation)
- [Tutorial](https://blaze-slider.dev/docs/category/tutorial)
- [API Reference](https://blaze-slider.dev/docs/category/api)

<br/>

## License

MIT
