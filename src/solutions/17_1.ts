import {getLines} from '../input-helpers'

let lines = getLines('17')
  .map(line => line.split(''))

const isAlive = (game, x, y, z) =>
  game[`${x},${y},${z}`] == '#'

const countNeighbors = (game, x, y, z) => {
  let count = 0
  for (let _x = -1; _x <= 1; _x++) {
    for (let _y = -1; _y <= 1; _y++) {
      for (let _z = -1; _z <= 1; _z++) {
        if (!(_x == 0 && _y == 0 && _z == 0) && 
            isAlive(game, x+_x, y+_y, z+_z)) {
          count++
        }
      }
    }
  }
  return count
}

const nextGen = game => {
  let next = {}

  for (let x = -10; x <= 20; x++) {
    for (let y = -10; y<= 20; y++) {
      for (let z = -10; z<= 20; z++) {
        let neighbors = countNeighbors(game, x, y, z)

        if (isAlive(game, x, y, z)) {
          if (neighbors == 2 || neighbors == 3) {
            next[`${x},${y},${z}`] = '#'
          }
        } else {
          if (neighbors == 3) {
            next[`${x},${y},${z}`] = '#'
          }
        }
      }
    }
  }

  return next
}

export const day17part1 = () => {
  let game = {}

  lines.forEach((line, y) => {
    line.forEach((ch, x) => {
      game[`${x},${y},${0}`] = ch
    })
  })

  for (let i = 0; i < 6; i++) {
    game = nextGen(game)
  }

  return Object.keys(game).length
}
