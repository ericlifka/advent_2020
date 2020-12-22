import { getLines } from '../input-helpers'
import { parseInteger, splitter } from '../converters'
import { union } from '../sets'

let data;
const getInput = () => {
data = getLines('07')
  .map(splitter(' bags contain '))
  .map(([color, targets]) => ({
    color, 
    contains: targets.split(',')
                     .map(str => {
                       let match = str.match(/\d (.*) bag.*/)
                       return match ? match[1] : null
                     })
  }))
}

function findContainsColor(target) {
  let colors = new Set()
  data.forEach(({color, contains}) => {
    if (contains.includes(target))
      colors.add(color)
  })
  return colors
}

function findContainsAll(targets) {
  let contains = new Set()
  targets.forEach(target => {
    let colors = findContainsColor(target)
    contains = union(contains, colors)
  })
  return contains
}

export const day07part1 = () => {
  getInput()
  let last = 0
  let colors = new Set(findContainsColor('shiny gold'))
  let interations = 0
  while (last !== colors.size) {
    last = colors.size
    colors = union(colors, findContainsAll(colors))
  }
  return colors.size
}

const bags = getLines('07')
  .map(splitter(' bags contain '))
  .map(([color, targets]) => ({
    color, 
    contains: targets.split(',')
                     .map(str => {
                       let match = str.match(/(\d+) (.*) bag.*/)
                       return !match ? null
                        : {
                          color: match[2],
                          count: parseInteger(match[1])
                        }
                     })
  }))
  .reduce((collection, entry) => {
    collection[entry.color] = entry.contains
    return collection
  }, {})

export const day07part2 = () => {
  let queue = [ 'shiny gold' ]
  let count = -1
  while (queue.length > 0) {
    let next = queue.pop()
    count++
    let contains = bags[next]
    if (!contains || !contains.forEach) continue
    contains.forEach(entry => {
      if (entry) {
        let {color, count} = entry
        for( let i = 0; i < count; i++) {
          queue.push(color)
        }
      }
      
    })
  }
  return count
}
