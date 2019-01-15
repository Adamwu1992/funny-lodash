
/**
 * @debounce
 * inspired by https://github.com/lodash/lodash/blob/master/debounce.js
 */

function needFunc() {
  throw new TypeError('Expected a function')
}

function isFunction(x) {
  return typeof x === 'function'
}

function isObject(x) {
  return x && typeof x === 'object'
}

/**
 * 
 * **notes:**
 * 
 * @param {Function} func 被防抖的函数
 * @param {number} wait 延迟的毫秒数，如果省略将使用raf作延迟
 * @param {Object} options 
 * @param {boolean} options.leading
 * @param {number} options.maxWait
 * @param {boolean} options.trailing
 * @returns {Function}
 */
export default function debounce(func, wait, options) {
  if (!isFunction(func)) return needFunc()

  let lastArgs
  let lastThis
  let result
  let maxWait
  let timerId
  // 上次调用func的时间
  let lastCallTime
  // 上次运行func的时间
  let lastInvokeTime

  wait = isNaN(wait) ? 0 : Number(wait)

  // 是否在开始时运行func
  let leading = false
  // 是否在结尾时运行func
  let trailing = true
  // 是否设置了最大等待时长
  let maxing = false

  if (isObject(options)) {
    leading = !!options.leading
    maxing = 'maxWait' in options
    maxWait = maxing ? Math.max(+options.maxWait || 0, wait) : maxWait
    // 如果options为指定training 默认为true
    trailing = 'trailing' in options ? !!options.trailing : trailing
  }

  function invokeFunc(time) {
    const args = lastArgs
    const thisArg = lastThis

    lastArgs = lastThis = undefined
    lastInvokeTime = time

    result = func.apply(thisArg, args)
    return result
  }

  function startTimer(pendingFunc, wait) {
    return setTimeout(pendingFunc, wait)
  }

  function cancelTimer(id) {
    clearTimeout(id)
  }

  function shouldInvoke(time) {
    const timeSinceLastCall = time - lastCallTime
    const timeSinceLastInvoke = time - lastInvokeTime

    // 首次调用
    // 连续调用已经停止，处于trailing edge
    // 系统时间后退，视为处于leading edge
    // 触发了最大等待时间的限制
    return lastCallTime === undefined ||
      timeSinceLastCall >= wait ||
      timeSinceLastCall < 0 ||
      (maxing && timeSinceLastInvoke >= maxWait)
  }

  function remainingWait(time) {
    const timeSinceLastCall = time - lastCallTime
    const timeSinceLastInvoke = time - lastInvokeTime
    const timeWaiting = wait - timeSinceLastCall

    return maxing ?
      Math.min(timeWaiting, maxWait - timeSinceLastInvoke) :
      timeWaiting
  }

  function timeExpired() {
    const time = Date.now()
    if (shouldInvoke(time)) {
      return trailingEdge(time)
    }
    timerId = startTimer(timeExpired, remainingWait(time))
  }

  function trailingEdge(time) {
    timerId = undefined
    if (trailing && lastArgs) {
      return invokeFunc(time)
    }

    lastArgs = lastThis = undefined
    return result
  }

  function leadingEdge(time) {
    lastInvokeTime = time

    timerId = setTimeout(timeExpired, wait)

    return leading ? invokeFunc(time) : result
  }

  function cancel() {
    if (timerId !== undefined) {
      cancelTimer(timerId)
    }
    lastInvokeTime = 0
    lastArgs = lastCallTime = lastThis = timerId = undefined
  }

  function flush() {
    return timerId === undefined ?
      result :
      trailingEdge(Date.now())
  }

  function pending() {
    return timerId === undefined
  }

  function debounced(...args) {
    const time = Date.now()
    const isInvoking = shouldInvoke(time)

    lastArgs = args
    lastThis = this
    lastCallTime = time

    if(isInvoking) {
      if(timerId === undefined) {
        return leadingEdge(lastCallTime)
      }
      if(maxing) {
        timerId = startTimer(timeExpired, wait)
        return invokeFunc(lastCallTime)
      }
    }

    if(timerId === undefined) {
      timerId = startTimer(timeExpired, wait)
    }
    return result
  }

  debounced.cancel = cancel
  debounced.flush = flush
  debounce.pending = pending
  return debounced
}