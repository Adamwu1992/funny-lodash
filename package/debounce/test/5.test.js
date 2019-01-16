import debounce from '../debounce'
// import _ from 'lodash'
// const debounce = _.debounce

/**
 * `
 * options = {
 *    maxWait: 200
 * }
 * `
 */

describe('debounce: when `options.maxWait` is `200`', () => {
  let run, f

  beforeEach(() => {
    run = 0
    f = debounce(() => ++run, 100, {
      maxWait: 200
    })
  })

  it('call once, the func will invoke after `wait`', done => {
    f()
    expect(run).toBe(0)
    setTimeout(() => {
      expect(run).toBe(1)
      done()
    }, 200)
  })

  it('call 100 times with short duration, the `func` will invoke 6 times', done => {
    let call = 0
    const loop = () => {
      call += 1
      if (call < 100) {
        setTimeout(loop, 10)
      }
      f()
    }
    loop()

    setTimeout(() => {
      expect(run).toBe(6)
      done()
    }, 2000)
  })

  it('call 10 times with long duration', done => {
    let call = 0
    const loop = () => {
      call += 1
      if (call < 10) {
        setTimeout(loop, 150)
      }
      f()
    }
    loop()

    setTimeout(() => {
      expect(run).toBe(10)
      done()
    }, 2000)
  })
})