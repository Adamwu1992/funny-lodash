import debounce from '../debounce'
// import _ from 'lodash'
// const debounce = _.debounce

/**
 * options is default
 */

describe('debounce:', () => {
  let run, f

  beforeEach(() => {
    run = 0
    f = debounce(() => ++run, 100)
  })

  it('call once, then `func` will be invoked after `wait`', done => {
    const result = f()
    expect(result).toBeUndefined()
    setTimeout(() => {
      expect(run).toBe(1)
      done()
    }, 500)
  })

  it('call twice with short duration, the `func` will delay invoke after `lastCallTime + wait`', done => {
    let f = debounce(() => {
      run += 1
      return run
    }, 200)

    let result = f()
    setTimeout(() => {
      result = f()
    }, 100)

    setTimeout(() => {
      expect(result).toBeUndefined()
      expect(run).toBe(0)
    }, 250)

    setTimeout(() => {
      expect(result).toBeUndefined()
      expect(run).toBe(1)
      done()
    }, 500)
  })

  it('call twice with long duration, then `func` will be invoke twice and then second result is returnd by first invoked', done => {
    let result = f()
    setTimeout(() => {
      result = f()
    }, 200)

    setTimeout(() => {
      expect(run).toBe(1)
      expect(result).toBeUndefined()
    }, 150)

    setTimeout(() => {
      expect(run).toBe(2)
      expect(result).toBe(1)
      done()
    }, 500)
  })
})