import { BlazeSlider } from '../slider'

/**
 * drag based navigation for slider
 */
export function dragSupport(sliderUI: BlazeSlider) {
  const track = sliderUI.track

  const handlePointerDown = (downEvent: PointerEvent) => {
    // bind the pointer event to slider track to allow dragging outside the track as well
    track.setPointerCapture(downEvent.pointerId)
    downEvent.preventDefault()

    let dragAmount = 0
    let isScrolled = false

    const startMouseClientX = downEvent.clientX
    sliderUI.el.classList.add('dragging')
    sliderUI.isDragging = true

    function handlePointerMove(moveEvent: MouseEvent) {
      moveEvent.preventDefault()
      dragAmount = moveEvent.clientX - startMouseClientX
      sliderUI.setDrag(dragAmount)

      if (!isScrolled && sliderUI.config.loop) {
        if (dragAmount > 10) {
          isScrolled = true
          sliderUI.prev()
        }
      }
    }

    const handlePointerUp = () => {
      sliderUI.el.classList.remove('dragging')
      sliderUI.isDragging = false

      track.removeEventListener('pointermove', handlePointerMove)
      sliderUI.setDrag(0)
      sliderUI.enableTransition()

      if (!isScrolled) {
        if (dragAmount < -10) {
          sliderUI.next()
        } else if (dragAmount > 10) {
          sliderUI.prev()
        }
      }
    }

    track.addEventListener('pointermove', handlePointerMove)
    track.addEventListener('pointerup', handlePointerUp, { once: true })
  }

  // dragging
  track.addEventListener('pointerdown', handlePointerDown)
}
