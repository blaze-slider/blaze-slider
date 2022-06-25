import { Automata } from './automata/automata'
import { END, START } from './constants'
import { BlazeConfig, MediaConfig } from './types'
import { handleAutoplay } from './utils/autoplay'
import { createConfig, defaultConfig } from './utils/config'
import { dragSupport } from './utils/drag'
import { handleNavigation } from './utils/navigation'
import { handlePagination } from './utils/pagination'
import { scrollNext, scrollPrev } from './utils/scroll'

const DEV = process.env.NODE_ENV !== 'production'

function isTransitioning(
  slider: BlazeSlider,
  time = slider.config.transitionDuration
) {
  if (slider.isTransitioning) return
  slider.isTransitioning = true
  setTimeout(() => {
    slider.isTransitioning = false
  }, time)
}

export class BlazeSlider extends Automata {
  el: HTMLElement
  slides: HTMLCollection
  track: HTMLElement
  isDragging: boolean
  config: MediaConfig
  paginationButtons: HTMLButtonElement[] | undefined

  constructor(blazeSliderEl: HTMLElement, blazeConfig?: BlazeConfig) {
    const config = blazeConfig
      ? createConfig(blazeConfig)
      : { ...defaultConfig }

    const track = blazeSliderEl.querySelector('.blaze-track') as HTMLElement
    const slides = track.children

    super(slides.length, config)

    this.config = config
    this.el = blazeSliderEl
    this.track = track
    this.slides = slides
    this.isDragging = false

    const slider = this

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

    setCSS(slider)

    if (!slider.isStatic) {
      dragSupport(slider)
    } else {
      slider.el.classList.add('static')
    }

    handlePagination(slider)
    handleAutoplay(slider)
    handleNavigation(slider)
  }

  next(count?: number) {
    const transition = super.next(count)
    if (!transition) return
    const [prevStateIndex, slideCount] = transition
    handleStateChange(this, prevStateIndex)
    isTransitioning(this)
    scrollNext(this, slideCount)
  }

  prev(count?: number) {
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

  const buttons = slider.paginationButtons
  if (buttons) {
    buttons[prevStateIndex].classList.remove('active')
    buttons[stateIndex].classList.add('active')
  }
}

function setCSS(slider: BlazeSlider) {
  const {
    slidesToShow,
    transitionDuration,
    slideGap,
    transitionTimingFunction,
  } = slider.config

  // layout
  slider.el.style.setProperty('--slides-to-show', slidesToShow + '')
  slider.el.style.setProperty('--slide-gap', slideGap)

  // transition
  slider.el.style.setProperty(
    '--transition-duration',
    transitionDuration + 'ms'
  )

  slider.el.style.setProperty(
    '--transition-timing-function',
    transitionTimingFunction + ''
  )
}
