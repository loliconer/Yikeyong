function mergeTwoSortedArrays(left, right) {
  let result = []
  let il = 0, ir = 0

  while (il < left.length && ir < right.length) {
    if (left[il] < right[ir]) {
      result.push(left[il])
      il++
    } else {
      result.push(right[ir])
      ir++
    }
  }

  return result.concat(left.slice(il)).concat(right.slice(ir))
}

function mergeSort(arr) {
  if (arr.length === 1) {
    return arr
  }

  const middle = Math.floor(arr.length / 2)
  const left = arr.slice(0, middle)
  const right = arr.slice(middle)

  return mergeTwoSortedArrays(mergeSort(left), mergeSort(right))
}

module.exports = {
  mergeSort
}
