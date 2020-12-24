import { getLines } from "../input-helpers"

const getInput = () => {
  return getLines('24')
}

const followPath = path => {
  let coord = {x: 0, y: 0, z: 0}
  let i = -1
  while (true) {
    let direction = path[++i]
    if (direction == undefined) 
      break
    else if (direction == 's' || direction == 'n')
      direction += path[++i]
    

    if (direction == 'w') {
      coord.x -= 1
      coord.y += 1
    } else if (direction == 'e') {
      coord.x += 1
      coord.y -= 1
    } else if (direction == 'nw') {
      coord.y += 1
      coord.z -= 1
    } else if (direction == 'se') {
      coord.y -= 1
      coord.z += 1
    } else if (direction == 'ne') {
      coord.x += 1
      coord.z -= 1
    } else if (direction == 'sw') {
      coord.x -= 1
      coord.z += 1
    } else {
      console.log('uknown direction:', direction)
    }
  }

  return coord
}

const startingGrid = () => {
  let grid = {}
  getInput()
    .map(followPath)
    .forEach(({x, y, z}) => {
      let key = JSON.stringify([x, y, z])
      grid[ key ] = !grid[ key ]
    })

  return grid
}

const maxRadius = grid =>
  Object.keys(grid).reduce(
    (max, key) => Math.max.apply(Math, [ max, ...JSON.parse(key).map(Math.abs) ])
    , 0
  ) + 1

const neighbors = ([x, y, z]) => [
  [ x +1, y -1, z    ],
  [ x   , y -1, z +1 ],
  [ x -1, y   , z +1 ],
  [ x -1, y +1, z    ],
  [ x   , y +1, z -1 ],
  [ x +1, y   , z -1 ]
]

const countAlive = grid => Object.keys(grid).reduce((sum, key) => grid[key] ? sum+1 : sum, 0)


export const day24part1 = () => {
  return countAlive(startingGrid())
}

export const day24part2 = () => {
  let grid = startingGrid()
  for (let i = 1; i <= 100; i++) {
    let radius = maxRadius(grid)
    let newGrid = {}
    for (let x = -radius; x <= radius; x++) {
      for (let y = -radius; y <= radius; y++) {
        let z = 0 - x - y
        let key = JSON.stringify([x, y, z])
        let count = neighbors([x, y, z]).reduce(
          (count, neighbor) => grid[JSON.stringify(neighbor)] ? count+1 : count
          , 0)
        
        if (grid[ key ]) { // currently black
          if (count > 0 && count <= 2) { // doesn't starve
            newGrid[ key ] = true
          }
        } else {  // currently white
          if (count == 2) { // spawned from neighbors
            newGrid[ key ] = true
          }
        }
      }
    }
    grid = newGrid
  }
  
  return countAlive(grid)
}
