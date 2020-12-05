import { getLines } from '../input-helpers'

let passes = getLines('05')
  .map(line => ({
    col: line.slice(7),
    row: line.slice(0, 7)
  }))

type Range = [ number, number ]

const reduceRange = (letter, [lower, upper]): Range => {
  if (letter === 'F' || letter === 'L') {
    return [ lower, (upper - lower - 1) / 2 + lower ]
  } else {
    return [ (upper - lower + 1) / 2 + lower, upper ]
  }
}

const runCode = (code): number => {
  let range: Range = code.length === 7 ? [0, 127] : [0, 7]
  code = code.split('')
  code.forEach(letter =>
    range = reduceRange(letter, range))
  return range[0]
}

const calcSeatId = ({col, row}) => runCode(row) * 8 + runCode(col)

export const day05part1 = () => {
  let max = 0
  passes.forEach(pass => {
    let id = calcSeatId(pass)
    if (id > max)
      max = id
  })
  return max
}

export const day05part2 = () => {
  let seats = []
  passes.forEach(pass => seats.push(calcSeatId(pass)))
  seats = seats.sort((l, r) => l - r)

  for (let i = 0; i < seats.length - 1; i++)
    if (seats[i] + 1 !== seats[i + 1])
      return seats[i] + 1

  return seats
}
