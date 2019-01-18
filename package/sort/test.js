import bubble from './bubble'
import select from './select'

const suite = (arr, res) => {
  it(`Bubble: [${arr.toString()}]`, () => {
    const r = bubble(arr)
    expect(r).toEqual(res)
  })

  it(`Select: [${arr.toString()}]`, () => {
    const r = select(arr)
    expect(r).toEqual(res)
  })
}

suite([5,4,3,2,1], [1,2,3,4,5])
suite([5,3,4,2,1], [1,2,3,4,5])
suite([5,2,3,4,1], [1,2,3,4,5])
suite([5,1,2,3,4], [1,2,3,4,5])

suite([3,4,3,2,1], [1,2,3,3,4])


suite([2,1,2,2,2], [1,2,2,2,2])