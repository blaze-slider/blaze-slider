// Glide
// @ts-ignore - No Types Available
import Glide from '@glidejs/glide'
import '@glidejs/glide/dist/css/glide.core.min.css'
// Flickity
// @ts-ignore - No Types Available
import Flickity from 'flickity'
import 'flickity/css/flickity.css'
// Swiper
import { Swiper } from 'swiper'
import 'swiper/css'
import BlazeSlider from 'blaze-slider'
import 'blaze-slider/dist/blaze.css'
// Embla
import EmblaCarousel from 'embla-carousel'
// Keen
import 'keen-slider/keen-slider.min.css'
import KeenSlider from 'keen-slider'

// page styles
import './style.css'
import './layout-shift-fixes.css'

async function sleep(time: number) {
  return new Promise((resolve) => setTimeout(resolve, time))
}

// if you change config,
// you will also have to make changes in layout-shift-fixes.css accordingly
const CONFIG = {
  TRANSITION_DURATION: 300,
  SLIDES_TO_SHOW: 3,
  SLIDES_TO_SCROLL: 3,
  LOOP: true,
  SLIDE_GAP: 20, // in pixels
}

async function initTest() {
  // get refs to elements
  const blazeTarget = document.querySelector('.blaze-slider') as HTMLElement
  const swiperTarget = document.querySelector('.swiper') as HTMLElement
  const flickityTarget = document.querySelector('.main-carousel')
  const emblaWrap = document.querySelector('.embla') as HTMLElement
  const emblaViewport = emblaWrap.querySelector(
    '.embla__viewport'
  ) as HTMLElement
  const KeenSliderTarget = document.getElementById(
    'my-keen-slider'
  ) as HTMLElement

  const results: Record<string, number> = {}

  async function test(name: string, cb: () => void) {
    await sleep(50)

    performance.mark(`${name}-start`)
    const start = performance.now()
    cb()
    const end = performance.now()
    results[name] = end - start
    performance.mark(`${name}-end`)
    performance.measure(name, `${name}-start`, `${name}-end`)
  }

  // start tests after 1 second
  console.log('%c BENCHMARK STARTED ', 'color: yellow; font-size: 20px;')
  await sleep(1000)

  // Note: buggy behavior when slidesToShow = 5, slidesToScroll = 2
  await test('slick', () => {
    // @ts-ignore
    // eslint-disable-next-line no-undef
    jQuery('.my-slick-slider').slick({
      arrows: false,
      speed: CONFIG.TRANSITION_DURATION,
      infinite: CONFIG.LOOP,
      slidesToShow: CONFIG.SLIDES_TO_SHOW,
      touchThreshold: 100, // 1/100 of the slider width
      slidesToScroll: CONFIG.SLIDES_TO_SCROLL,
    })
  })

  // Note: buggy behavior when slidesToShow = 5, slidesToScroll = 2
  await test('swiper', () => {
    new Swiper(swiperTarget, {
      slidesPerView: CONFIG.SLIDES_TO_SHOW,
      slidesPerGroup: CONFIG.SLIDES_TO_SCROLL,
      loop: CONFIG.LOOP,
      spaceBetween: CONFIG.SLIDE_GAP,
      resizeObserver: false,
      centeredSlides: false,
    })
  })

  await test('blaze', () => {
    new BlazeSlider(blazeTarget, {
      screen: {
        loop: CONFIG.LOOP,
        slidesToShow: CONFIG.SLIDES_TO_SHOW,
        slidesToScroll: CONFIG.SLIDES_TO_SCROLL,
        transitionDuration: CONFIG.TRANSITION_DURATION,
        slideGap: `${CONFIG.SLIDE_GAP}px`,
      },
    })
  })

  // Note: No option to specify slides to scroll
  // Does not support "real" infinite loop - it scrolls back to first position
  await test('glide', () => {
    new Glide('.glide', {
      startAt: 0,
      perView: CONFIG.SLIDES_TO_SHOW,
      animationDuration: CONFIG.TRANSITION_DURATION,
      gap: CONFIG.SLIDE_GAP,
      swipeThreshold: 10,
      rewind: CONFIG.LOOP,
    }).mount()
  })

  // Note: No option to configure transition duration
  // No option to specify gap - we create gap with css
  await test('flickity', () => {
    new Flickity(flickityTarget, {
      cellAlign: 'left',
      contain: true,
      wrapAround: true,
      resize: false,
      groupCells: CONFIG.SLIDES_TO_SHOW,
      dragThreshold: 0,
      pageDots: false,
      prevNextButtons: false,
    })
  })

  // Note: keeping the default "speed" for transition duration of 300
  // Note: Slides are not given proper width from JavaScript - we have to set it with CSS
  await test('Embla', () => {
    EmblaCarousel(emblaViewport, {
      slidesToScroll: CONFIG.SLIDES_TO_SHOW,
      loop: CONFIG.LOOP,
    })
  })

  await test('Keen', () => {
    new KeenSlider(KeenSliderTarget, {
      slides: {
        perView: CONFIG.SLIDES_TO_SHOW,
        spacing: CONFIG.SLIDE_GAP,
      },
      loop: CONFIG.LOOP,
    })
  })

  console.log('%c BENCHMARK COMPLETE ', 'color: green; font-size: 20px;')
  console.table(results)
}

initTest()
