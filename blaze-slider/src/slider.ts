import { Automata } from './automata'
import { BlazeConfig, MediaConfig } from './types'
import { createConfig, defaultConfig } from './utils/config'
import { dragSupport } from './utils/drag'
import { isDEV } from './utils/env'
import { handlePagination } from './utils/pagination'

export class BlazeSlider extends Automata {
  el: HTMLElement
  slides: HTMLCollection
  track: HTMLElement
  isDragging: boolean
  config: MediaConfig
  paginationButtons: HTMLCollection | undefined
  constructor(blazeSliderEl: HTMLElement, blazeConfig?: BlazeConfig) {
    const config = blazeConfig ? createConfig(blazeConfig) : defaultConfig
    const track = blazeSliderEl.querySelector('.blaze-track') as HTMLElement

    const slides = track.children
    super(slides.length, config)
    this.config = config
    this.el = blazeSliderEl
    this.track = track
    this.slides = slides
    this.isDragging = false
    this.track.addEventListener('transitionstart', () => {
      this.isTransitioning = true
    })
    this.track.addEventListener('transitionend', () => {
      this.isTransitioning = false
    })

    if (this.isStatic) {
      this.el.classList.add('static')
    }

    // apply config to css variables
    this.el.style.setProperty('--slides-to-show', this.config.slidesToShow + '')
    this.el.style.setProperty(
      '--transition-duration',
      this.config.transitionDuration + 'ms'
    )

    this.el.style.setProperty('--slide-gap', this.config.slideGap)

    this.el.style.setProperty(
      '--transition-timing-function',
      this.config.transitionTimingFunction + ''
    )
    if (!this.isStatic) {
      dragSupport(this)
    }
    handlePagination(this)
    if (config.enableAutoplay && !config.loop) {
      if (isDEV) {
        console.warn(
          'enableAutoplay = true is not consistent with loop = false, setting enableAutoplay = false instead'
        )
      }
      config.enableAutoplay = false
    }

    // @ts-ignore
    window.slider = this

    if (config.enableAutoplay) {
      const dir = config.autoplayDirection === 'to left' ? 'next' : 'prev'
      setInterval(() => {
        this[dir]()
      }, config.autoplayInterval)
    }
  }

  onStateChange(prev: number, current: number) {
    const buttons = this.paginationButtons
    if (buttons) {
      buttons[prev].classList.remove('active')
      buttons[current].classList.add('active')
    }
  }

  setDrag(amount: number) {
    // dragAmountEl.textContent = amount + "";
    this.el.style.setProperty('--dragged', amount + '')
  }

  disableTransition() {
    this.el.classList.add('no-transition')
  }

  enableTransition() {
    this.el.classList.remove('no-transition')
  }

  onTrasitionEnd(cb: Function) {
    // @ts-ignore
    this.track.addEventListener('transitionend', cb, { once: true })
  }

  resetOffset() {
    this.el.style.setProperty('--offset', '0')
  }

  setOffset(offset: number) {
    // negative offset makes the slider move <-- (next direction)
    // positive offset makes the slider move --> (prev direction)
    // 0 offset puts the slider in it's original position where the first elements are visible
    this.el.style.setProperty('--offset', offset + '')
  }

  wrapNext(count: number) {
    for (let i = 0; i < count; i++) {
      this.track.append(this.slides[0])
    }
  }

  wrapPrev(count: number) {
    const len = this.slides.length
    for (let i = 0; i < count; i++) {
      // pick the last and move to first
      this.track.prepend(this.slides[len - 1])
    }
  }

  noLoopScroll() {
    this.setOffset(-1 * this.states[this.stateIndex].page[0])
  }

  // <--- move slider to left for showing content on right
  scrollNext(count: number) {
    if (!this.config.loop) {
      this.noLoopScroll()
    } else {
      // apply offset and let the slider scroll from  <- (right to left)
      this.setOffset(-1 * count)

      // once the transition is done
      this.onTrasitionEnd(() => {
        // remove the elements from start that are no longer visible and put them at the end
        this.wrapNext(count)
        this.disableTransition()
        // disable transition and reset offset to prevent jumping
        requestAnimationFrame(() => {
          this.resetOffset()
          // after that, enable transition again
          requestAnimationFrame(() => {
            this.enableTransition()
          })
        })
      })
    }
  }

  scrollPrev(count: number) {
    if (!this.config.loop) {
      this.noLoopScroll()
    } else {
      this.disableTransition()
      this.setOffset(-1 * count) // move the elements to start
      this.wrapPrev(count) // move the track so it looks like nothing is changed

      const reset = () => {
        requestAnimationFrame(() => {
          this.enableTransition()
          requestAnimationFrame(() => {
            this.resetOffset() // reset the offset to move the slider to new position
          })
        })
      }
      // if the scroll was done as part of dragging
      // reset should be done after the dragging is completed
      if (this.isDragging) {
        this.track.addEventListener('pointerup', reset, { once: true })
      } else {
        requestAnimationFrame(reset)
      }
    }
  }
}
