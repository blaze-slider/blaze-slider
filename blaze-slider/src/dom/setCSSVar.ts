import { BlazeSlider } from '../BlazeSlider'

export function setCSSVar(
  blazeSlider: BlazeSlider,
  name: string,
  value: string | number
) {
  blazeSlider.slider.style.setProperty(name, value as string)
}
