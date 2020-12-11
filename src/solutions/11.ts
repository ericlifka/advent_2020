import { getLines } from '../input-helpers'
import { parseInteger } from '../converters'

let startingGrid = getLines('11').map(line => line.split(''))
const height = startingGrid.length
const width = startingGrid[0].length

const emptyGrid = () => {
  let newGrid = []
  for (let i = 0; i < height; i++)
    newGrid.push([])
  return newGrid
}

const isEmpty = (state) => state !== '#'

const getState = (grid, [x, y]) => {
  if (x < 0 || y < 0 || x >= width || y >= height)
    return '.'
  
  return grid[y][x]
}

const neighbors = ([x, y]): [number, number][] => [
  [x - 1, y],
  [x + 1, y],
  [x, y - 1],
  [x, y + 1],
  [x - 1, y - 1],
  [x + 1, y + 1],
  [x - 1, y + 1],
  [x + 1, y - 1]
]

const getNextState = (grid, point) => {
  let state = getState(grid, point)
  let count = neighbors(point)
    .reduce((sum, neighbor) => isEmpty(getState(grid, neighbor)) ? sum : sum + 1, 0)

  if (state === 'L' && count <= 0)
    return '#'
  else if (state === '#' && count >= 4)
    return 'L'
  else
    return state
}

const compareGrids = (grid1, grid2) => {
  for (let x = 0; x < width; x++) {
    for (let y = 0; y < height; y++) {
      if (grid1[y][x] !== grid2[y][x]) {
        return false
      }
    }
  }
  return true
}

const countSeats = (grid) => {
  let sum = 0
  for (let x = 0; x < width; x++) {
    for (let y = 0; y < height; y++) {
      if (grid[y][x] === '#') {
        sum++
      }
    }
  }
  return sum
}

export const day11part1 = () => {
  let grid = startingGrid
  let newGrid = emptyGrid()

  while (true) {
    for (let x = 0; x < width; x++) {
      for (let y = 0; y < height; y++) {
        newGrid[y][x] = getNextState(grid, [x, y])
      }
    }
    if (compareGrids(grid, newGrid)) {
      return countSeats(newGrid)
    } else {
      grid = newGrid
      newGrid = emptyGrid()
    }
  }
}

export const day11part2 = () => {}
