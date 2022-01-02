import { BlazeSlider } from '../BlazeSlider'
import { swipe } from '../dom/swipe'

export interface BlazePaginationButton extends HTMLButtonElement {
  blazeSlider: BlazeSlider
}

const activeClass = 'active'

function handlePaginationButtonClick(this: BlazePaginationButton) {
  const { blazeSlider } = this
  const { scroll } = blazeSlider.config.slides
  const realIndex = Number(this.dataset.index)

  let firstSlideIndex = 0
  blazeSlider.slides.forEach((slide, i) => {
    if (slide.dataset.index === '0') {
      firstSlideIndex = Number(i)
    }
  })

  swipe(blazeSlider, firstSlideIndex + realIndex * scroll - blazeSlider.offset)
}

export function handlePagination(blazeSlider: BlazeSlider) {
  const { config, totalSlides } = blazeSlider
  const { scroll } = config.slides

  const pages = Math.ceil(totalSlides / scroll)
  const pagination = config.pagination
  if (!pagination) return

  // @ts-ignore
  blazeSlider.paginationButtons = []

  for (let i = 0; i < pages; i++) {
    const button = document.createElement('button') as BlazePaginationButton
    if (i === 0) {
      button.classList.add(activeClass)
    }
    button.textContent = `${i + 1}`
    pagination.append(button)
    button.dataset.index = `${i}`
    button.blazeSlider = blazeSlider
    button.addEventListener('click', handlePaginationButtonClick)

    blazeSlider.paginationButtons.push(button)
  }
}

export function setActivePaginationIndex(
  blazeSlider: BlazeSlider,
  index: number
) {
  try {
    const prevActive = blazeSlider.paginationButtons[blazeSlider.pageIndex]
    const newActive = blazeSlider.paginationButtons[index]
    prevActive.classList.remove('active')
    newActive.classList.add('active')
    blazeSlider.pageIndex = index
  } catch (e) {
    debugger
  }
}
