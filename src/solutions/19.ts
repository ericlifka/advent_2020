import { getLines } from '../input-helpers'
import { parseInteger } from '../converters'
import { isLineBreak } from 'typescript'


let rules = {}

getLines('19_rules')
  .map(line => line.split(': '))
  .map(([rule, text]) => 
    (/"."/.test(text))
      ? { rule, char: text[1] }
      : {
        rule,
        segments: text.split(' | ').map(segment => segment.split(' '))
      }
  )
  .forEach(r => {
    rules[r.rule] = r
  })
let messages = getLines('19_messages')

rules.forEach(r => console.log(r))



export const day19part1 = () => {

}

export const day19part2 = () => {
  
}
