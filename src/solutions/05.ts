import { getLines } from '../input-helpers'

type Range = [ number, number ]

const getInput = () =>
  getLines('05')
    .map(line => ({
      col: line.slice(7),
      row: line.slice(0, 7)
    }))

const reduceRange = (letter, [lower, upper]): Range =>
  (letter === 'F' || letter === 'L')
    ? [ lower, (upper - lower - 1) / 2 + lower ]
    : [ (upper - lower + 1) / 2 + lower, upper ]

const runCode = (code): number => {
  let range: Range = code.length === 7 ? [0, 127] : [0, 7]
  code = code.split('')
  code.forEach(letter =>
    range = reduceRange(letter, range))
  return range[0]
}

const calcSeatId = ({col, row}) => runCode(row) * 8 + runCode(col)

export const day05part1 = () => {
  return getInput()
    .map(pass => calcSeatId(pass))
    .sort((l, r) => r - l)
    [0]
}

export const day05part2 = () => {
  let seats = getInput()
    .map(pass => calcSeatId(pass))
    .sort((l, r) => l - r)

  for (let i of seats)
    if (seats[i + 1] - seats[i] > 1)
      return seats[i] + 1
}
