import { getLines } from '../input-helpers'
import { parseInteger } from '../converters'

let instructions = getLines('12')
  .map(ins => ({ins: ins[0], val: parseInteger(ins.slice(1))}))



export const day12part1 = () => {
  let facing = 90
  let x = 0
  let y = 0

  instructions.forEach(({ins, val}) => {
    // console.log(`x: ${x}, y: ${y}, ${facing} - ${ins} ${val}`)
    switch (ins) {
      case 'N': 
        y += val
        break

      case 'S':
        y -= val
        break

      case 'E':
        x += val
        break

      case 'W':
        x -= val
        break

      case 'R':
        facing = (facing + val) % 360
        break

      case 'L':
        if (val > facing) {
          facing += 360
        }
        facing = (facing - val) % 360
        break

      case 'F':
        if (facing === 0)
          y += val
        else if (facing === 90)
          x += val
        else if (facing === 180)
          y -= val
        else if (facing === 270)
          x -= val
        else
          console.log('BAD ANGLE', facing)
        break

      default:
        console.log('BAD INSTRUCTION', ins, val)
      }
  })
  return Math.abs(x) + Math.abs(y)
}

const rRight = ([x, y]) => [y, -1 * x]
const rLeft = ([x, y]) => [-1 * y, x]

const rRightTimes = (point, n) => {
  for (let i = 0; i < n; i++)
    point = rRight(point)
  return point
}

const rLeftTimes = (point, n) => {
  for (let i = 0; i < n; i++)
    point = rLeft(point)

  return point
}

export const day12part2 = () => {
  let x = 0
  let y = 0
  let wx = 10
  let wy = 1

  instructions.forEach(({ins, val}) => {
    if (ins == 'N')
      wy += val
    if (ins == 'S')
      wy -= val
    if (ins == 'E')
      wx += val
    if (ins == 'W')
      wx -= val

    if (ins == 'R')
      [wx, wy] = rRightTimes([wx, wy], val / 90)
    if (ins == 'L')
      [wx, wy] = rLeftTimes([wx, wy], val / 90)

    if (ins == 'F') {
      for (let i = 0; i < val; i++) {
        x += wx
        y += wy
      }
    }
  })

  return Math.abs(x) + Math.abs(y)
}
