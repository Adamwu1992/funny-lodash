import debounce from '../debounce'
// import _ from 'lodash'
// const debounce = _.debounce


/**
 * `
 * options = {
 *   trailing: false
 * }
 * `
 */

describe('debounce: when `options.trailing` is `false`', () => {
  let run, f

  beforeEach(() => {
    run = 0
    f = debounce(() => ++run, 100, {
      trailing: false
    })
  })

  it('call once, `func` will not invoke', done => {
    f()
    setTimeout(() => {
      expect(run).toBe(0)
      done()
    }, 500)
  })

  it('call twice with short duration, `func` will not invoke', done => {
    f()
    setTimeout(f, 50)
    setTimeout(() => {
      expect(run).toBe(0)
      done()
    }, 500)
  })

  it('call twice with long duration, `func` will not invoke', done => {
    f()
    setTimeout(f, 200)
    setTimeout(() => {
      expect(run).toBe(0)
      done()
    }, 500)
  })
})