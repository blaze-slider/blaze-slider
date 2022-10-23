# Slider Benchmark

### How to run the benchmark?

- Build and start the server using the below shown commands

```
npm i
npm run build
npm run preview
```

- Open http://localhost:8080/
- Throttle the CPU using Chrome Devtools
- See the logs in Console or run Performance Profiler

<br/>

## Main Thread Blocking Comparion

<br/>

| Rank | Library   | Time    | Speed              |
| ---- | --------- | ------- | ------------------ |
| 1    | Blaze ⚡️ | 2.1ms   | **1**x             |
| 2    | Glide     | 12.2ms  | **5.8**x _slower_  |
| 3    | Flickity  | 13.29ms | **6.32**x _slower_ |
| 4    | Swiper    | 29.8ms  | **14.2**x _slower_ |
| 5    | Slick     | 60.0ms  | **28.5**x _slower_ |

( Tested on Macbook Pro 16" with M1 Pro CPU, 6X CPU Throttling on Chrome 103 )

<br/>

### Main Thread Profile

<img src='./docs/blocking.png'>
