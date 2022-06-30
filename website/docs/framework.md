---
sidebar_position: 6
---

# Framework Integration

Blaze Slider is framework agnostic, all it requires is the DOM element on which you want to initialize the slider and configuration object.

All Frameworks provide a way to get the underlying DOM element once the framework has rendered the component.

Such as:

- React's [Ref API](https://reactjs.org/docs/refs-and-the-dom.html)
- Svelte's [this binding API](https://svelte.dev/tutorial/bind-this)
- Vue's [Template Refs API](https://vuejs.org/guide/essentials/template-refs.html)
- Solid's [Ref API](https://www.solidjs.com/docs/latest/api#ref)

<br/>

You can use this API to get the reference to the DOM element and then initialize the slider with `BlazeSlider` constructor

:::caution

You must make sure that you don't initialize the BlazeSlider on the same element more than once!
:::

<hr />

# Example: React

In React, you can create a custom hook to integrate blaze-slider with react in a reusable way.

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

The above function is also available on NPM via [react-blaze-react](https://www.npmjs.com/package/react-blaze-slider) package. You can use this package if you like, or create a custom hook or component - whatever you prefer.

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
