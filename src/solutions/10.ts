import { parseInteger } from '../converters'
import { getLines } from '../input-helpers'
import { ascending } from '../converters'

let adapters = getLines('10')
  .map(parseInteger)
  .sort(ascending)
adapters =  [0, ...adapters, adapters[adapters.length - 1] + 3]

export const day10part1 = () => {
  let ones = 0
  let threes = 0
  for (let i = 0; i < adapters.length - 1; i++)
    if (adapters[i] + 1 === adapters[i+1]) 
      ones++
    else
      threes++
  
  return ones * threes
}

/*
permutations of different length runs:
2 - 123 -> (123 | 13) -> 2
3 - 1234 -> (1234 | 124 | 134 | 14) -> 4
4 - 12345 -> (12345 | 1235 | 1245 | 1345 | 145 | 125 | 135) -> 7
*/
let multipliers = {
  2: 2,
  3: 4,
  4: 7
}

export const day10part2 = () => {
  let runs = []

  let currentRun = 0
  for (let i = 1; i < adapters.length; i++)
    if (adapters[i] -1 === adapters[i - 1])
      currentRun++
    else {
      if (currentRun > 1)
        runs.push(currentRun)
      currentRun = 0
    }

  return runs.reduce((total, run) => total * multipliers[run], 1)
}
