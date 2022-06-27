import { BlazeSlider } from '../slider'

type Button = HTMLButtonElement & {
  slider: BlazeSlider
  index: number
}

export function handlePagination(slider: BlazeSlider) {
  if (!slider.config.enablePagination || slider.isStatic) return
  const paginationContainer = slider.el.querySelector('.blaze-pagination')
  if (!paginationContainer) return

  slider.paginationButtons = []

  const total = slider.states.length

  for (let index = 0; index < total; index++) {
    const button = document.createElement('button')
    slider.paginationButtons.push(button)
    button.textContent = 1 + index + ''
    button.ariaLabel = `${index + 1} of ${total}`
    paginationContainer.append(button)
    // @ts-expect-error
    button.slider = slider
    // @ts-expect-error
    button.index = index
    // @ts-expect-error
    button.onclick = handlePaginationButtonClick
  }

  // initially the first button is active
  slider.paginationButtons[0].classList.add('active')
}

function handlePaginationButtonClick(this: Button) {
  const index = this.index
  const slider = this.slider
  const stateIndex = slider.stateIndex
  const loop = slider.config.loop

  const diff = Math.abs(index - stateIndex)
  const inverseDiff = slider.states.length - diff

  const isDiffLargerThanHalf = diff > slider.states.length / 2
  const scrollOpposite = isDiffLargerThanHalf && loop

  // if target state is ahead of current state
  if (index > stateIndex) {
    // but the diff is too large
    if (scrollOpposite) {
      // scroll in opposite direction to reduce scrolling
      slider.prev(inverseDiff)
    } else {
      // scroll normally
      slider.next(diff)
    }
  }

  // if target state is before current state
  else {
    // but the diff is too large
    if (scrollOpposite) {
      // scroll in opposite direction
      slider.next(inverseDiff)
    } else {
      // scroll normally
      slider.prev(diff)
    }
  }
}
