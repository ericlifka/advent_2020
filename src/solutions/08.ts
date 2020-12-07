import { parseInteger } from '../converters'
import { getLines } from '../input-helpers'

const getProgram = () => 
  getLines('08')
    .map(line => line.split(' '))
    .map(([instruction, number]) => ({instruction, value: parseInteger(number), visited: false}))



export const day08part1 = () => {
  let program = getProgram()
  let accumulator = 0
  let i = 0
  while (true) {
    let {instruction, value, visited} = program[i]
    if (visited) {
      return accumulator
    } else {
      program[i].visited = true
    }

    if (instruction === 'nop') {
      i++
    }
    if (instruction === 'acc') {
      accumulator += value
      i++
    }
    if (instruction === 'jmp') {
      i += value
    }
  }
}

export const day08part2 = () => {
  let masterProgram = getProgram()

  for (let k = 0; k < masterProgram.length; k++) {
    let newProgram = masterProgram.map(({instruction, value, visited}) => ({instruction, value, visited}))
    let modifiedInstruction = newProgram[k]
    
    if (modifiedInstruction.instruction === 'acc') {
      continue
    }
    else if (modifiedInstruction.instruction === 'nop') {
      newProgram[k] = {
        ...modifiedInstruction,
        instruction: 'jmp',
      }
    }
    else if (modifiedInstruction.instruction === 'jmp') {
      newProgram[k] = {
        ...modifiedInstruction,
        instruction: 'nop'
      }
    }

    let accumulator = 0
    let i = 0
    while (true) {
      if (!newProgram[i]) {
        return accumulator
      }

      let {instruction, value, visited} = newProgram[i]
      if (visited) {
        break
      } else {
        newProgram[i].visited = true
      }

      if (instruction === 'nop') {
        i++
      }
      if (instruction === 'acc') {
        accumulator += value
        i++
      }
      if (instruction === 'jmp') {
        i += value
      }
    }
  }
}
