import { timeFunc } from "./time-func"
import { day01part1, day01part2 } from "./solutions/01"

const solutions =
{ '011': day01part1, '012': day01part2
}

let day = process.argv[ 2 ]
  , part1 = solutions[ `${day}1` ]
  , part2 = solutions[ `${day}2` ]
  , time
  , result

  if (part1) {
    time = timeFunc(() => result = part1())
    console.log(`Part 1:\n  solution: ${result}\n  time: ${time} ms\n`)
  }
  if (part2) {
    time = timeFunc(() => result = part2())
    console.log(`Part 2:\n  solution: ${result}\n  time: ${time} ms\n`)
  }