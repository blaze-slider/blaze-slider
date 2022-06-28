---
sidebar_position: 1
---

# BlazeSlider

BlazeSlider is a constructor function which is used for initializing the slider on a `div.blaze-slider` element

```typescript
new BlazeSlider(
  el: HTMLElement,
  blazeConfig?: BlazeConfig
)
```

First argument is the `div.blaze-slider` element on which you want to initialize the slider

Second argument is the blaze-slider [configuration](/docs/api/BlazeConfig)

<br/>

### Example: No Config

```javascript
const el = document.querySelector('.blaze-slider')

const slider = new BlazeSlider(el)
```

### Example: With Config

```javascript
const el = document.querySelector('.blaze-slider')

const slider = new BlazeSlider(el, {
  all: {
    slidesToShow: 1,
    loop: true,
  },
  '(min-width: 700px)': {
    slidesToShow: 2,
  },
  '(min-width: 1000px)': {
    slidesToShow: 3,
    loop: false,
  },
})
```
