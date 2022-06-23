export type AutomataConfig = {
  loop: boolean
  slidesToShow: number
  slidesToScroll: number
}

/** media specific configuration for blaze-slider */
export interface MediaConfig extends AutomataConfig {
  /**
   * slide gap between two slides in any css length unit
   * Example: 20px / 1em / 3rem etc..
   *
   * default: `"20px"`
   */
  slideGap: string
  /**
   * element inside of which the pagination buttons should be rendered
   *
   * default: `null`
   * */
  paginationContainer: HTMLElement | null

  /** enable or disable pagination
   *
   * default: `false`
   */
  enablePagination: boolean

  /** enable or disable autoplay
   *
   * default: `false`
   */
  enableAutoplay: boolean

  /**
   * scrolls the slider at given intervals in milliseconds
   *
   * default: `3000`
   * */
  autoplayInterval: number

  /** autoplay direction
   *
   * specify whether the autoplay should scroll the slides
   * `"to right"` or `"to left"`
   *
   * default: `"to left"`
   */
  autoplayDirection: 'to right' | 'to left'

  /**
   * pause autoplay when hovering the slider
   *
   * default: `true`
   */
  pauseAutoplayOnHover: boolean

  /**
   * css transition duration for the scroll effect in milliseconds
   *
   * default: `500`
   * */
  transitionDuration: number

  /**
   * css transition timing function for the scroll effect
   * {@link https://developer.mozilla.org/en-US/docs/Web/CSS/transition-timing-function}
   *
   * default: `"ease"`
   *
   *  */
  transitionTimingFunction: string
}

/** blaze slider configuration */
export type BlazeConfig = {
  media: Record<string, Partial<MediaConfig>>
}

/** Indicates which sliders it shows by storing a range from startIndex to endIndex */
export type Page = [start: number, end: number]

export type State = {
  page: Page
  /** information of next state */
  next: {
    /** index of next state */
    stateIndex: number
    /** number of slides need to be moved to go to next state */
    moveSlides: number
  }
  /** information of previous state */
  prev: {
    /** index of previous state */
    stateIndex: number
    /** number of slides need to be moved to go to prev state */
    moveSlides: number
  }
}
