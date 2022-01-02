/**
 *
 * number of pages
 * = 1 (first slide) + number of times you can scroll until you reach the end
 * = 1 + Math.floor((slides - show)/scroll)
 */

export function getPageCount(slides: number, scroll: number) {
  if (scroll === 1) return slides
  return 1 + Math.floor(slides / scroll)
}
