import { BlazeSlider } from '../index'

export interface BlazePaginationButton extends HTMLButtonElement {
  blazeSlider: BlazeSlider
}

const activeClass = 'active'

function handlePaginationButtonClick(this: BlazePaginationButton) {
  const { blazeSlider } = this
  const { show } = blazeSlider.config.slides
  const showPageIndex = Number(this.dataset.index)

  let firstSlideIndex = 0
  blazeSlider.slides.forEach((slide, i) => {
    if (slide.dataset.index === '0') {
      firstSlideIndex = Number(i)
    }
  })

  blazeSlider.swipe(firstSlideIndex + showPageIndex * show - blazeSlider.offset)
}

export function handlePagination(blazeSlider: BlazeSlider) {
  const { slider, config, totalSlides } = blazeSlider
  const { scroll } = config.slides

  const pages = Math.ceil(totalSlides / scroll)
  const pagination = slider.querySelector('.blaze-pagination')!
  if (!pagination) return

  // @ts-ignore
  blazeSlider.pagination = {
    buttons: [],
  }

  for (let i = 0; i < pages; i++) {
    const button = document.createElement('button') as BlazePaginationButton
    if (i === 0) {
      button.classList.add(activeClass)
      blazeSlider.pagination!.active = button
    }
    button.textContent = `${i + 1}`
    pagination.append(button)
    button.dataset.index = `${i}`
    button.blazeSlider = blazeSlider
    button.addEventListener('click', handlePaginationButtonClick)

    blazeSlider.pagination!.buttons.push(button)
  }
}
