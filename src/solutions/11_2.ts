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
    return ',' // like floor, but not
  
  return grid[y][x]
}

const neighbors = (grid, [x, y]): [number, number][] => {
  return [
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1],
    [-1, -1],
    [1, 1],
    [-1, 1],
    [1, -1]
  ].map(([_x, _y]) => {
    let c = 1
    while (getState(grid, [x + _x * c, y + _y * c]) === '.') {
      c++
    }
    return [x + _x * c, y + _y * c]
  })
}

const getNextState = (grid, point) => {
  let state = getState(grid, point)
  let count = neighbors(grid, point)
    .reduce((sum, neighbor) => isEmpty(getState(grid, neighbor)) ? sum : sum + 1, 0)

  if (state === 'L' && count <= 0)
    return '#'
  else if (state === '#' && count >= 5)
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

export const day11part2 = () => {
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

