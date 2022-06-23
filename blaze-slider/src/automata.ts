import { AutomataConfig, State } from './types'
import { calculateStates } from './utils/calculateStates'
import { fixSliderConfig } from './utils/fixSliderConfig'

export class Automata {
  config: AutomataConfig
  // state
  stateIndex: number
  // states
  states: State[]
  // data
  totalSlides: number
  isTransitioning: boolean

  // slider is static if number of slides are less than config.slidesToShow
  isStatic: boolean

  constructor(totalSlides: number, config: AutomataConfig) {
    this.config = config
    this.totalSlides = totalSlides
    this.stateIndex = 0
    this.isStatic = totalSlides <= config.slidesToShow
    fixSliderConfig(this)
    this.states = calculateStates(this)
    this.isTransitioning = false
  }

  next(pages = 1) {
    if (this.isStatic || this.isTransitioning) return
    const { stateIndex } = this
    let slidesMoved = 0
    let newStateIndex = stateIndex
    for (let i = 0; i < pages; i++) {
      const state = this.states[newStateIndex]
      slidesMoved += state.next.moveSlides
      newStateIndex = state.next.stateIndex
    }
    if (newStateIndex === stateIndex) return
    this.stateIndex = newStateIndex
    this.onStateChange(stateIndex, newStateIndex)
    this.scrollNext(slidesMoved)
  }

  prev(pages = 1) {
    if (this.isStatic || this.isTransitioning) return
    const { stateIndex } = this
    let slidesMoved = 0
    let newStateIndex = stateIndex
    for (let i = 0; i < pages; i++) {
      const state = this.states[newStateIndex]
      slidesMoved += state.prev.moveSlides
      newStateIndex = state.prev.stateIndex
    }
    if (newStateIndex === stateIndex) return
    this.stateIndex = newStateIndex
    this.onStateChange(stateIndex, newStateIndex)
    this.scrollPrev(slidesMoved)
  }

  // to be implemented by child class
  scrollNext(slideCount: number) {}
  scrollPrev(slideCount: number) {}
  onStateChange(prev: number, current: number) {}
}
