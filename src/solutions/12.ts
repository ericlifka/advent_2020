import { getLines } from '../input-helpers'
import { parseInteger } from '../converters'
import { doTimes } from '../functional'

let instructions;
const getInput = () => 
instructions = getLines('12')
  .map(ins => ({
    ins: ins[0], 
    val: parseInteger(ins.slice(1))
  }))

const rRight = ([x, y]) => [y, -1 * x]
const rLeft = ([x, y]) => [-1 * y, x]

const rRightTimes = (point, n) =>
  (doTimes(n, () => point = rRight(point)), point)

const rLeftTimes = (point, n) =>
  (doTimes(n, () => point = rLeft(point)), point)

export const day12part1 = () => {
  getInput()
  
  let [fx, fy] = [1, 0]
  let [x, y] = [0, 0]

  instructions.forEach(({ins, val}) => {
    switch (ins) {
      case 'N': y += val; break
      case 'S': y -= val; break
      case 'E': x += val; break
      case 'W': x -= val; break
      case 'R': [fx, fy] = rRightTimes([fx, fy], val / 90); break
      case 'L': [fx, fy] = rLeftTimes([fx, fy], val / 90); break
      case 'F': [x, y] = [x + fx * val, y + fy * val]; break
    }
  })

  return Math.abs(x) + Math.abs(y)
}

export const day12part2 = () => {
  let [x, y] = [0, 0]
  let [wx, wy] = [10, 1]

  instructions.forEach(({ins, val}) => {
    switch (ins) {
      case 'N': wy += val; break
      case 'S': wy -= val; break
      case 'E': wx += val; break
      case 'W': wx -= val; break
      case 'R': [wx, wy] = rRightTimes([wx, wy], val / 90); break
      case 'L': [wx, wy] = rLeftTimes([wx, wy], val / 90); break
      case 'F': doTimes(val, () => [x, y] = [x + wx, y + wy]); break
    }
  })

  return Math.abs(x) + Math.abs(y)
}
