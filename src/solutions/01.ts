import { getLines } from '../input-helpers'
import { parseInteger } from '../converters'

const getInput = () =>
  getLines('01')
    .map(parseInteger)

export const day01part1 = () => {
  let numbers = getInput()
  for (let first = 0; first < numbers.length - 1; first++) {
    for (let second = first + 1; second < numbers.length; second++) {
      if (numbers[first] + numbers[second] === 2020) {
        return numbers[first] * numbers[second]
      }
    }
  }
}

export const day01part2 = () => {
  let numbers = getInput()
  for (let first = 0; first < numbers.length - 2; first++) {
    for (let second = first + 1; second < numbers.length - 1; second++) {
      for (let third = second + 1; third < numbers.length; third++) {
        if (numbers[first] + numbers[second] + numbers[third] === 2020) {
          return numbers[first] * numbers[second] * numbers[third]
        }
      }
    }
  }
}
