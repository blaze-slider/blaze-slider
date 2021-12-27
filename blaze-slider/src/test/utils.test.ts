import { deepClone, override } from '../utils'

test('override', () => {
  const a = { foo: 1 }
  override(a, { bar: 2 })
  expect(a).toEqual({
    foo: 1,
    bar: 2
  })

  const b = {}
  override(b, {})
  expect(b).toEqual({})

  const c = { foo: { bar: 1 } }
  override(c, { foo: { bar: 2, bazz: 3 } })
  expect(c).toEqual({ foo: { bar: 2, bazz: 3 } })
})

test('deepClone', () => {
  const a = {
    foo: {
      bar: 10
    },
    bizz: 20
  }

  const clone = deepClone(a)
  expect(clone).toEqual({
    foo: {
      bar: 10
    },
    bizz: 20
  })
  expect(clone).not.toBe(a)
  expect(clone.foo).not.toBe(a.foo)
})
