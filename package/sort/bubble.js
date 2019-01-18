import { isArray } from '../.internal/utils'

export default function bubble(arr) {
  if (!isArray(arr) || arr.length === 1) return arr

  let right = arr.length
  let left

  while (right > 0) {
    let sorted = true
    for (left = 0; left < right - 1; left++) {
      const l = arr[left]
      const r = arr[left + 1]
      if (l > r) {
        sorted = false
        arr[left + 1] = l
        arr[left] = r
      }
    }
    if (sorted) break
    right -= 1  
  }
  return arr
}