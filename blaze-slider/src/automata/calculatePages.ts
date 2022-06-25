import { Automata } from './automata'
import { Page } from '../types'

/**
 * calculate pages and return
 */
export function calculatePages(slider: Automata) {
  const { slidesToShow, slidesToScroll, loop } = slider.config
  const { isStatic, totalSlides } = slider
  const pages: Page[] = []
  const lastIndex = totalSlides - 1

  // start with index 0, keep adding slidesToScroll to get the new page
  for (
    let startIndex = 0;
    startIndex < totalSlides;
    startIndex += slidesToScroll
  ) {
    const _endIndex = startIndex + slidesToShow - 1
    const overflow = _endIndex > lastIndex

    if (overflow) {
      // if not looped
      if (!loop) {
        // adjust the startIndex
        const startIndex = lastIndex - slidesToShow + 1
        const lastPageIndex = pages.length - 1

        // create page only if adjusting the startIndex does not make it the same as previously saved page
        if (
          pages.length === 0 ||
          (pages.length > 0 && pages[lastPageIndex][0] !== startIndex)
        ) {
          pages.push([startIndex, lastIndex])
        }

        break
      }

      // if looped
      else {
        // adjust the endIndex
        const endIndex = _endIndex - totalSlides
        pages.push([startIndex, endIndex])
      }
    } else {
      pages.push([startIndex, _endIndex])
    }

    // if static, only allow 1 iteration
    if (isStatic) {
      break
    }
  }

  return pages
}
