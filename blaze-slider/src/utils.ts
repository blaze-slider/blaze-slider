function isObject(value: any): value is object {
  return typeof value === 'object' && value !== null
}

export function override(a: object, b: object) {
  Object.keys(b).forEach((key) => {
    // @ts-ignore
    if (!isObject(a[key])) {
      // @ts-ignore
      a[key] = b[key]
    } else {
      // @ts-ignore
      override(a[key], b[key])
    }
  })
}

export function deepClone<T extends object>(obj: T): T {
  const clone = {} as T
  Object.keys(obj).forEach((key) => {
    // @ts-ignore
    const value = obj[key]
    // @ts-ignore
    clone[key] = isObject(value) ? deepClone(value) : value
  })
  return clone
}
