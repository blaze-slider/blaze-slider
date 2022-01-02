import { getValency } from '../math/getValency'

test('slides: 5, show: 3, scroll: 2', () => {
  // 0 1 2
  // 2 3 4
  // 4 0 1
  expect(getValency(5, 3, 2)).toBe(2)
})
