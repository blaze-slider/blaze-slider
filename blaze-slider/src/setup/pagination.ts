import { BlazeSlider } from '../index'

export function setupPagination (blazeSlider: BlazeSlider) {
  const { slider, slides, config } = blazeSlider
  const { show } = config.slides

  const pages = Math.ceil(slides.length / show)
  const pagination = slider.querySelector('.blaze-pagination')!
  if (!pagination) return

  function handlePaginationButtonClick (this: HTMLButtonElement) {
    const targetShowIndex = show * Number(this.dataset.index)
    const targetOffset = targetShowIndex - Number(slides[0].dataset.index)
    blazeSlider.swipeTo(targetOffset)
  }

  for (let i = 0; i < pages; i++) {
    const button = document.createElement('button')
    button.textContent = `${i + 1}`
    pagination.append(button)
    button.dataset.index = `${i}`
    button.addEventListener('click', handlePaginationButtonClick)
  }
}
