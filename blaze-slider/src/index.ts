import { handleAutoplay } from './setup/autoplay'
import { createConfig } from './setup/config'
import { handleDrag } from './setup/drag'
import { handleNavigation } from './setup/navigation'
import { BlazePaginationButton, handlePagination } from './setup/pagination'
import { $offset, setupStyles } from './setup/styles'
import { AllRequired, BlazeSettings, Config } from './types'

export class BlazeSlider {
  slider: HTMLElement
  config: AllRequired<Config>
  track: HTMLElement
  slides: HTMLElement[]
  totalSlides: number
  offset: number
  pagination?: {
    buttons: BlazePaginationButton[]
    active: BlazePaginationButton
  }

  firstPagePrevVector: number
  lastPageNextVector: number

  // calculated when slide is dragged for the first time
  slideWidth!: number

  // number of slides missing in the last page
  valency: number

  constructor(slider: HTMLElement, givenConfig?: BlazeSettings) {
    this.config = createConfig(givenConfig)
    const { show, scroll } = this.config.slides

    // check for invalid config
    if (scroll > show) {
      console.warn('blazeSlider: ignored invalid config.slides.scroll value')
      this.config.slides.scroll = show
    }

    this.offset = 0

    // slider
    this.slider = slider
    // @ts-ignore
    slider.$blaze = this
    slider.tabIndex = 0

    // style
    setupStyles(this)

    // track
    const track = (this.track = slider.querySelector(
      '.blaze-track'
    ) as HTMLElement)

    // slides
    this.slides = Array.from(track.children) as HTMLElement[]
    this.totalSlides = this.slides.length

    const mod = this.totalSlides % scroll
    this.valency = mod === 0 ? 0 : scroll - mod
    this.firstPagePrevVector = -1 * (show - this.valency)
    this.lastPageNextVector = show - this.valency

    this.slides.forEach((slide, i) => {
      slide.tabIndex = 0
      slide.dataset.index = `${i}`
    })

    if (this.totalSlides <= show) {
      slider.classList.add('blaze-static')
      return
    }

    handleNavigation(this)
    handleAutoplay(this)
    handlePagination(this)
    handleDrag(this)
  }

  setSlideAmount(slideAmount: number) {
    this.track.style.setProperty('--blaze-slide-amount', slideAmount + 'px')
  }

  wrapToLeft(n: number) {
    const { slides } = this
    // remove n slides from end and add to beginning
    for (let i = 0; i < n; i++) {
      slides[0].before(slides[slides.length - 1])
      slides.unshift(slides.pop()!)
    }

    this.disableTransition()
    this.offset += n
    this.updateTrackOffset()
  }

  wrapToRight(n: number) {
    const { slides } = this
    // remove n slides from the start and add to end
    for (let i = 0; i < n; i++) {
      slides[slides.length - 1].after(slides[0])
      slides.push(slides.shift()!)
    }

    this.disableTransition()
    this.offset -= n
    this.updateTrackOffset()
  }

  updateTrackOffset() {
    this.setCSSVar($offset, this.offset + '')
  }

  setCSSVar(name: string, value: string) {
    this.slider.style.setProperty(name, value)
  }

  disableTransition() {
    this.track.style.transition = 'none'
  }

  enableTransition() {
    this.track.style.transition = ''
  }

  swipeLeft() {
    this.swipe(-1 * this.config.slides.scroll)
  }

  swipeRight() {
    this.swipe(this.config.slides.scroll)
  }

  swipe(_vector: number) {
    // normalize the vector +1 is the same as totalSlides + 1
    // and to reduce the motion we vector should change the direction that is nearest
    let vector = _vector % this.totalSlides
    if (Math.abs(vector) > this.totalSlides / 2) {
      vector = -1 * (this.totalSlides - vector)
    }

    if (vector === 0) return

    if (this.valency !== 0) {
      if (this.isFirstPage() && vector < 0) {
        vector = this.firstPagePrevVector
      } else if (this.isLastPage() && vector > 0) {
        vector = this.lastPageNextVector
      }
    }

    const { slides } = this
    const { show, scroll } = this.config.slides
    const rawOffset = this.offset + vector

    // if the rawOffset is negative
    // it means that thee is not enough slides on the left side
    if (rawOffset < 0) {
      const slidesToWrap = -1 * vector
      const offsetDiff = vector
      this.wrapToLeft(slidesToWrap)
      this.offset += offsetDiff
      requestAnimationFrame(() => {
        this.enableTransition()
        this.updateTrackOffset()
      })
    }

    // if not enough slides on the right side
    else if (this.offset + vector + (show - 1) > slides.length - 1) {
      const slidesToWrap =
        this.offset + vector + (show - 1) - (slides.length - 1)
      const offsetDiff = vector
      this.wrapToRight(slidesToWrap)
      this.offset += offsetDiff
      requestAnimationFrame(() => {
        this.enableTransition()
        this.updateTrackOffset()
      })
    }

    // else if enough slides are present
    else {
      this.offset += vector
      this.updateTrackOffset()
    }

    if (this.pagination) {
      const firstVisibleSlideRealIndex = this.getFirstVisibleSlideIndex()
      const activePageIndex = Math.floor(firstVisibleSlideRealIndex / scroll)
      this.setActivePaginationIndex(activePageIndex)
    }
  }

  getFirstVisibleSlideIndex() {
    return Number(this.slides[this.offset].dataset.index)
  }

  isLastPage() {
    return (
      this.getFirstVisibleSlideIndex() === this.totalSlides - this.valency + 1
    )
  }

  isFirstPage() {
    return this.getFirstVisibleSlideIndex() === 0
  }

  setActivePaginationIndex(index: number) {
    const prevActive = this.pagination!.active
    const newActive = this.pagination!.buttons[index] as BlazePaginationButton
    prevActive.classList.remove('active')
    newActive.classList.add('active')
    this.pagination!.active = newActive
  }
}
