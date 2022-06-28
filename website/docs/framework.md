---
sidebar_position: 6
---

# Framework Integration

Blaze Slider is framework agnostic, all it requires is DOM element to initialize the slider on and configuration object.

All Frameworks provide some way to get the underlying DOM element it renders For example

- React's [Ref API](https://reactjs.org/docs/refs-and-the-dom.html)
- Svelte's [this binding API](https://svelte.dev/tutorial/bind-this)
- Vue's [Template Refs API](https://vuejs.org/guide/essentials/template-refs.html)
- Solid's [Ref API](https://www.solidjs.com/docs/latest/api#ref)

<br/>

# Example: React

in React, we can create a custom hook for initializing the blaze-slider as shown below

```javascript
import React from 'react'
import BlazeSlider from 'blaze-slider'

function useBlazeSlider(config) {
  const sliderRef = React.useRef()
  const elRef = React.useRef()

  React.useEffect(() => {
    // if not already initialized
    if (!sliderRef.current) {
      sliderRef.current = new BlazeSlider(elRef.current, config)
    }
  }, [])

  return elRef
}
```

The above little utility function is also available on NPM via [blaze-slider-react](https://www.npmjs.com/package/blaze-slider-react) package

### Using in React Components

```jsx
function App() {
  const elRef = useBlazeSlider({
    all: {
      slidesToShow: 3,
    },
  })

  return (
    <div className="blaze-slider" ref={elRef}>
      <div className="blaze-container">
        <div className="blaze-track-container">
          <div className="blaze-track">
            <div> 1 </div>
            <div> 2 </div>
            <div> 3 </div>
            <div> 4 </div>
          </div>
        </div>
      </div>
    </div>
  )
}
```
