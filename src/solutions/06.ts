import { getLines } from '../input-helpers'
import { reduceSum } from '../converters'
import { union, intersection } from '../sets'

const getInput = () => 
getLines('06')
  .join('\n')
  .split('\n\n')
  .map( group => group.split('\n')
                      .map( person => new Set(person.split(''))))

export const day06part1 = () => {
  return getInput()
    .map( group => 
      group.reduce((sum, person) => 
        union(sum, person)).size )
    .reduce(reduceSum)
}

export const day06part2 = () => {
  return getInput()
    .map( group => 
      group.reduce((sum, person) => 
        intersection(sum, person)).size )
    .reduce(reduceSum)
}
