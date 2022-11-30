<img src="https://raw.githubusercontent.com/blaze-slider/blaze-slider/main/assets/BlazeLogo.svg" height='150' />

# Blaze Slider

⚡️ [blaze-slider.dev](https://blaze-slider.dev/)

Blaze slider is a high-performance JavaScript UI library for creating sliders.

## The Problem

Existing slider libraries are not designed with performance in mind. They block the main thread for a long time when initializing a slider which results in poor UX and poor [FID](https://web.dev/fid/) metric for your website.

They also create layout shifts that negatively impact the UX and [CLS](https://web.dev/cls/) metric of your website. These libraries don't provide any idiomatic way to reduce the layout shifts.

## The Solution

Blaze slider is built to fix these issues. It can initialize the slider incredibly fast. It initializes the slider **30x faster** than the Slick slider, and **15x faster** than the Swiper slider.

Blaze Slider allows you to specify the layout configuration via CSS variables which enable slider initialization with <span className='wow'>zero layout shifts!</span> - so that your slider will look exactly the same before and after javascript runs.

## Benchmark

| Rank | Library   | Time    | Speed              | Layout Shift Fixable? |
| ---- | --------- | ------- | ------------------ | --------------------- |
| 1    | Blaze ⚡️ | 1.4ms   | **1**x             | Yes                   |
| 2    | Keen      | 6.3ms   | **4.5**x _slower_  | Yes - Manually\*      |
| 3    | Embla     | 7.5ms   | **5.3**x _slower_  | Yes - Manually\*      |
| 4    | Glide     | 10.0ms  | **7.14**x _slower_ | Yes - Manually\*      |
| 5    | Flickity  | 12.3ms  | **8.78**x _slower_ | Yes - Manually\*      |
| 6    | Swiper    | 28.3ms  | **20.2**x _slower_ | Yes - Manually\*      |
| 7    | Slick     | 49.29ms | **35.2**x _slower_ | Yes - Manually\*      |

Manually\* means that the slider library itself does not provide an idiomatic way to fix the layout shift. You have to manually add CSS to fix the layout shifts

<br/>

<img src='https://raw.githubusercontent.com/blaze-slider/blaze-slider/main/assets/profile.png'/>

<br/>

Benchmark measures the time taken to create a slider with 10 slides by each slider. Benchmark is measured on Apple M1 Pro CPU with 6X slowdown on Google Chrome 103. The Average of 20 runs is taken.

See [Benchmark Repo](https://github.com/blaze-slider/blaze-slider/tree/main/benchmark) to see how these libraries are tested

<br/>

## Highlights

- Fastest Slider Library
- Packed with Features
- Zero Layout Shifts
- Full TypeScript support
- CSS Media-Query-based Responsive configuration
- No slide cloning
- Extremely small bundle size (2kB)

<br/>

## Documentation

You can check out the documentation on the website [blaze-slider.dev](https://blaze-slider.dev/)

The documentation is divided into several sections:

- [Getting Started](https://blaze-slider.dev/docs/intro)
- [Installation](http://blaze-slider.dev/docs/installation)
- [Tutorial](https://blaze-slider.dev/docs/category/tutorial)
- [API Reference](https://blaze-slider.dev/docs/category/api)

<br/>

## Framework Integrations

Blaze Slider is framework agnostic - it can work with all frameworks, all it requires is the DOM element on which you want to initialize the slider and configuration object. [Learn More](https://blaze-slider.dev/docs/framework)

Here are some prebuilt integrations:

- React - [react-blaze-slider](https://github.com/blaze-slider/blaze-slider/tree/main/blaze-slider-react)

## License

Blaze-slider is MIT licensed.
