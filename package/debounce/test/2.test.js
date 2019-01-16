import debounce from '../debounce'
// import _ from 'lodash'
// const debounce = _.debounce

/**
 * `
 * options = {
 *   leading: true
 * }
 * `
 */

describe('debounce: when `options.leading` is `true`', () => {

  let run, f
  beforeEach(() => {
    run = 0
    f = debounce(() => ++run, 100, { leading: true })
  })

  it('call once, the `func` will invoke by sync', () => {
    const result = f()
    expect(result).toBe(1)
  })

  describe('call twice with short duration', () => {
    let result
    beforeEach(() => {
      result = f()
      setTimeout(() => {
        result = f()
      }, 50)
    })

    it('the `func` will invoke twice at leading edge and trailing edge', done => {
      f()
      expect(run).toBe(1)
      setTimeout(() => {
        f()
        expect(run).toBe(1)
      }, 50)
      setTimeout(() => {
        expect(run).toBe(2)
        done()
      }, 500)
    })

    it('then second result is returned by first call', done => {
      setTimeout(() => {
        expect(result).toBe(1)
        done()
      }, 500);
    })
  })

  describe('call twice with long duration', () => {
    let result
    beforeEach(() => {
      result = f()
      setTimeout(() => {
        result = f()
      }, 200)
    })

    it('the `func` will be invoked at each leading edge', done => {
      expect(run).toBe(1)
      setTimeout(() => {
        expect(run).toBe(2)
        done()
      }, 500)
    })

    it('the result is returned by each call sync', done => {
      expect(result).toBe(1)
      setTimeout(() => {
        result = f()
        expect(result).toBe(3)
        done()
      }, 500)
    })

  })
})