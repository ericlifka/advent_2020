import {getLines} from '../input-helpers'

let lines = getLines('17')
  .map(line => line.split(''))

const isAlive = (game, x, y, z, w) =>
  game[`${x},${y},${z},${w}`] == '#'

const countNeighbors = (game, x, y, z, w) => {
  let count = 0
  for (let _x = -1; _x <= 1; _x++) {
    for (let _y = -1; _y <= 1; _y++) {
      for (let _z = -1; _z <= 1; _z++) {
        for (let _w = -1; _w <= 1; _w++) {
          if (!(_x == 0 && _y == 0 && _z == 0 && _w == 0) && 
              isAlive(game, x+_x, y+_y, z+_z, w+_w)) {
            count++
          }
        }
      }
    }
  }
  return count
}

const nextGen = game => {
  let next = {}

  for (let x = -10; x <= 20; x++) {
    for (let y = -10; y <= 20; y++) {
      for (let z = -10; z <= 20; z++) {
        for (let w = -10; w <= 20; w++) {
          let neighbors = countNeighbors(game, x, y, z, w)

          if (isAlive(game, x, y, z, w)) {
            if (neighbors == 2 || neighbors == 3) {
              next[`${x},${y},${z},${w}`] = '#'
            }
          } else {
            if (neighbors == 3) {
              next[`${x},${y},${z},${w}`] = '#'
            }
          }
        }
      }
    }
  }

  return next
}

export const day17part2 = () => {
  let game = {}

  lines.forEach((line, y) => {
    line.forEach((ch, x) => {
      game[`${x},${y},${0},${0}`] = ch
    })
  })

  for (let i = 0; i < 6; i++) {
    game = nextGen(game)
  }

  return Object.keys(game).length
}
