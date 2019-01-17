export default function throttle(func, wait) {

  let lastArgs
  let lastThis
  let result
  let lastInvokeTime
  let timerId

  function shouldInvoke(time) {
    return lastInvokeTime === undefined || time - lastInvokeTime >= wait
  }

  function invokeFunc(time) {
    if(lastArgs === undefined) return

    result = func.apply(lastThis, lastArgs)
    lastInvokeTime = time || Date.now()

    lastThis = lastArgs = undefined
    timerId = undefined

    return result
  }

  function remianingWait(time) {
    if (lastInvokeTime === undefined) return invokeFunc(time)
    const timeSinceLastInvoke = time - lastInvokeTime
    return wait - timeSinceLastInvoke
  }
  function startTimer(time) {
    if (timerId) {
      cancenTimer(timerId)
    }
    timerId = setTimeout(invokeFunc, remianingWait(time))
  }
  function cancenTimer(id) {
    clearTimeout(id)
  }

  return function(...args) {
    lastArgs = args
    lastThis = this

    const time = Date.now()
    const isInvoking = shouldInvoke(time)

    if(isInvoking) {
      return invokeFunc(time)
    } else {
      startTimer(time)
    }
  }
}