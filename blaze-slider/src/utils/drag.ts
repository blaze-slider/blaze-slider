import { BlazeSlider } from '../slider'
import { enableTransition, setDrag } from './methods'

type Track = HTMLElement & {
  slider: BlazeSlider
}

function swipe(slider: BlazeSlider, dir: 'next' | 'prev') {
  const time = 90

  // override the transition time to be faster
  slider.currentTransitionDuration = time
  slider.track.style.transitionDuration = time + 'ms'

  slider[dir]()

  // reset the transition time
  setTimeout(() => {
    slider.isTransitioning = false
    // remove override
    slider.currentTransitionDuration = slider.config.transitionDuration
    slider.track.style.transitionDuration = ''
  }, time)
}

function handlePointerDown(this: Track, downEvent: PointerEvent) {
  const track = this
  const slider = track.slider
  if (slider.isTransitioning) return

  // bind the pointer event to slider track to allow dragging outside the track as well
  track.setPointerCapture(downEvent.pointerId)
  downEvent.preventDefault()

  let dragAmount = 0
  let isScrolled = false

  const startMouseClientX = downEvent.clientX
  slider.el.classList.add('dragging')
  slider.isDragging = true

  function handlePointerMove(moveEvent: MouseEvent) {
    moveEvent.preventDefault()
    dragAmount = moveEvent.clientX - startMouseClientX
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

  track.onpointerup = handlePointerUp
  track.onpointermove = handlePointerMove
}

/**
 * drag based navigation for slider
 */
export function dragSupport(slider: BlazeSlider) {
  // @ts-expect-error
  const track: Track = slider.track
  track.slider = slider
  // @ts-expect-error
  track.onpointerdown = handlePointerDown
}
