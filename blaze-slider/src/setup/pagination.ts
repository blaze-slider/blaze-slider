import { Rollify } from '../index'

export function setupPagination (rollify: Rollify) {
  const { slider, slides, config } = rollify
  const { show } = config.slides

  const pages = Math.ceil(slides.length / show)
  const pagination = slider.querySelector('.rollify-pagination')!
  if (!pagination) return

  function handlePaginationButtonClick (this: HTMLButtonElement) {
    const targetShowIndex = show * Number(this.dataset.index)
    const targetOffset = targetShowIndex - Number(slides[0].dataset.index)
    rollify.swipeTo(targetOffset)
  }

  for (let i = 0; i < pages; i++) {
    const button = document.createElement('button')
    button.textContent = `${i + 1}`
    pagination.append(button)
    button.dataset.index = `${i}`
    button.addEventListener('click', handlePaginationButtonClick)
  }
}
