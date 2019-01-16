import debounce from './debounce'

// import _ from 'lodash'
// const debounce = _.debounce

describe('easy-debounce:', () => {
  describe('when wait is `100`', () => {
    let f, run
    beforeEach(() => {
      run = 0
      f = debounce(() => ++run, 100)
    })

    it('call once, the `func` will invoke once after wait', done => {
      f()
      expect(run).toBe(0)
      setTimeout(() => {
        expect(run).toBe(0)
      }, 80)
      setTimeout(() => {
        expect(run).toBe(1)
        done()
      }, 120)
    })

    it('call twice with a short duration, the `func` will invole once after `wait + duration`', done => {
      f()
      setTimeout(f, 80)

      expect(run).toBe(0)
      setTimeout(() => {
        expect(run).toBe(0)
      }, 100)
      setTimeout(() => {
        expect(run).toBe(0)
      }, 150)
      setTimeout(() => {
        expect(run).toBe(1)
        done()
      }, 200)
    })

    it('call three times with a short times, the `func` will invole once after `wait + 2*duration`', done => {
      f()
      setTimeout(() => {
        f()
        setTimeout(f, 80)
      }, 80)
      

      expect(run).toBe(0)
      setTimeout(() => {
        expect(run).toBe(0)
      }, 100)
      setTimeout(() => {
        expect(run).toBe(0)
      }, 200)
      setTimeout(() => {
        expect(run).toBe(1)
        done()
      }, 300)
    })

    it('call twice with long duration, the second result is the first call retuend', done => {
      let result = f()
      setTimeout(() => {
        result = f()
      }, 200)

      setTimeout(() => {
        expect(result).toBe(1)
        done()
      }, 300)
    })
  })

  it('call twice with short duration, the first call is canceled', done => {
    let run = 0
    let add = n => {
      run += n
    }
    let f = debounce(add, 100)

    f(1)
    setTimeout(() => {
      f(10)
    }, 80)

    setTimeout(() => {
      expect(run).toBe(10)
      done()
    }, 200)
  })

})