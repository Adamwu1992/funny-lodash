
import { needFunc, isFunction } from '../.internal/utils'

export default function(func, wait) {
  if (!isFunction(func)) {
    return needFunc()
  }

  if (isNaN(wait)) {
    wait = 0
  } else {
    wait = Number(wait)
  }

  let lastArgs
  let lastThis
  let lastCallTime
  let timerId
  let result

  function shouldInvoke(time) {
    return lastCallTime === undefined ||
      time - lastCallTime >= wait
  }

  function invokeFunc() {
    if(lastArgs === undefined) return
    result = func.apply(lastThis, lastArgs)
    lastThis = lastArgs = undefined
    return result
  }

  function startTimer() {
    return setTimeout(invokeFunc, wait)
  }
  function cancelTimer() {
    clearTimeout(timerId)
  }

  return function(...args) {

    lastArgs = args
    lastThis = this

    const time = Date.now()
    const isInvoking = shouldInvoke(time)

    lastCallTime = time

    if(isInvoking) {
      timerId = startTimer()
    } else if(timerId) {
      cancelTimer()
      timerId = startTimer()
    }
    return result
  }
}