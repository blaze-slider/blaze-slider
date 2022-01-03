import { BlazeSlider } from '../BlazeSlider'

export function edgeVectorCorrection(vector: number, blazeSlider: BlazeSlider) {
  const { overflow } = blazeSlider.pages[blazeSlider.pages.length - 1]

  if (overflow === 0) return vector

  if (blazeSlider.pageIndex === 0 && vector < 0) {
    return -1 * overflow
  } else if (
    blazeSlider.pageIndex === blazeSlider.pages.length - 1 &&
    vector > 0
  ) {
    return overflow
  } else {
    return vector
  }
}
