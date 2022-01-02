import { getPageCount } from '../math/getPageCount'

test('slides: 5, scroll: 2', () => {
  // 0 1 2
  // 2 3 4
  // 4 0 1
  expect(getPageCount(5, 2)).toBe(3)
})

test('slides: 5, scroll: 3', () => {
  // 0 1 2
  // 3 4 0
  expect(getPageCount(5, 3)).toBe(2)
})

test('slides: 7, scroll: 3', () => {
  // 0 1 2
  // 3 4 5
  // 6 0 1
  expect(getPageCount(7, 3)).toBe(3)
})

test('slides: 5, scroll: 1', () => {
  // 0 1 2
  // 1 2 3
  // 2 3 4
  // 3 4 0
  // 4 0 1
  expect(getPageCount(5, 1)).toBe(5)
})

test('slides: 5, scroll: 2', () => {
  // 0 1 2
  // 2 3 4
  // 4 0 1
  expect(getPageCount(5, 12)).toBe(3)
})
