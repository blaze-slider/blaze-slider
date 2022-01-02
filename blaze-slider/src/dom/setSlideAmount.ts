import { BlazeSlider } from '../BlazeSlider'
import { setCSSVar } from './setCSSVar'

export function setSlideAmount(blazeSlider: BlazeSlider, slideAmount: number) {
  setCSSVar(blazeSlider, '--blaze-slide-amount', slideAmount + 'px')
}
