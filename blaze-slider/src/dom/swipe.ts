import { BlazeSlider } from '../BlazeSlider'
import { edgeVectorCorrection } from '../math/edgeVectorCorrection'
import { normalizeVector } from '../math/normalizeVector'
import { setActivePaginationIndex } from '../setup/pagination'
import { setCSSVar } from './setCSSVar'
import { enableTransition } from './transition'
import { updateTrackPosition } from './updateTrackPosition'
import { wrapToLeft, wrapToRight } from './wrap'

function release(blazeSlider: BlazeSlider) {
  enableTransition(blazeSlider)
  setCSSVar(blazeSlider, '--blaze-slide-amount', 0 + 'px')
  updateTrackPosition(blazeSlider)
}

export function swipe(blazeSlider: BlazeSlider, _vector: number) {
  // normalize the vector +1 is the same as totalSlides + 1
  // and to reduce the motion we vector should change the direction that is nearest
  let vector = normalizeVector(_vector, blazeSlider.totalSlides)
  vector = edgeVectorCorrection(vector, blazeSlider)

  if (vector === 0) return

  const { slides } = blazeSlider
  const { show } = blazeSlider.config.slides
  const rawOffset = blazeSlider.offset + vector

  // if the rawOffset is negative
  // it means that thee is not enough slides on the left side
  if (rawOffset < 0) {
    const slidesToWrap = -1 * vector
    const offsetDiff = vector

    wrapToLeft(blazeSlider, slidesToWrap)
    blazeSlider.offset += offsetDiff
    requestAnimationFrame(() => {
      release(blazeSlider)
    })
  }

  // if not enough slides on the right side
  else if (blazeSlider.offset + vector + (show - 1) > slides.length - 1) {
    const slidesToWrap =
      blazeSlider.offset + vector + (show - 1) - (slides.length - 1)
    const offsetDiff = vector

    wrapToRight(blazeSlider, slidesToWrap)
    blazeSlider.offset += offsetDiff
    requestAnimationFrame(() => {
      release(blazeSlider)
    })
  }

  // else if enough slides are present
  else {
    blazeSlider.offset += vector
    release(blazeSlider)
  }

  if (blazeSlider.config.pagination) {
    const firstSlideIndex = Number(
      blazeSlider.slides[blazeSlider.offset].dataset.index
    )
    const pageIndex = blazeSlider.pages.findIndex(
      (page) => page.i === firstSlideIndex
    )
    setActivePaginationIndex(blazeSlider, pageIndex)
  }
}
