import { getLines } from '../input-helpers'

const getInput = () =>
  getLines('03')
    .map(line => line.repeat(100))
    .map(line => line.split(''))

function checkSlope(grid, dx, dy) {
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
  let grid = getInput()
  return checkSlope(grid, 3, 1)
}

export const day03part2 = () => {
  let grid = getInput()
  return checkSlope(grid, 1, 1) *
         checkSlope(grid, 3, 1) *
         checkSlope(grid, 5, 1) *
         checkSlope(grid, 7, 1) *
         checkSlope(grid, 1, 2)
}
