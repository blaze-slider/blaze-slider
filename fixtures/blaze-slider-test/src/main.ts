import { BlazeSlider } from '../../../blaze-slider/src/index';
import '../../../blaze-slider/src/styles.css';
import './style.css';


const start = performance.now()
new BlazeSlider(document.querySelector('.blaze-slider')!, {
  media: {
    '(max-width: 9999px)': {
      slides: {
        show: 3,
        scroll:1,
        gap: '40px'
      },
      transition: {
        duration: '700ms',
        timingFunction: 'ease'
      }
    },
    '(max-width: 500px)': {
      slides: {
        show: 1,
        scroll: 1,
      }
    }
  }
})
const end = performance.now()
console.log(end - start)
