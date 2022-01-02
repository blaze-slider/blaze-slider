import { BlazeSlider } from '../BlazeSlider'

export function disableTransition(blazeSlider: BlazeSlider) {
  blazeSlider.track.style.transition = 'none'
}

export function enableTransition(blazeSlider: BlazeSlider) {
  blazeSlider.track.style.transition = ''
}
