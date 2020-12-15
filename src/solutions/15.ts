import { getLines } from '../input-helpers'

let seed = [1,12,0,20,8,16]

export const day15part1 = () => {
  let nums = {
    1: [1],
    12: [2],
    0: [3],
    20: [4],
    8: [5],
    16: [6]
  }
  let turn = 7
  let last = 16
  while (turn <= 2020) {
    let next
    if (nums[last].length == 1) {
      next = 0
    } else {
      next = nums[last][0] - nums[last][1]
    }

    if (!nums[next]) {
      nums[next] = [turn]
    } else {
      nums[next].unshift(turn)
    }
    // console.log(`${turn}: ${next}`)
    last = next
    turn++
    
  }
  return last
}

export const day15part2 = () => {
  let nums = {
    1: [1],
    12: [2],
    0: [3],
    20: [4],
    8: [5],
    16: [6]
  }
  let turn = 7
  let last = 16
  while (turn <= 30000000) {
    let next
    if (nums[last].length == 1) {
      next = 0
    } else {
      next = nums[last][0] - nums[last][1]
    }

    if (!nums[next]) {
      nums[next] = [turn]
    } else {
      nums[next][1] = nums[next][0]
      nums[next][0] = turn
    }
    // console.log(`${turn}: ${next}`)
    last = next
    turn++
    if (turn % 1000000 == 0) {
      console.log(turn)
    }
  }
  return last
}
