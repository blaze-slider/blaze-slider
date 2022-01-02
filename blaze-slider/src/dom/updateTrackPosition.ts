import { BlazeSlider } from '../BlazeSlider'
import { $offset } from '../setup/styles'
import { setCSSVar } from './setCSSVar'

export function updateTrackPosition(blazeSlider: BlazeSlider) {
  setCSSVar(blazeSlider, $offset, blazeSlider.offset + '')
}
