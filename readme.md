<img src="assets/blaze-slider.svg" />

<br />

# Blaze Slider 🌈

⚡ **Fastest Slider Library**

✨ Feature Rich

🔁 No slide cloning

📱 CSS Media-Query based Responsive configuration

🌀 Full TypeScript support

🤏 Extremely small bundle size (1kB Gzipped)

🎨 inline CSS variable based configuration supported to remove layout shifts

<br/>
<br/>

## Blazing Fast Performance 🔥

<br/>

| Rank | Library  | Time    | Speed              |
| ---- | -------- | ------- | ------------------ |
| 1    | Blaze 🌈 | 2.1ms   | **1**x             |
| 2    | Glide    | 12.2ms  | **5.8**x _slower_  |
| 3    | Flickity | 13.29ms | **6.32**x _slower_ |
| 4    | Swiper   | 29.8ms  | **14.2**x _slower_ |
| 5    | Slick    | 60.0ms  | **28.5**x _slower_ |

<br/>

Benchmark measures the time taken to create a slider with 10 slides each with same configuration content and style

Benchmark is measured on Apple M1 Pro with 6X CPU slowdown on Google Chrome V103

See [Benchmark](/benchmark/src/main.ts) for more details

<br/>

---

<br/>

## Features

All features below are customizable and can be enabled or disabled

- Infinite Loop
- Drag & Swipe
- Custom number of slides to show and scroll
- pagination
- prev and next navigation
- autoplay
- pause autoplay on interaction
- pause autoplay on hover
- custom transition delay and timing function (effect)

## Installation

### Using as NPM module

```bash
npm i blaze-slider
```

Make sure that you import the styles.css as well. Without this CSS, blaze-slider will not work.

```javascript
import { BlazeSlider } from 'blaze-slider'
import 'blaze-slider/src/styles.css'

new BlazeSlider(element, options?)
```

<br/>

### Using the dist JS and CSS files

Get the JS and CSS dist files of a specific version of blaze-slider from unpkg.com

Example: V0.0.10

JavaScript

```
https://unpkg.com/blaze-slider@0.0.10/dist/blaze-slider.min.js
```

CSS

```
https://unpkg.com/blaze-slider@0.0.10/dist/blaze.css
```

Including the blaze-slider.min.js will make the `BlazeSlider` globally available can be used as follows:

<br/>

## Usage

### HTML

For blaze slider to work, wrap your slides with a `div.blaze-track` and wrap that with `div.blaze-slider`

Example:

```html
<div class="blaze-slider">
  <div class="blaze-track">
    <div>slide 1</div>
    <div>slide 2</div>
    <div>slide 3</div>
  </div>
</div>
```

### JavaScript

- get the `div.blaze-slider` element from DOM where you want to initialize the blaze-slider
- create an instance of blaze slider with optional configuration

Example

```javascript
const el = document.querySelector('.blaze-slider')
const blazeSlider = new BlazeSlider(el)
```
