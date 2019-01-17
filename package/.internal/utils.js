export function needFunc() {
  throw new TypeError('Expected a function')
}

export function isFunction(x) {
  return typeof x === 'function'
}

export function isObject(x) {
  return x && typeof x === 'object'
}

export function isArray(x) {
  if (Array.isArray) {
    return Array.isArray(x)
  }
  return Object.prototype.toString.call(x) === '[object Array]'
}