import { getPageCount } from './getPageCount'

export function getValency(slides: number, show: number, scroll: number) {
  return getPageCount(slides, scroll) * scroll - slides
}
