import { Automata, constructAutomata } from './automata/automata'
import { DEV, END, START } from './constants'
import { BlazeConfig, MediaConfig, SlideChangeCallback, Track } from './types'
import { handleAutoplay } from './utils/autoplay'
import { createConfig, defaultConfig } from './utils/config'
import { dragSupport, handlePointerDown, isTouch } from './utils/drag'
import { updateTransform } from './utils/methods'
import { handleNavigation } from './utils/navigation'
import { handlePagination } from './utils/pagination'
import { scrollNext, scrollPrev } from './utils/scroll'

function isTransitioning(
  slider: BlazeSlider,
  time = slider.config.transitionDuration
) {
  slider.isTransitioning = true
  setTimeout(() => {
    slider.isTransitioning = false
  }, time)
}

export class BlazeSlider extends Automata {
  el: HTMLElement
  slides: HTMLCollection
  track: HTMLElement
  offset: number
  dragged: number
  config: MediaConfig
  isDragging: boolean
  paginationButtons: HTMLButtonElement[] | undefined
  passedConfig?: BlazeConfig
  autoplayTimer?: any
  onSlideCbs?: Set<SlideChangeCallback>

  constructor(blazeSliderEl: HTMLElement, blazeConfig?: BlazeConfig) {
    const track = blazeSliderEl.querySelector('.blaze-track') as Track
    const slides = track.children

    const config = blazeConfig
      ? createConfig(blazeConfig)
      : { ...defaultConfig }

    super(slides.length, config)

    this.config = config
    this.el = blazeSliderEl
    this.track = track
    this.slides = slides
    this.offset = 0
    this.dragged = 0
    this.isDragging = false

    // @ts-ignore - for debugging
    this.el.blazeSlider = this

    this.passedConfig = blazeConfig

    const slider = this
    track.slider = slider

    construct(config, slider)

    // throttled to refresh every 200ms when resizing
    let ignoreResize = false
    let width = 0
    window.addEventListener('resize', () => {
      if (width === 0) {
        width = window.innerWidth
        return
      }

      const newWidth = window.innerWidth

      // ignore height change - only refresh if the width is changed
      if (width === newWidth) return
      width = newWidth

      if (!ignoreResize) {
        ignoreResize = true

        setTimeout(() => {
          slider.refresh()
          ignoreResize = false
        }, 200)
      }
    })
  }

  next(count?: number) {
    if (this.isTransitioning) return
    const transition = super.next(count)
    if (!transition) {
      isTransitioning(this)
      return
    }
    const [prevStateIndex, slideCount] = transition
    handleStateChange(this, prevStateIndex)
    isTransitioning(this)
    scrollNext(this, slideCount)
  }

  prev(count?: number) {
    if (this.isTransitioning) return
    const transition = super.prev(count)
    if (!transition) {
      isTransitioning(this)
      return
    }
    const [prevStateIndex, slideCount] = transition
    handleStateChange(this, prevStateIndex)
    isTransitioning(this)
    scrollPrev(this, slideCount)
  }

  stopAutoplay() {
    clearInterval(this.autoplayTimer)
  }

  destroy() {
    // remove side effects that won't be overridden by construct()

    // remove old drag event handler
    this.track.removeEventListener(
      isTouch() ? 'touchstart' : 'pointerdown',
      // @ts-expect-error
      handlePointerDown
    )

    // stop autoplay
    this.stopAutoplay()

    // remove pagination buttons
    this.paginationButtons?.forEach((button) => button.remove())

    // remove classes
    this.el.classList.remove('static')
    this.el.classList.remove(START)
  }

  refresh() {
    const newConfig = this.passedConfig
      ? createConfig(this.passedConfig)
      : { ...defaultConfig }

    this.destroy()
    construct(newConfig, this)
  }

  /**
   * Subscribe for slide change event
   * Returns a function to unsubscribe from slide change event
   */
  onSlide(cb: SlideChangeCallback) {
    if (!this.onSlideCbs) this.onSlideCbs = new Set()
    this.onSlideCbs.add(cb)
    return () => this.onSlideCbs!.delete(cb)
  }
}

function handleStateChange(slider: BlazeSlider, prevStateIndex: number) {
  const classList = slider.el.classList
  const stateIndex = slider.stateIndex
  const buttons = slider.paginationButtons

  if (!slider.config.loop) {
    if (stateIndex === 0) {
      classList.add(START)
    } else {
      classList.remove(START)
    }

    if (stateIndex === slider.states.length - 1) {
      classList.add(END)
    } else {
      classList.remove(END)
    }
  }

  if (buttons && slider.config.enablePagination) {
    buttons[prevStateIndex].classList.remove('active')
    buttons[stateIndex].classList.add('active')
  }
}

function construct(config: MediaConfig, slider: BlazeSlider) {
  const track = slider.track
  slider.slides = track.children
  slider.offset = 0
  slider.config = config

  constructAutomata(slider, slider.totalSlides, config)

  // if a side effect is in condition - make sure to add it for both conditions - so it gets cleaned up
  // when refresh is called

  if (!config.loop) {
    slider.el.classList.add(START)
  }

  if (config.enableAutoplay && !config.loop) {
    if (DEV) {
      console.warn(
        'enableAutoplay:true is not consistent with loop:false, auto-fixing with enableAutoplay:false'
      )
    }
    config.enableAutoplay = false
  }

  track.style.transitionProperty = 'transform'
  track.style.transitionTimingFunction = slider.config.transitionTimingFunction
  track.style.transitionDuration = `${slider.config.transitionDuration}ms`

  const { slidesToShow, slideGap } = slider.config

  slider.el.style.setProperty('--slides-to-show', slidesToShow + '')
  slider.el.style.setProperty('--slide-gap', slideGap)

  if (!slider.isStatic) {
    if (config.draggable) {
      dragSupport(slider)
    }
  } else {
    slider.el.classList.add('static')
  }

  handlePagination(slider)
  handleAutoplay(slider)
  handleNavigation(slider)
  updateTransform(slider)
}
