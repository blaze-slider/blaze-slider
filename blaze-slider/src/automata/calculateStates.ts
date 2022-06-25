import { Automata } from './automata'
import { State } from '../types'
import { calculatePages } from './calculatePages'

/**
 * calculate all possible states of given slider
 */
export function calculateStates(slider: Automata) {
  const { totalSlides } = slider
  const { loop } = slider.config

  // get all possible pages
  const pages = calculatePages(slider)

  const states: State[] = []

  const lastPageIndex = pages.length - 1

  for (let pageIndex = 0; pageIndex < pages.length; pageIndex++) {
    // calculate prev and next page index based on config
    let nextPageIndex, prevPageIndex
    if (loop) {
      nextPageIndex = pageIndex === lastPageIndex ? 0 : pageIndex + 1
      prevPageIndex = pageIndex === 0 ? lastPageIndex : pageIndex - 1
    } else {
      nextPageIndex =
        pageIndex === lastPageIndex ? lastPageIndex : pageIndex + 1
      prevPageIndex = pageIndex === 0 ? 0 : pageIndex - 1
    }

    const currentPageStartIndex = pages[pageIndex][0]

    const nextPageStartIndex = pages[nextPageIndex][0]
    const prevPageStartIndex = pages[prevPageIndex][0]

    // calculate slides that need to be moved for transitioning to next and prev state from current state

    let nextDiff = nextPageStartIndex - currentPageStartIndex
    if (nextPageStartIndex < currentPageStartIndex) {
      nextDiff += totalSlides
    }

    let prevDiff = currentPageStartIndex - prevPageStartIndex
    if (prevPageStartIndex > currentPageStartIndex) {
      prevDiff += totalSlides
    }

    states.push({
      page: pages[pageIndex],
      next: {
        stateIndex: nextPageIndex,
        moveSlides: nextDiff,
      },
      prev: {
        stateIndex: prevPageIndex,
        moveSlides: prevDiff,
      },
    })
  }

  return states
}
