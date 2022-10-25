import { Automata } from './automata/automata'
import { DEV, END, START } from './constants'
import { BlazeConfig, MediaConfig, Track } from './types'
import { handleAutoplay } from './utils/autoplay'
import { createConfig, defaultConfig } from './utils/config'
import { dragSupport } from './utils/drag'
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

  constructor(blazeSliderEl: HTMLElement, blazeConfig?: BlazeConfig) {
    const config = blazeConfig
      ? createConfig(blazeConfig)
      : { ...defaultConfig }

    const track = blazeSliderEl.querySelector('.blaze-track') as Track
    const slides = track.children

    super(slides.length, config)

    this.config = config
    this.el = blazeSliderEl
    this.track = track
    this.slides = slides
    this.offset = 0
    this.dragged = 0
    this.isDragging = false

    const slider = this
    track.slider = slider

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
    track.style.transitionTimingFunction =
      slider.config.transitionTimingFunction
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
  }

  next(count?: number) {
    if (this.isTransitioning) return
    const transition = super.next(count)
    if (!transition) return
    const [prevStateIndex, slideCount] = transition
    handleStateChange(this, prevStateIndex)
    isTransitioning(this)
    scrollNext(this, slideCount)
  }

  prev(count?: number) {
    if (this.isTransitioning) return
    const transition = super.prev(count)
    if (!transition) return
    const [prevStateIndex, slideCount] = transition
    handleStateChange(this, prevStateIndex)
    isTransitioning(this)
    scrollPrev(this, slideCount)
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

  if (buttons) {
    buttons[prevStateIndex].classList.remove('active')
    buttons[stateIndex].classList.add('active')
  }
}
