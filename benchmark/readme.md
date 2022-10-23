# Slider Benchmark

### How to run the benchmark?

- Build and start the server using the below-shown commands

```
npm i
npm run bench
```

- Open http://localhost:3030/ in the incognito tab (make sure no extensions are running)
- Throttle the CPU to 6X using Chrome Devtools to emulate Mobile Device CPU
- See the logs in the Console or run Performance Profiler

<br/>

## Main Thread Blocking Comparison

<br/>

| Rank | Library   | Time    | Speed              | Layout Shift Fixable? |
| ---- | --------- | ------- | ------------------ | --------------------- |
| 1    | Blaze ⚡️ | 1.4ms   | **1**x             | Yes                   |
| 2    | Keen      | 6.3ms   | **4.5**x _slower_  | Yes - Manually\*      |
| 3    | Embla     | 7.5ms   | **5.3**x _slower_  | Yes - Manually\*      |
| 4    | Glide     | 10.0ms  | **7.14**x _slower_ | Yes - Manually\*      |
| 5    | Flickity  | 12.3ms  | **8.78**x _slower_ | Yes - Manually\*      |
| 5    | Swiper    | 28.3ms  | **20.2**x _slower_ | Yes - Manually\*      |
| 5    | Slick     | 49.29ms | **35.2**x _slower_ | Yes - Manually\*      |

Manually\* means that the slider library itself does not provide an idiomatic way to fix the layout shift. You have to manually add CSS to fix the layout shifts

Refer to [this CSS file](https://github.com/blaze-slider/blaze-slider/tree/main/benchmark/src/layout-shift-fixes.css) to see how to fix layout shifts in each slider library.

<br/>

### Main Thread Profile comparison

<img src='https://raw.githubusercontent.com/blaze-slider/blaze-slider/main/assets/blocking.png'/>

### Test details

Benchmark Tested on

- Hardware: Macbook Pro 16" (2021 Model) with M1 Pro CPU
- Software: Performance Profiler in 6X CPU Throttling on Chrome 103.
- Method: Average of 20 runs
