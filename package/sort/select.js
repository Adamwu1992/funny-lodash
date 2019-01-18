import { isArray } from '../.internal/utils'

export default function select(arr) {
  if (!isArray(arr) || arr.length === 1) return arr

  const len = arr.length
  const copyArr = arr.map(v => v)
  const res = []
  let minPos = undefined

  while(res.length < len) {
    for (let i = 0; i < len; i++) {
      if (copyArr[i] === undefined) {
        continue
      }
      if (minPos === undefined) {
        minPos = i
        continue
      }
      if (copyArr[i] < copyArr[minPos]) {
        minPos = i
      }
    }
    res.push(copyArr[minPos])
    copyArr[minPos] = undefined
    minPos = undefined
  }

  return res

}