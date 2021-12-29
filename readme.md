# blaze-slider

### Blazing Fast Slider 🔥

<br/>

## Features

- Fastest Slider Library
- Looping supported without slide cloning
- Expressive css media-query based config
- Full TypeScript support
- Extremely small bundle size

<br/>

## Performance Benchmark

| Library      | Time   |
| ------------ | ------ |
| blaze-slider | 3.2ms  |
| swiper       | 40.7ms |
| slick        | 59.7ms |

Benchmark compares the time taken by each library to render 1 slider with 10 slides with same config and same style

<br/>

## ESM

```bash
npm i blaze-slider
```

```javascript
import { blazeSlider } from 'blaze-slider'

blazeSlider(el, settings?);
```

<br/>

## UMD

download the `dist/blaze-slider.js` and use it via script tag

```html
<script src="/path/to/the/blaze-slider.js"></script>
```

after this script is executed, you will get access to a global function `blazeSlider`

```
blazeSlider(sliderEl, options?)
```

<br/>

### Example

```javascript
const slider = document.querySelector('.blaze-slider');

new BlazeSlider(slider);
```
