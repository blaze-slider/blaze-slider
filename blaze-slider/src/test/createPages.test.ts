import { createPages } from '../pages'

test('5,3,2', () => {
  const pages = createPages(5, 3, 2)
  expect(pages).toEqual([
    {
      i: 0,
      j: 2,
      overflow: 0,
    },
    {
      i: 2,
      j: 4,
      overflow: 0,
    },
    {
      i: 4,
      j: 1,
      overflow: 1,
    },
  ])
})

test('5,3,1', () => {
  const pages = createPages(5, 3, 1)
  expect(pages).toEqual([
    {
      i: 0,
      j: 2,
      overflow: 0,
    },
    {
      i: 1,
      j: 3,
      overflow: 0,
    },
    {
      i: 2,
      j: 4,
      overflow: 0,
    },
    {
      i: 3,
      j: 0,
      overflow: 2,
    },
    {
      i: 4,
      j: 1,
      overflow: 1,
    },
  ])
})
