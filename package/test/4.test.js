import debounce from '../debounce'
// import _ from 'lodash'
// const debounce = _.debounce

describe('debounce: when `options.leading` is `true` and `options.trailing` is `false`', () => {
  let run, f

  beforeEach(() => {
    run = 0
    f = debounce(() => ++run, 100, {
      leading: true,
      trailing: false
    })
  })

  it('call once, the `func` will not invoke once at leading edge', done => {
    f()
    expect(run).toBe(1)
    setTimeout(() => {
      expect(run).toBe(1)
      done()
    }, 500)
  })

  it('call twice with short duration, the `func` will invoke once at leading edge', done => {
    f()
    expect(run).toBe(1)
    setTimeout(() => {
      f()
      expect(run).toBe(1)
    }, 50)
    setTimeout(() => {
      expect(run).toBe(1)
      done()
    }, 500)
  })

  it('call twice with long duration, the `func` will invoke once at leading edge in each call', done => {
    f()
    expect(run).toBe(1)
    setTimeout(() => {
      f()
      expect(run).toBe(2)
    }, 200)
    setTimeout(() => {
      expect(run).toBe(2)
      done()
    }, 500)
  })
})