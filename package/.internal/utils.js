export function needFunc() {
  throw new TypeError('Expected a function')
}

export function isFunction(x) {
  return typeof x === 'function'
}

export function isObject(x) {
  return x && typeof x === 'object'
}
