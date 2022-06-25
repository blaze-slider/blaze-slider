// glide
// @ts-ignore
import Glide from '@glidejs/glide'
import '@glidejs/glide/dist/css/glide.core.min.css'
// flickity
// @ts-ignore
import Flickity from 'flickity'
import 'flickity/css/flickity.css'
// swiper
import { Swiper } from 'swiper'
import 'swiper/css'
// blaze
import { BlazeSlider } from 'blaze-slider'
import 'blaze-slider/dist/blaze.css'
// page styles
import './style.css'

async function sleep(time: number) {
  return new Promise((resolve) => setTimeout(resolve, time))
}

async function tester() {
  await sleep(300)
  let start: number, end: number

  // blaze slider -----------------------------

  const blazeTarget = document.querySelector('.blaze-slider') as HTMLElement
  const swiperTarget = document.querySelector('.swiper') as HTMLElement
  const flickityTarget = document.querySelector('.main-carousel')

  performance.mark('blaze-slider-start')
  start = performance.now()
  new BlazeSlider(blazeTarget, {
    media: {
      '(max-width: 9999px)': {
        slidesToShow: 3,
        slidesToScroll: 3,
        slideGap: '20px',
      },
    },
  })
  end = performance.now()
  console.log('blaze', end - start)
  performance.mark('blaze-slider-end')
  performance.measure('blaze-slider', 'blaze-slider-start', 'blaze-slider-end')

  await sleep(20)

  // glide slider -----------------------------
  performance.mark('glide-slider-start')
  start = performance.now()
  new Glide('.glide', {
    startAt: 0,
    perView: 3,
    gap: 20,
    swipeThreshold: 0,
    rewind: true,
  }).mount()
  end = performance.now()
  console.log('glide', end - start)
  performance.mark('glide-slider-end')
  performance.measure('glide-slider', 'glide-slider-start', 'glide-slider-end')

  await sleep(20)

  // swiper slider -----------------------------
  start = performance.now()
  performance.mark('swiper-slider-start')
  new Swiper(swiperTarget, {
    slidesPerView: 3,
    slidesPerGroup: 3,
    loop: true,
    spaceBetween: 20,
    resizeObserver: false,
  })
  end = performance.now()
  console.log('swiper', end - start)
  performance.mark('swiper-slider-end')
  performance.measure(
    'swiper-slider',
    'swiper-slider-start',
    'swiper-slider-end'
  )

  await sleep(20)

  // slick slider -----------------------------
  performance.mark('slick-slider-start')
  start = performance.now()

  // @ts-ignore
  // eslint-disable-next-line no-undef
  jQuery('.my-slick-slider').slick({
    arrows: false,
    slidesToShow: 3,
    slidesToScroll: 3,
  })
  end = performance.now()
  console.log('slick', end - start)
  performance.mark('slick-slider-end')
  performance.measure('slick-slider', 'slick-slider-start', 'slick-slider-end')

  await sleep(20)

  // flickity slider -----------------------------
  performance.mark('flickity-slider-start')
  start = performance.now()
  new Flickity(flickityTarget, {
    // options
    cellAlign: 'left',
    contain: true,
    wrapAround: true,
    groupCells: 3,
    dragThreshold: 0,
    pageDots: false,
    prevNextButtons: false,
  })

  end = performance.now()
  console.log('flickity', end - start)
  performance.mark('flickity-slider-end')
  performance.measure(
    'flickity-slider',
    'flickity-slider-start',
    'flickity-slider-end'
  )
}

tester()
