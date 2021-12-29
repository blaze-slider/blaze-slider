// swiper
import { Swiper } from 'swiper';
import 'swiper/css';
// blaze
import { BlazeSlider } from '../../blaze-slider/src/index';
import '../../blaze-slider/src/styles.css';
// page styles
import './style.css';

async function sleep(time: number) {
	return new Promise(res => setTimeout(res, time));
}

async function tester() {
	await sleep(1000);

	performance.mark('blaze-slider-start');
	const blazeTarget = document.querySelector('.blaze-slider') as HTMLElement;
	new BlazeSlider(blazeTarget, {
		media: {
			'(max-width: 9999px)': {
				slides: {
					show: 3,
					scroll: 3,
					gap: '20px',
				},
			},
		},
	});
	performance.mark('blaze-slider-end');
	performance.measure('blaze-slider', 'blaze-slider-start', 'blaze-slider-end');

	await sleep(100);

	performance.mark('swiper-slider-start');
	const swiperTarget = document.querySelector('.swiper') as HTMLElement;
	new Swiper(swiperTarget, {
		slidesPerView: 3,
		slidesPerGroup: 3,
		loop: true,
		spaceBetween: 20,
	});
	performance.mark('swiper-slider-end');
	performance.measure('swiper-slider', 'swiper-slider-start', 'swiper-slider-end');

	await sleep(100);

	performance.mark('slick-slider-start');
	// @ts-ignore
	jQuery('.my-slick-slider').slick({
		arrows: false,
		slidesToShow: 3,
		slidesToScroll: 3,
	});
	performance.mark('slick-slider-end');
	performance.measure('slick-slider', 'slick-slider-start', 'slick-slider-end');
}

tester();
