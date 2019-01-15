const lodash = require('lodash')
const debounce = lodash.debounce

describe('debounce:', () => {
  let index = 0
  const f = debounce(function() {
    console.log('invoke')
    index++
  }, 100)

  // beforeEach(() => {
  //   index = 0
  // })

  it('run 100 times, each cost 10ms', done => {
    let times = 0
    const t = () => {
      f()
      times++
      if (times < 100) {
        setTimeout(t, 10)
      } else {
        setTimeout(() => {
          expect(index).toBe(5)
          done()
        }, 500);
      }
    }
    t()
  })
})