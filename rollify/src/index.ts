import { setupAutoplay } from './setup/autoplay'
import { createConfig } from './setup/config'
import { handleDrag } from './setup/drag'
import { setupPagination } from './setup/pagination'
import { $offset, setupStyles } from './setup/styles'
import { AllRequired, Config, RootConfig } from './types'

export class Rollify {
  slider: HTMLElement
  config: AllRequired<Config>
  track: HTMLElement
  nav: {
    prev: HTMLButtonElement
    next: HTMLButtonElement
  }

  slides: HTMLElement[]
  totalSlides: number
  offset: number
  transitionStyle: string

  constructor (slider: HTMLElement, givenConfig?: RootConfig) {
    this.offset = 0
    this.slider = slider
    const track = this.track = slider.querySelector('.rollify-track') as HTMLElement

    slider.tabIndex = 0

    this.transitionStyle = track.style.transition
    this.slides = Array.from(track.children) as HTMLElement[]
    this.totalSlides = this.slides.length

    this.slides.forEach((slide, i) => {
      slide.tabIndex = 0
      slide.dataset.index = `${i}`
    })

    this.config = createConfig(givenConfig)

    this.nav = {
      prev: slider.querySelector('.rollify-prev') as HTMLButtonElement,
      next: slider.querySelector('.rollify-next') as HTMLButtonElement
    }

    setupStyles(this)

    if (this.slides.length <= this.config.slides.show) {
      slider.classList.add('rollify-static')
      return
    }

    // navigation
    this.nav.prev.addEventListener('click', () => this.swipeLeft())
    this.nav.next.addEventListener('click', () => this.swipeRight())

    setupAutoplay(this)
    setupPagination(this)
    handleDrag(this)
  }

  setSlideAmount (slideAmount: number) {
    this.track.style.setProperty('--rollify-slide-amount', slideAmount + 'px')
  }

  wrapToLeft (slidesToWraparound: number) {
    const { slides } = this
    // remove 'slidesToWraparound' slides from end and add to beginning
    for (let i = 0; i < slidesToWraparound; i++) {
      slides[0].before(slides[slides.length - 1])
      slides.unshift(slides.pop()!)
    }

    this.disableTransition()
    this.setOffset(this.offset + slidesToWraparound)
  }

  wrapToRight (slidesToWrap: number) {
    const { slides } = this
    // move first slide in array to last
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
    this.track.style.transition = this.transitionStyle
  }

  swipeLeft () {
    this.swipeTo(this.offset - this.config.slides.scroll)
  }

  swipeRight () {
    this.swipeTo(this.offset + this.config.slides.scroll)
  }

  swipeTo (targetOffset: number) {
    const offsetDiff = Math.abs(this.offset - targetOffset)
    if (offsetDiff === 0) return // do

    const { slides } = this
    const { show } = this.config.slides

    // if not enough slides on the left side
    if (targetOffset < 0) {
      const slidesToWraparound = -targetOffset
      this.wrapToLeft(slidesToWraparound)
      requestAnimationFrame(() => {
        this.enableTransition()
        this.setOffset(this.offset - offsetDiff)
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
      this.setOffset(targetOffset)
    }
  }
}
