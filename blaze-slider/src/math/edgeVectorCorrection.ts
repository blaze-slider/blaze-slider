import { BlazeSlider } from '../BlazeSlider'

export function edgeVectorCorrection(vector: number, blazeSlider: BlazeSlider) {
  const { overflow } = blazeSlider.pages[blazeSlider.pages.length - 1]

  if (blazeSlider.pageIndex === 0 && vector < 0) {
    return -1 * overflow
  } else if (
    blazeSlider.pageIndex === blazeSlider.paginationButtons.length - 1 &&
    vector > 0
  ) {
    return overflow
  } else {
    return vector
  }
}
