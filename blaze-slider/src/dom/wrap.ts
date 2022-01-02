import { BlazeSlider } from '../BlazeSlider'
import { disableTransition } from './transition'
import { updateTrackPosition } from './updateTrackPosition'

export function wrapToLeft(blazeSlider: BlazeSlider, n: number) {
  const { slides } = blazeSlider
  // remove n slides from end and add to beginning
  for (let i = 0; i < n; i++) {
    slides[0].before(slides[slides.length - 1])
    slides.unshift(slides.pop()!)
  }

  blazeSlider.offset += n
  disableTransition(blazeSlider)
  updateTrackPosition(blazeSlider)
}

export function wrapToRight(blazeSlider: BlazeSlider, n: number) {
  const { slides } = blazeSlider
  // remove n slides from the start and add to end
  for (let i = 0; i < n; i++) {
    slides[slides.length - 1].after(slides[0])
    slides.push(slides.shift()!)
  }

  blazeSlider.offset -= n
  disableTransition(blazeSlider)
  updateTrackPosition(blazeSlider)
}
