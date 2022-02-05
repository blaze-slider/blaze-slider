import { testConfig } from './config/testConfig'
import { swipe } from './dom/swipe'
import { createPages, Page } from './pages'
import { handleAutoplay } from './setup/autoplay'
import { createConfig } from './setup/config'
import { handleDrag } from './setup/drag'
import { handleNavigation } from './setup/navigation'
import { BlazePaginationButton, handlePagination } from './setup/pagination'
import { setupStyles } from './setup/styles'
import { AllRequired, BlazeSettings, Config } from './types'

const autoplayClass = 'autoplaying'

export class BlazeSlider {
  // dom
  slider: HTMLElement
  track: HTMLElement
  slides: HTMLElement[]
  paginationButtons?: BlazePaginationButton[]

  // config
  config: AllRequired<Config>

  // one time computed
  totalSlides: number
  pages!: Page[]
  maxScroll!: number
  maxSlideAmount!: number

  // state
  offset: number
  pageIndex: number

  // calculated when slide is dragged for the first time
  slideWidth!: number

  // autoplay
  autoplay?: {
    intervalId: number
    interactionDone: boolean
  }

  constructor(slider: HTMLElement, blazeSettings?: BlazeSettings) {
    // dom
    this.slider = slider
    // @ts-ignore
    slider.$blaze = this
    slider.tabIndex = 0

    // track
    const track = (this.track = slider.querySelector(
      '.blaze-track'
    ) as HTMLElement)

    this.slides = Array.from(track.children) as HTMLElement[]
    this.totalSlides = this.slides.length

    this.slides.forEach((slide, i) => {
      slide.tabIndex = 0
      slide.dataset.index = `${i}`
    })

    // state
    this.pageIndex = 0
    this.offset = 0

    this.config = createConfig(blazeSettings)

    testConfig(this)

    // style
    setupStyles(this)

    // use config
    const { navigation, pagination, autoplay, slides } = this.config

    if (this.totalSlides <= slides.show) {
      slider.classList.add('blaze-static')
      return
    }

    // after the config is fixed
    this.pages = createPages(this.totalSlides, slides.show, slides.scroll)

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

  play() {
    const { autoplay } = this.config
    if (!autoplay) return
    if (this.autoplay!.interactionDone) return

    this.slider.classList.add(autoplayClass)

    this.autoplay!.intervalId = window.setInterval(() => {
      requestAnimationFrame(() => {
        if (autoplay.toLeft) {
          this.swipeLeft()
        } else {
          this.swipeRight()
        }
      })
    }, autoplay.interval)
  }

  pause() {
    if (!this.config.autoplay) return
    this.slider.classList.remove(autoplayClass)
    clearInterval(this.autoplay!.intervalId)
  }
}
