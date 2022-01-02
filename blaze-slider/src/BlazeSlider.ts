import { swipe } from './dom/swipe'
import { createPages, Page } from './pages'
import { handleAutoplay } from './setup/autoplay'
import { createConfig } from './setup/config'
import { handleDrag } from './setup/drag'
import { handleNavigation } from './setup/navigation'
import { BlazePaginationButton, handlePagination } from './setup/pagination'
import { setupStyles } from './setup/styles'
import { AllRequired, BlazeSettings, Config } from './types'

export class BlazeSlider {
  // dom
  slider: HTMLElement
  track: HTMLElement
  slides: HTMLElement[]
  paginationButtons!: BlazePaginationButton[]

  // config
  config: AllRequired<Config>

  // one time computed
  totalSlides: number
  pages: Page[]
  maxScroll: number

  // state
  offset: number
  pageIndex: number

  // calculated when slide is dragged for the first time
  slideWidth!: number

  constructor(slider: HTMLElement, givenConfig?: BlazeSettings) {
    this.pageIndex = 0
    this.offset = 0

    this.config = createConfig(givenConfig)
    const { show, scroll } = this.config.slides

    // check for invalid config and fix
    if (scroll > show) {
      console.warn('blazeSlider: ignored invalid config.slides.scroll value')
      this.config.slides.scroll = show
    }

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

    this.slides = Array.from(track.children) as HTMLElement[]
    this.totalSlides = this.slides.length

    const maxPossibleScroll = Math.floor(this.totalSlides / 2)

    // maxScroll must also be multiple of scroll
    this.maxScroll = Math.floor(maxPossibleScroll / scroll) * scroll

    this.pages = createPages(this.totalSlides, show, scroll)

    this.slides.forEach((slide, i) => {
      slide.tabIndex = 0
      slide.dataset.index = `${i}`
    })

    if (this.totalSlides <= show) {
      slider.classList.add('blaze-static')
      return
    }

    const { navigation, pagination, autoplay, slides } = this.config

    if (navigation) {
      handleNavigation(this)
    }

    if (pagination) {
      handlePagination(this)
    }

    if (autoplay.enabled) {
      handleAutoplay(this)
    }

    if (slides.draggable) {
      handleDrag(this)
    }
  }

  swipeLeft() {
    swipe(this, -1 * this.config.slides.scroll)
  }

  swipeRight() {
    swipe(this, this.config.slides.scroll)
  }
}
