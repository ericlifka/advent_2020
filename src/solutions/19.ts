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

// console.log(rules)
// rules.forEach(r => console.log(r))



export const day19part1 = () => {
  let message = messages[0]
  let rule = rules['0']
  let position = 0
  let stack = [ ...rule.segments ]
  console.log(stack)

  while (stack.length > 0) {
    let next = stack.shift()
  }
}

export const day19part2 = () => {
  
}
