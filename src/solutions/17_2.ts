import { parseInteger } from '../converters'
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

const ranges = game => {
  let min = { x: 0, y: 0, z: 0, w: 0 }
  let max = { x: 0, y: 0, z: 0, w: 0 }
  Object.keys(game).forEach(key => {
    let [x, y, z, w] = key.split(',').map(parseInteger)
    min.x = Math.min(min.x, x)
    min.y = Math.min(min.y, y)
    min.z = Math.min(min.z, z)
    min.w = Math.min(min.w, w)

    max.x = Math.max(max.x, x)
    max.y = Math.max(max.y, y)
    max.z = Math.max(max.z, z)
    max.w = Math.max(max.w, w)
  })
  return { min, max }
}

const nextGen = game => {
  let range = ranges(game)
  let next = {}

  for (let x = range.min.x - 1; x <= range.max.x + 1; x++) {
    for (let y = range.min.y - 1; y <= range.max.y + 1; y++) {
      for (let z = range.min.z - 1; z <= range.max.z + 1; z++) {
        for (let w = range.min.w - 1; w <= range.max.w + 1; w++) {
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
