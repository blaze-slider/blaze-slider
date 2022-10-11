import { BlazeSlider } from '../slider'
import { enableTransition, setDrag } from './methods'

type Track = HTMLElement & {
  slider: BlazeSlider
}

export const isTouch = () => 'ontouchstart' in window

function swipe(slider: BlazeSlider, dir: 'next' | 'prev') {
  slider[dir]()
}

function handlePointerDown(this: Track, downEvent: PointerEvent | TouchEvent) {
  downEvent.stopPropagation()
  downEvent.preventDefault()

  const track = this
  const slider = track.slider
  if (slider.isTransitioning) return

  let dragAmount = 0
  let isScrolled = false

  const startMouseClientX =
    'touches' in downEvent ? downEvent.touches[0].clientX : downEvent.clientX

  if (!('touches' in downEvent)) {
    track.setPointerCapture(downEvent.pointerId)
  }

  slider.el.classList.add('dragging')
  slider.isDragging = true

  function handlePointerMove(moveEvent: PointerEvent | TouchEvent) {
    moveEvent.stopPropagation()
    moveEvent.preventDefault()

    const x =
      'touches' in moveEvent ? moveEvent.touches[0].clientX : moveEvent.clientX

    dragAmount = x - startMouseClientX
    setDrag(slider, dragAmount)

    if (!isScrolled && slider.config.loop) {
      if (dragAmount > 10) {
        isScrolled = true
        swipe(slider, 'prev')
      }
    }
  }

  const handlePointerUp = () => {
    track.onpointerup = null
    track.onpointermove = null

    slider.el.classList.remove('dragging')
    slider.isDragging = false

    setDrag(slider, 0)
    enableTransition(slider)

    if (!isScrolled) {
      if (dragAmount < -10) {
        swipe(slider, 'next')
      } else if (dragAmount > 10) {
        swipe(slider, 'prev')
      }
    }
  }

  if (isTouch()) {
    track.ontouchend = handlePointerUp
    track.ontouchmove = handlePointerMove
  } else {
    track.onpointerup = handlePointerUp
    track.onpointermove = handlePointerMove
  }
}

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
}
