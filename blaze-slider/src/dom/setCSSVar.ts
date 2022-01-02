import { BlazeSlider } from '../BlazeSlider'

export function setCSSVar(
  blazeSlider: BlazeSlider,
  name: string,
  value: string
) {
  blazeSlider.slider.style.setProperty(name, value)
}
