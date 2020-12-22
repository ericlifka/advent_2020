import { getLines } from '../input-helpers'
import { parseInteger } from '../converters'
import { isLineBreak } from 'typescript'


let rules = {}
let messages;

const getInput = () => {
  messages = getLines('19_messages')

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

  // console.log(messages)
  // for (let rule in rules) {
  //   console.log(rules[ rule ])
  // }
}

function testRule(string, position, rule) {
  let ruleDef = rules[ rule ]
  
  if (ruleDef.char) {
    if (string[ position ] == ruleDef.char) {
      return position + 1
    } else {
      throw `mismatch at postion ${position}, expected ${ruleDef.char} but got ${string[ position ]}`
    }
  }

  let match = false
  for (let segment of ruleDef.segments) {
    try {
      position = testSegment(string, position, segment)
      match = true
    } catch (e) { }
    
    if (match)
      break
  }

  if (match) {
    return position
  } else {
    throw `mismatch at position ${position}, couldn't match any segments: ${ruleDef.segments.map(s => s.join(' ')).join(' | ')}`
  }
}

function testSegment(string, position, segment) {
  segment.forEach(rule => {
    position = testRule(string, position, rule)
  })
  return position
}

function testString(string) {
  try {
    let position = testRule(string, 0, '0')
    return position == string.length
  } catch (e) {
    return false
  }
}

function countMatches() {
  let count = 0
  messages.forEach(message => {
    if (testString(message))
      count++
  })
  return count
}

export const day19part1 = () => {
  getInput()

  return countMatches()
}

export const day19part2 = () => {
  rules['8'] = { rule: '8', segments: [ ['42'], ['42', '8'] ] }
  rules['11'] = { rule: '11', segments: [ ['42', '31'], ['42', '11', '31'] ] }

  return countMatches()
}
