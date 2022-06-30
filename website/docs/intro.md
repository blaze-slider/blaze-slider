---
sidebar_position: 1
---

# Introduction

Blaze slider is a high-performance JavaScript UI library for creating sliders.

## The Problem

Existing slider libraries are not designed with performance in mind. They block the main thread for a long time when initializing a slider which results in poor UX and poor [FID](https://web.dev/fid/) metric for your website.

They also create layout shifts that negatively impact the UX and [CLS](https://web.dev/cls/) metric of your website. These libraries don't provide any idiomatic way to reduce the layout shifts.

## The Solution

Blaze slider is built to fix these issues. It can initialize the slider incredibly fast. It initializes the slider <span className='wow'>30x faster</span> than the Slick slider, and <span className='wow'>15x faster</span> than the Swiper slider.

Blaze Slider allows you to specify the layout configuration via CSS variables which enable slider initialization with <span className='wow'>zero layout shifts!</span> - so that your slider will look exactly the same before and after javascript runs.

## Highlights ✨

- The Fastest Slider Library
- Zero layout shifts by providing a CSS config
- Tons of features and fully customizable
- Powerful CSS Media Query-based responsive configuration
- No slide cloning
- Full TypeScript support
- Extremely small bundle size (~2KB)

## Blazing Fast Performance 🔥

<br/>

| Speed Rank                      | Slider Library                      | Time to initialize                   | Speed Comparison                 |
| ------------------------------- | ----------------------------------- | ------------------------------------ | -------------------------------- |
| <span className='wow'>1 </span> | <span className='wow'>Blaze </span> | <span className='wow'>2.1 ms </span> | <span className='wow'>1x </span> |
| 2                               | Glide                               | 12.2 ms                              | **5.8**x _slower_                |
| 3                               | Flickity                            | 13.29 ms                             | **6.32**x _slower_               |
| 4                               | Swiper                              | 29.8 ms                              | **14.2**x _slower_               |
| 5                               | Slick                               | 60.0 ms                              | **28.5**x _slower_               |

<br/>

Benchmark measures the time taken to create a slider with 10 slides by each slider, which is reported in the above table as "Time to initialize" ( all libraries configured with the same configuration, content and style )

Benchmark is measured on Apple M1 Pro CPU with 6X slowdown on Google Chrome 103

See [Benchmark Repo](https://github.com/blaze-slider/blaze-slider/tree/main/benchmark) to see how these libraries are tested
