import { BlazeSlider } from '../slider'

export function handlePagination(slider: BlazeSlider) {
  const { loop, paginationContainer } = slider.config

  // no pagination needed if there's no paginationContainer specified
  // or static
  if (!paginationContainer || slider.isStatic) return

  for (let index = 0; index < slider.states.length; index++) {
    const button = document.createElement('button')
    button.textContent = 1 + index + ''
    paginationContainer.append(button)

    button.addEventListener('click', () => {
      const { stateIndex } = slider

      const diff = Math.abs(index - stateIndex)
      const inverseDiff = slider.states.length - diff

      const isDiffLargerThanHalf = diff > slider.states.length / 2
      const scrollOpposite = isDiffLargerThanHalf && loop

      // if target state is ahread of current state
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
    })
  }

  slider.paginationButtons = paginationContainer.children

  // intialily the first button is active
  slider.paginationButtons[0].classList.add('active')
}
