import { getLines } from '../input-helpers'
import { parseInteger } from '../converters'

function checkEntry(val, list) {
  if (!list.length) return false

  let [next, ...rest] = list
  if (next + val === 2020)
    return [next, val]
  else return checkEntry(val, rest)
}

export const day01part1 = () => {
  let numbers = getLines('01')
    .map(parseInteger)
  let first

  while (numbers.length > 0) {
    [first, ...numbers] = numbers
    let result = checkEntry(first, numbers)
    if (result)
      return result[0] * result[1]
  }
}

export const day01part2 = () => {}