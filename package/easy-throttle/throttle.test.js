import throttle from './throttle'

// import _ from 'lodash'
// const throttle = _.throttle

// import debounce from '../debounce/debounce'

// const throttle = (func, wait) => debounce(func, wait, {
//   leading: true,
//   trailing: true,
//   maxWait: wait
// })


describe('throttle:', () => {
  let run, f
  beforeEach(() => {
    run = 0
    f = throttle(() => {
      run += 1
      return run
    }, 100)
  })

  it('call once, the `func` will invoke by sync', () => {
    f()
    expect(run).toBe(1)
  })

  it('call twice, the second call will be invoked at trailing edge', done => {
    f()
    setTimeout(f, 50)
    expect(run).toBe(1)
    setTimeout(() => {
      expect(run).toBe(1)
    }, 100)
    setTimeout(() => {
      expect(run).toBe(2)
      done()
    }, 200)
  })

  it('call 3 times shortly, the second call will be canceled', done => {
    let trace = []
    let log = tag => trace.push(tag)
    f = throttle(log, 100)
    f(1)
    setTimeout(f, 25, 2)
    setTimeout(f, 50, 3)

    setTimeout(() => {
      expect(trace).toEqual([1, 3])
      done()
    }, 200)
  })

  // it('call 10 times shortly, ', done => {
  //   const trace = []
  //   let start
  //   const log = v => trace.push(v)
  //   f = throttle(tag => {
  //     if(start === undefined) {
  //       start = Date.now()
  //       console.log('start', start)
  //     } else {
  //       const ms = Date.now() - start
  //       console.log('ms', ms)
  //     }
  //     log(tag)
  //     return ++run
  //   }, 100)

  //   f(1)
  //   setTimeout(f, 20, 2)
  //   setTimeout(f, 40, 3)
  //   setTimeout(f, 60, 4)
  //   setTimeout(f, 80, 5)
  //   setTimeout(f, 100, 6)
  //   setTimeout(f, 140, 7)
  //   setTimeout(f, 160, 8)
  //   setTimeout(f, 180, 9)
  //   setTimeout(f, 200, 10)
  //   setTimeout(f, 220, 11)

  //   setTimeout(() => {
  //     expect(run).toBe(4)
  //     expect(trace).toEqual([1, 5, 10, 11])
  //     done()
  //   }, 500)
  // })
})
