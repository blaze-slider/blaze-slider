# Blaze Slider

[![npm version](https://img.shields.io/npm/v/blaze-slider.svg)](https://www.npmjs.com/package/blaze-slider)
[![license](https://img.shields.io/npm/l/blaze-slider.svg)](https://github.com/blaze-slider/blaze-slider/blob/main/LICENSE)

A high-performance, lightweight carousel library built for speed with Zero layout shifts and minimal bundle size

**[Documentation](https://blaze-slider.dev/)** · **[Playground](https://codesandbox.io/s/blaze-slider-playground-ps0b9u)**

## Why Blaze Slider?

Most slider libraries weren't built with performance in mind. They:

- **Block the main thread** during initialization, hurting [FID](https://web.dev/fid/) and user experience
- **Cause layout shifts** that damage [CLS](https://web.dev/cls/) scores
- **Ship large bundles** that slow down page loads

Blaze Slider solves all of this:

- **30x faster** than Slick, **15x faster** than Swiper
- **Zero CLS** via CSS variable-based layout
- **2KB gzipped** — smaller than most slider libraries

## Benchmark

| Rank | Library      | Init Time | vs Blaze         |
| ---- | ------------ | --------- | ---------------- |
| 1    | **Blaze** ⚡ | 1.4ms     | —                |
| 2    | Keen         | 6.3ms     | 4.5x slower      |
| 3    | Embla        | 7.5ms     | 5.3x slower      |
| 4    | Glide        | 10.0ms    | 7.1x slower      |
| 5    | Flickity     | 12.3ms    | 8.8x slower      |
| 6    | Swiper       | 28.3ms    | 20x slower       |
| 7    | Slick        | 49.3ms    | 35x slower       |

<details>
<summary>Benchmark methodology</summary>

- 10 slides per slider
- Apple M1 Pro, Chrome 103, 6x CPU slowdown
- Average of 20 runs
- [See benchmark source](https://github.com/blaze-slider/blaze-slider/tree/main/benchmark)

</details>

<br/>

<img src='https://raw.githubusercontent.com/blaze-slider/blaze-slider/main/assets/profile.png' alt='Blaze Slider Performance Profile' />

## Features

- **Blazing fast** — 30x faster initialization than alternatives
- **Zero layout shifts** — CSS-first layout prevents CLS
- **Tiny bundle** — 2KB gzipped
- **Feature rich** — Touch, drag, autoplay, pagination, navigation, loop
- **Responsive** — Media query-based config, just like CSS
- **Unstyled** — No default theme to override
- **No cloning** — Infinite loop without duplicating slides
- **TypeScript** — Full type support


## License

MIT
