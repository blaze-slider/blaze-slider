---
sidebar_position: 1
---

# Introduction

Blaze slider is a _high performance_ JavaScript UI library for creating sliders

The problem with existing slider libraries is that they are not designed with performance in mind, they block the main thread for a long time when initializing a slider which results in bad [FID](https://web.dev/fid/) metric for your website.

They also create layout shifts which negatively impact the user experience and [CLS](https://web.dev/cls/) metric of your website and they don't (or can't) provide any way to reduce layout shifts, and often times there is no way to avoid layout shifts when you use these libraries because of how they initialize the sliders.

Blaze Slider is built to fix these issues. It can initialize the slider <span className='wow'>30x faster</span> than the most popular slider library - slick slider, and <span className='wow'>15x faster</span> than swiper slider. blaze-slider allows you to specify the configuration via css variables which allows slider initialization with <span className='wow'>zero layout shifts</span> - so that your slider will look exactly before and after javascript runs.

## Highlights ✨

- The Fastest Slider Library
- Zero layout shifts
- Tons of features and fully customizable
- Powerful CSS Media Query based responsive configuration
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

Benchmark measures the time taken to create a slider with 10 slides by each slider, which is reported in above table as "Time to initialize" ( all libraries configured with same configuration, content and style )

Benchmark is measured on Apple M1 Pro CPU with 6X slowdown on Google Chrome 103

See [Benchmark Repo](https://github.com/blaze-slider/blaze-slider/tree/main/benchmark) for more details
