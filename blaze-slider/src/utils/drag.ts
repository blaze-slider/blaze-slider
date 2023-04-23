import { BlazeSlider } from '../slider'
import { Track } from '../types'
import { disableTransition, enableTransition, updateTransform } from './methods'

const slideThreshold = 10

export const isTouch = () => 'ontouchstart' in window

export function handlePointerDown(
  this: Track,
  downEvent: PointerEvent | TouchEvent
) {
  const track = this
  const slider = track.slider
  if (slider.isTransitioning) return

  slider.dragged = 0
  track.isScrolled = false
  track.startMouseClientX =
    'touches' in downEvent ? downEvent.touches[0].clientX : downEvent.clientX

  if (!('touches' in downEvent)) {
    // do not directly setPointerCapture on track - it blocks the click events
    // https://github.com/GoogleChromeLabs/pointer-tracker/issues/4
    const el = (downEvent.target || track) as Element
    el.setPointerCapture(downEvent.pointerId)
  }

  disableTransition(slider)
  updateEventListener(track, 'addEventListener')
}

function handlePointerMove(this: Track, moveEvent: PointerEvent | TouchEvent) {
  const track = this
  const x =
    'touches' in moveEvent ? moveEvent.touches[0].clientX : moveEvent.clientX

  const dragged = (track.slider.dragged = x - track.startMouseClientX)
  const draggedAbs = Math.abs(dragged)

  // consider dragging only if the user has dragged more than 5px
  if (draggedAbs > 5) {
    // track.setAttribute('data-dragging', 'true')
    track.slider.isDragging = true
  }

  // prevent vertical scrolling if horizontal scrolling is happening
  if (draggedAbs > 15) {
    moveEvent.preventDefault()
  }

  track.slider.dragged = dragged
  updateTransform(track.slider)

  if (!track.isScrolled && track.slider.config.loop) {
    if (dragged > slideThreshold) {
      track.isScrolled = true
      track.slider.prev()
    }
  }
}

function handlePointerUp(this: Track) {
  const track = this
  const dragged = track.slider.dragged
  track.slider.isDragging = false

  updateEventListener(track, 'removeEventListener')

  // reset drag
  track.slider.dragged = 0
  updateTransform(track.slider)

  enableTransition(track.slider)

  if (!track.isScrolled) {
    if (dragged < -1 * slideThreshold) {
      track.slider.next()
    } else if (dragged > slideThreshold) {
      track.slider.prev()
    }
  }
}

const preventDefault = (event: Event) => event.preventDefault()

/**
 * drag based navigation for slider
 */
export function dragSupport(slider: BlazeSlider) {
  // @ts-expect-error
  const track: Track = slider.track
  track.slider = slider

  const event = isTouch() ? 'touchstart' : 'pointerdown'

  // @ts-expect-error
  track.addEventListener(event, handlePointerDown)

  // prevent click default when slider is being dragged or transitioning
  track.addEventListener(
    'click',
    (event) => {
      if (slider.isTransitioning || slider.isDragging) {
        event.preventDefault()
        event.stopImmediatePropagation()
        event.stopPropagation()
      }
    },
    {
      capture: true,
    }
  )

  // prevent dragging of elements inside the slider
  track.addEventListener('dragstart', preventDefault)
}

function updateEventListener(
  track: Track,
  method: 'addEventListener' | 'removeEventListener'
) {
  track[method]('contextmenu', handlePointerUp)

  if (isTouch()) {
    track[method]('touchend', handlePointerUp)
    // @ts-expect-error
    track[method]('touchmove', handlePointerMove)
  } else {
    track[method]('pointerup', handlePointerUp)
    // @ts-expect-error
    track[method]('pointermove', handlePointerMove)
  }
}
