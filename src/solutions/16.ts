import { getLines } from '../input-helpers'
import { parseInteger } from '../converters'

let myTicket = [83,53,73,139,127,131,97,113,61,101,107,67,79,137,89,109,103,59,149,71]

let rules = getLines('16_rules')
  .map(line => {
    let match = line.match(/(.*) (\d+-\d+) or (\d+-\d+)/)
    return {
      name: match[1],
      r1: match[2].split('-').map(parseInteger),
      r2: match[3].split('-').map(parseInteger)
    }
  })

let tickets = getLines('16_1')
  .map(line => line.split(','))
  .map(ticket => ticket.map(parseInteger))

let columns = tickets[0].length

const testNum = n => {
  for (let { r1: [ll, lu], r2: [ul, uu] } of rules)
    if (n >= ll && n <= lu || n >= ul && n <= uu)
      return true
  
  return false
}

export const day16part1 = () => {
  let invalid = 0
  tickets.forEach(ticket => {
    ticket.forEach(n => {
      if (!testNum(n)) {
        invalid += n
      }
    })
  })
  return invalid
}

const testTicket = ticket => {
  for (let n of ticket)
    if (!testNum(n))
      return false
  return true
}

const testRule = (r, n) =>
  n >= r.r1[0] && n <= r.r1[1] || n >= r.r2[0] && n <= r.r2[1]


const testRuleColumn = (rule, column, tickets) => {
  for (let ticket of tickets)
    if (!testRule(rule, ticket[ column ]))
      return false
  return true
}

export const day16part2 = () => {
  let validTickets = tickets.filter(testTicket)
  let locked = []

  let valids = rules
    .map(rule => {
      let valid = []
      for (let c = 0; c < columns; c++) {
        if (testRuleColumn(rule, c, validTickets)) {
          valid.push(c)
        }
      }
      return {
        rule: rule.name,
        valid
      }
    })
    .sort((l, r) => l.valid.length - r.valid.length)

  while (valids.length > 0) {
    let rule = valids.shift()
    let column = rule.valid[0]
    locked[column] = rule.rule
    
    valids.forEach(rule => {
      rule.valid = rule.valid.filter(n => n != column)
    })

    valids = valids.sort((l, r) => l.valid.length - r.valid.length)
  }

  let answer = 1
  locked.forEach((r, i) => {
    if (/departure/.test(r))
      answer *= myTicket[ i ]
  })

  return answer
}
