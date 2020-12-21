import { getLines } from '../input-helpers'
import { parseInteger } from '../converters'

const getInput = () =>
  getLines('02')
    .map((line: string) => line.split(': '))
    .map(([spec, password]: [string, string]) => [spec.split(' '), password])
    .map(([[range, letter], password]: [[string, string], string]) => [range.split('-'), letter, password])
    .map(([[left, right], letter, password]: [[string, string], string, string]) => ({
      left: parseInteger(left),
      right: parseInteger(right),
      letter,
      password
    }))

function bucket(st) {
  let letters = st.split('')
  let bucket = { }

  letters.forEach( l => {
    bucket[l] = bucket[l]
      ? bucket[l] + 1
      : 1
  })

  return bucket
}

export const day02part1 = () => {
  let entries = getInput()
  let count = 0

  entries.forEach(({ left, right, letter, password }) => {
    let c = bucket(password)[letter] || 0
    if (c >= left && c <= right)
      count++
  })

  return count
}

export const day02part2 = () => {
  let entries = getInput()
  let count = 0

  entries.forEach(({ left, right, letter, password }) => {
    let l = password[ left - 1 ]
    let r = password[ right - 1 ]

    if ( l === letter && r !== letter || l !== letter && r === letter )
      count++
  })

  return count
}
