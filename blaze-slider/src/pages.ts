export type Page = {
  i: number
  j: number
  overflow: number
}

export function createPages(totalSlides: number, show: number, scroll: number) {
  const pages: Page[] = []
  for (let i = 0; i < totalSlides; i += scroll) {
    const j = i + show - 1
    const hasOverflow = j > totalSlides - 1

    const page: Page = {
      i,
      j: hasOverflow ? j - totalSlides : j,
      overflow: hasOverflow ? show - (j - totalSlides + 1) : 0,
    }

    pages.push(page)
  }

  return pages
}
