<br />

<img src="assets/BlazeSlider.svg" />

<br />
<br />

# Blaze Slider

Blazing fast slider for high performance web

<br/>

## Features

- Fastest Slider Library
- Looping supported without slide cloning
- Expressive css media-query based config
- Full TypeScript support
- Extremely small bundle size

<br/>

## Performance Benchmark

| Library | Time   | Compare |
| ------- | ------ | ------- |
| Blaze   | 2.2ms  | 1x      |
| Glide   | 18.1ms | 8.2x    |
| Swiper  | 31.4ms | 14.2x   |
| Slick   | 67.3ms | 30.5x   |

[More Details about this Benchmark](https://github.com/blaze-slider/blaze-slider/tree/main/benchmark)

<br/>

### ESM

```bash
npm i blaze-slider
```

```javascript
import BlazeSlider from 'blaze-slider'

new BlazeSlider(el, settings?);
```

<br/>

### UMD

Download the `dist/blaze-slider.js` and use it via script tag

```html
<script src="/path/to/the/blaze-slider.js"></script>
```

After this script is executed, you will get access to a global constructor function `BlazeSlider`

```javascript
new BlazeSlider(sliderEl, options?)
```

<br/>

## Types

```typescript
type Config = {
	grabCursor?: boolean;
	threshold?: number;
	slides?: {
		loop?: boolean;
		show?: number;
		scroll?: number;
		gap?: string;
		draggable?: boolean;
	};
	navigation?:
		| {
				prev: HTMLElement;
				next: HTMLElement;
		  }
		| false;
	pagination?: HTMLElement | false;
	transition?: {
		timingFunction?: string;
		duration?: string;
	};
	autoplay?: {
		enabled?: boolean;
		interval?: number;
		toLeft?: boolean;
		stopOnInteraction?: boolean;
		pauseOnHover?: boolean;
	};
};

type BlazeSettings = {
	media: {
		[K: string]: Config;
	};
};
```

<br/>

### Default Config

```javascript
{
  grabCursor: false,
  slides: {
    show: 1,
    scroll: 1,
    gap: '10px',
    draggable: true
  },
  navigation: false,
  pagination: false,
  transition: {
    timingFunction: 'ease',
    duration: '300ms'
  },
  autoplay: {
    enabled: false,
    interval: 3000,
    toLeft: false,
    stopOnInteraction: true,
    pauseOnHover: true
  }
}
```
