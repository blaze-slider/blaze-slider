// swiper
import { Swiper } from 'swiper';
import 'swiper/css';
// blaze
import { BlazeSlider } from '../../blaze-slider/src/index';
import '../../blaze-slider/src/styles.css';
// page styles
import './style.css';


performance.mark('blaze-slider-start');
const blazeTarget = document.querySelector('.blaze-slider') as HTMLElement;
new BlazeSlider(blazeTarget);
performance.mark('blaze-slider-end');
performance.measure('blaze-slider', 'blaze-slider-start', 'blaze-slider-end');



performance.mark('swiper-slider-start');
const swiperTarget = document.querySelector('.swiper') as HTMLElement;
new Swiper(swiperTarget, {
  loop: true,
  spaceBetween: 10
})
performance.mark('swiper-slider-end');
performance.measure('swiper-slider', 'swiper-slider-start', 'swiper-slider-end');


performance.mark('slick-slider-start');
// @ts-ignore
jQuery('.my-slick-slider').slick({
  arrows: false,
})
performance.mark('slick-slider-end');
performance.measure('slick-slider', 'slick-slider-start', 'slick-slider-end');