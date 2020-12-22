import { parseInteger } from '../converters'
import { getLines } from '../input-helpers'

let numbers;
const getInput = () => numbers = getLines('09').map(parseInteger)

const checkNumber = (position) => {
  let target = numbers[position]
  let start = position - 25
  let end = position

  for (let i = start; i < end - 1; i++)
    for (let k = i + 1; k < end; k++)
      if (numbers[i] + numbers[k] === target)
        return true

  return false
}

export const day09part1 = () => {
  getInput()
  let position = 25
  while (checkNumber(position))
    position++
  
  return numbers[position]
}

export const day09part2 = () => {
  let target = 675280050
  let start = 0
  
  while (true) {
    let position = start
    let sum = 0
    let min = Infinity
    let max = 0
    while (sum < target) {
      let current = numbers[position]
      sum += current

      if (current < min)
        min = current

      if (current > max)
        max = current

      position++
    }

    if (sum === target)
      return min + max
    else
      start++
  }
}
