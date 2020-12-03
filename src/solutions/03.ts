import { getLines } from '../input-helpers'

let grid = getLines('03')
  .map(line => line.repeat(100))
  .map(line => line.split(''))

function checkSlope(dx, dy) {
  let x = 0, y = 0, count = 0
  while (y < grid.length) {
    if (grid[y][x] === '#')
      count++

    x += dx
    y += dy
  }
  return count
}

export const day03part1 = () => {
  return checkSlope(3, 1)
}

export const day03part2 = () => {
  return checkSlope(1, 1) *
         checkSlope(3, 1) *
         checkSlope(5, 1) *
         checkSlope(7, 1) *
         checkSlope(1, 2)
}
