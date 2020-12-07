import { timeFunc } from "./time-func"
import { day01part1, day01part2 } from "./solutions/01"
import { day02part1, day02part2 } from "./solutions/02"
import { day03part1, day03part2 } from "./solutions/03"
import { day04part1, day04part2 } from "./solutions/04"
import { day05part1, day05part2 } from "./solutions/05"
import { day06part1, day06part2 } from "./solutions/06"
import { day07part1, day07part2 } from "./solutions/07"
import { day08part1, day08part2 } from "./solutions/08"

const solutions =
{ '011': day01part1, '012': day01part2
, '021': day02part1, '022': day02part2
, '031': day03part1, '032': day03part2
, '041': day04part1, '042': day04part2
, '051': day05part1, '052': day05part2
, '061': day06part1, '062': day06part2
, '071': day07part1, '072': day07part2
, '081': day08part1, '082': day08part2
}

let day = process.argv[ 2 ]
  , part1 = solutions[ `${day}1` ]
  , part2 = solutions[ `${day}2` ]
  , time
  , result

time = timeFunc(() => result = part1())
console.log(`Part 1:\n  solution: ${result}\n  time: ${time} ms\n`)

time = timeFunc(() => result = part2())
console.log(`Part 2:\n  solution: ${result}\n  time: ${time} ms\n`)
