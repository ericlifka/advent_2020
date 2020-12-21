import { timeFunc } from "./time-func"
import { day01part1, day01part2 } from "./solutions/01"
import { day02part1, day02part2 } from "./solutions/02"
import { day03part1, day03part2 } from "./solutions/03"
import { day04part1, day04part2 } from "./solutions/04"
import { day05part1, day05part2 } from "./solutions/05"
import { day06part1, day06part2 } from "./solutions/06"
import { day07part1, day07part2 } from "./solutions/07"
import { day08part1, day08part2 } from "./solutions/08"
import { day09part1, day09part2 } from "./solutions/09"
import { day10part1, day10part2 } from "./solutions/10"
import { day11part1 } from "./solutions/11_1"
import { day11part2 } from "./solutions/11_2"
import { day12part1, day12part2 } from "./solutions/12"
import { day13part1, day13part2 } from "./solutions/13"
import { day14part1, day14part2 } from "./solutions/14"
import { day15part1, day15part2 } from "./solutions/15"
import { day16part1, day16part2 } from "./solutions/16"
import { day17part1 } from "./solutions/17_1"
import { day17part2 } from "./solutions/17_2"
import { day18part1, day18part2 } from "./solutions/18"
import { day19part1, day19part2 } from "./solutions/19"
import { day20part1, day20part2 } from "./solutions/20"
import { day21part1, day21part2 } from "./solutions/21"

const solutions =
{ '011': day01part1, '012': day01part2
, '021': day02part1, '022': day02part2
, '031': day03part1, '032': day03part2
, '041': day04part1, '042': day04part2
, '051': day05part1, '052': day05part2
, '061': day06part1, '062': day06part2
, '071': day07part1, '072': day07part2
, '081': day08part1, '082': day08part2
, '091': day09part1, '092': day09part2
, '101': day10part1, '102': day10part2
, '111': day11part1, '112': day11part2
, '121': day12part1, '122': day12part2
, '131': day13part1, '132': day13part2
, '141': day14part1, '142': day14part2
, '151': day15part1, '152': day15part2
, '161': day16part1, '162': day16part2
, '171': day17part1, '172': day17part2
, '181': day18part1, '182': day18part2
, '191': day19part1, '192': day19part2
, '201': day20part1, '202': day20part2
, '211': day21part1, '212': day21part2
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
