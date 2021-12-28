import { handleAutoplay } from './setup/autoplay'
import { createConfig } from './setup/config'
import { handleDrag } from './setup/drag'
import { handleNavigation } from './setup/navigation'
import { BlazePaginationButton, handlePagination } from './setup/pagination'
import { $offset, setupStyles } from './setup/styles'
import { AllRequired, Config, RootConfig } from './types'

export class BlazeSlider {
  slider: HTMLElement
  config: AllRequired<Config>
  track: HTMLElement
  slides: HTMLElement[]
  totalSlides: number
  offset: number
  pagination?: {
    buttons: BlazePaginationButton[],
    active: BlazePaginationButton
  }

  firstVisibleSlideIndex: number

  constructor (slider: HTMLElement, givenConfig?: RootConfig) {
    this.config = createConfig(givenConfig)

    this.offset = 0
    // @todo should be configurable
    this.firstVisibleSlideIndex = 0

    // slider
    this.slider = slider
    // @ts-ignore
    slider.$blaze = this
    slider.tabIndex = 0

    // style
    setupStyles(this)

    // track
    const track = this.track = slider.querySelector('.blaze-track') as HTMLElement

    // slides
    this.slides = Array.from(track.children) as HTMLElement[]
    this.totalSlides = this.slides.length

    this.slides.forEach((slide, i) => {
      slide.tabIndex = 0
      slide.dataset.index = `${i}`
    })

    if (this.slides.length <= this.config.slides.show) {
      slider.classList.add('blaze-static')
      return
    }

    handleNavigation(this)
    handleAutoplay(this)
    handlePagination(this)
    handleDrag(this)
  }

  setSlideAmount (slideAmount: number) {
    this.track.style.setProperty('--blaze-slide-amount', slideAmount + 'px')
  }

  wrapToLeft (n: number) {
    const { slides } = this
    // remove n slides from end and add to beginning
    for (let i = 0; i < n; i++) {
      slides[0].before(slides[slides.length - 1])
      slides.unshift(slides.pop()!)
    }

    this.disableTransition()
    this.setOffset(this.offset + n)
  }

  wrapToRight (slidesToWrap: number) {
    const { slides } = this
    // remove n slides from the start and add to end
    for (let i = 0; i < slidesToWrap; i++) {
      slides[slides.length - 1].after(slides[0])
      slides.push(slides.shift()!)
    }

    this.disableTransition()
    this.setOffset(this.offset - slidesToWrap)
  }

  setOffset (offset: number) {
    this.offset = offset
    this.setCSSVar($offset, offset + '')
  }

  setCSSVar (name: string, value: string) {
    this.slider.style.setProperty(name, value)
  }

  disableTransition () {
    this.track.style.transition = 'none'
  }

  enableTransition () {
    this.track.style.transition = ''
  }

  swipeLeft () {
    this.swipeTo(this.offset - this.config.slides.scroll)
  }

  swipeRight () {
    this.swipeTo(this.offset + this.config.slides.scroll)
  }

  swipeTo (targetOffset: number) {
    const offsetDiff = this.offset - targetOffset
    if (offsetDiff === 0) return // do

    const { slides } = this
    const { show } = this.config.slides

    // if not enough slides on the left side
    if (targetOffset < 0) {
      const slidesToWraparound = -targetOffset
      this.wrapToLeft(slidesToWraparound)
      requestAnimationFrame(() => {
        this.enableTransition()
        this.setOffset(this.offset + offsetDiff)
      })
    }

    // if not enough slides on the right side
    else if (targetOffset + (show - 1) > slides.length - 1) {
      const slidesToWrap = targetOffset + (show - 1) - (slides.length - 1)
      this.wrapToRight(slidesToWrap)
      requestAnimationFrame(() => {
        this.enableTransition()
        this.setOffset(this.offset + offsetDiff)
      })
    }

    // else if enough slides are present
    else {
      this.firstVisibleSlideIndex -= offsetDiff
      this.setOffset(targetOffset)
    }

    if (this.pagination) {
      const firstSlideIndex = this.firstVisibleSlideIndex
      const activePageIndex = Math.ceil(firstSlideIndex / this.config.slides.show)
      console.log({ firstSlideIndex })
      this.setActivePaginationIndex(activePageIndex)
    }
  }

  setActivePaginationIndex (index: number) {
    const prevActive = this.pagination!.active
    const newActive = this.pagination!.buttons[index] as BlazePaginationButton
    prevActive.classList.remove('active')
    newActive.classList.add('active')
    this.pagination!.active = newActive
  }
}
