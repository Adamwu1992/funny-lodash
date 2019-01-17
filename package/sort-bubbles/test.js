import {
  bubble,
  bubble2
} from './index'

const suite = (arr, res) => {
  const desc = `[${arr.toString()}]`
  it(desc, () => {
    const r = bubble(arr)
    const r2 = bubble2(arr)
    expect(r).toEqual(res)
    expect(r2).toEqual(res)
  })
}

suite([5,4,3,2,1], [1,2,3,4,5])
suite([5,3,4,2,1], [1,2,3,4,5])
suite([5,2,3,4,1], [1,2,3,4,5])
suite([5,1,2,3,4], [1,2,3,4,5])

suite([3,4,3,2,1], [1,2,3,3,4])


suite([2,1,2,2,2], [1,2,2,2,2])