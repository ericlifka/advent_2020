import { getBlob } from '../input-helpers'
import { parseInteger, splitter } from '../converters'
import { doTimes } from '../functional'

const TOP = 0
const BOTTOM = 1
const LEFT = 2
const RIGHT = 3
const DISP = {
  0: 'top   ',
  1: 'bottom',
  2: 'left  ',
  3: 'right '
}

const SERPENT = [
  [1, 0],
  [2, 1],
  [2, 4],
  [1, 5],
  [1, 6],
  [2, 7],
  [2, 10],
  [1, 11],
  [1, 12],
  [2, 13],
  [2, 16],
  [1, 17],
  [1, 18],
  [1, 19],
  [0, 18],
]

let tiles, corners


function findOrientation(picture) {
  if (lookForSerpents(picture).length > 0) return picture
  picture = rotatePicture(picture)

  if (lookForSerpents(picture).length > 0) return picture
  picture = rotatePicture(picture)

  if (lookForSerpents(picture).length > 0) return picture
  picture = rotatePicture(picture)

  if (lookForSerpents(picture).length > 0) return picture
  picture = flipPicture(picture)

  if (lookForSerpents(picture).length > 0) return picture
  picture = rotatePicture(picture)

  if (lookForSerpents(picture).length > 0) return picture
  picture = rotatePicture(picture)

  if (lookForSerpents(picture).length > 0) return picture
  picture = rotatePicture(picture)

  if (lookForSerpents(picture).length > 0) return picture

  console.log("COULDN'T FIND ANY SERPENTS")
  return picture
}

function lookForSerpents(picture) {
  let serpents = []
  for (let y = 0; y < picture.length; y++) {
    for (let x = 0; x < picture[0].length; x++) {
      let match = true
      for (let [_y, _x] of SERPENT) {
        if (!picture[y + _y] || picture[y + _y][x + _x] != '#') {
          match = false
          break
        }
      }
      if (match) {
        serpents.push([y, x])
      }
    }
  }
  return serpents
}

function removeSerpents(picture, serpents) {
  for (let [y, x] of serpents) {
    for (let [_y, _x] of SERPENT) {
      picture[y + _y][x + _x] = '.'
    }
  }
}

function assemblePicture(grid) {
  let offset = grid[0][0].rows[0].length - 2
  let picture = []

  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[0].length; x++) {
      let tile = grid[y][x]
      
      for (let _y = 0; _y < tile.rows.length - 2; _y++) {
        for (let _x = 0; _x < tile.rows[0].length - 2; _x++) {
          let dy = y * offset + _y
          let dx = x * offset + _x
          if (!picture[dy]) {
            picture[dy] = []
          }

          picture[dy][dx] = tile.rows[_y + 1][_x + 1]
        }
      }
    }
  }

  return picture
}

function assembleRow(row) {
  let tile = row[ 0 ]
  let next 
  while (next = findTile(tile.sides[RIGHT].match.id)) {
    let matchPosition = tile.sides[RIGHT].match.position
    let rotations = matchPosition == LEFT ? 0
                  : matchPosition == BOTTOM ? 1
                  : matchPosition == RIGHT ? 2
                  : matchPosition == TOP ? 3
                  : 4; // idk lol 

    doTimes(rotations, () => rotateRight(next))

    if (needsReverse(tile.sides[RIGHT].side, next.sides[LEFT].side)) {
      flipTile(next)
    }

    row.push(next)
    tile = next
  }
}

function startNextRow(row) {
  let first = findTile(row[0].sides[BOTTOM].match.id)
  if (!first) return null

  let matchPosition = row[0].sides[BOTTOM].match.position
  let rotations = matchPosition == TOP ? 0
                : matchPosition == LEFT ? 1
                : matchPosition == BOTTOM ? 2
                : matchPosition == RIGHT ? 3
                : 4;
  doTimes(rotations, () => rotateRight(first))

  if (needsReverse(first.sides[TOP].side, row[0].sides[BOTTOM].side)) {
    // lol, this junk just to avoid writing a flip horizontal function
    rotateRight(first)
    flipTile(first)
    rotateRight(first)
    rotateRight(first)
    rotateRight(first)
  }
  
  return [ first ]
}

function printRow(row) {
  console.log()
  for (let i = 0; i < row[0].rows.length; ++i) {
    console.log(row.map(t => t.rows[i].join('')).join('  '))
  }
}

function printTile(tile) {
  console.log('\n')
  tile.rows.forEach(r => console.log(r.join('')))
  tile.sides.forEach(s => {
    console.log(`${DISP[s.position]}: ${s.side.join('')}, match: ${s.match.id}, ${DISP[s.match.position] || 'n/a'}`)
  })
}

function processTile(blob) {
  let [ id, ...rows ] = blob.split('\n')
  rows = rows.map(splitter(''))

  return {
    id: parseInteger(id.split(' ')[1]),
    rows,
    sides: [
      {
        position: TOP,
        match: { id: null, position: null },
        side: [...rows[0]]
      },
      {
        position: BOTTOM,
        match: { id: null, position: null },
        side: [...rows[rows.length - 1]]
      },
      {
        position: LEFT,
        match: { id: null, position: null },
        side: rows.map(r => r[0])
      },
      {
        position: RIGHT,
        match: { id: null, position: null },
        side: rows.map(r => r[r.length - 1])
      }
    ]
  }
}

function rotateRight(tile) {
  let { rows, sides } = tile
  let size = rows.length
  let newRows = []
  for (let i = 0; i < size; ++i)
    newRows[i] = []

  for (let i = 0; i < size; ++i)
    for (let j = 0; j < size; ++j)
      newRows[i][j] = rows[size - j - 1][i]

  let newSides = []

  newSides[TOP] = {
    position: TOP,
    match: sides[LEFT].match,
    side: [...newRows[0]]
  }
  let topMatch = findTile(newSides[TOP].match.id)
  if (topMatch) topMatch.sides[newSides[TOP].match.position].match.position = TOP
  
  newSides[BOTTOM] = {
    position: BOTTOM,
    match: sides[RIGHT].match,
    side: [...newRows[size - 1]]
  }
  let bottomMatch = findTile(newSides[BOTTOM].match.id)
  if (bottomMatch) bottomMatch.sides[newSides[BOTTOM].match.position].match.position = BOTTOM

  newSides[LEFT] = {
    position: LEFT,
    match: sides[BOTTOM].match,
    side: newRows.map(r => r[0])
  }
  let leftMatch = findTile(newSides[LEFT].match.id)
  if (leftMatch) leftMatch.sides[newSides[LEFT].match.position].match.position = LEFT
  
  newSides[RIGHT] = {
    position: RIGHT,
    match: sides[TOP].match,
    side: newRows.map(r => r[size - 1])
  }
  let rightMatch = findTile(newSides[RIGHT].match.id)
  if (rightMatch) rightMatch.sides[newSides[RIGHT].match.position].match.position = RIGHT

  tile.sides = newSides
  tile.rows = newRows
}

function flipTile(tile) {
  let { rows, sides } = tile
  let size = rows.length
  let newRows = []

  for (let i = 0; i < size; ++i)
    newRows[i] = rows[size - 1 - i]

  let newSides = []

  newSides[TOP] = {
    position: TOP,
    match: sides[BOTTOM].match,
    side: [...newRows[0]]
  }
  let topMatch = findTile(newSides[TOP].match.id)
  if (topMatch) topMatch.sides[newSides[TOP].match.position].match.position = TOP
  
  newSides[BOTTOM] = {
    position: BOTTOM,
    match: sides[TOP].match,
    side: [...newRows[size - 1]]
  }
  let bottomMatch = findTile(newSides[BOTTOM].match.id)
  if (bottomMatch) bottomMatch.sides[newSides[BOTTOM].match.position].match.position = BOTTOM

  newSides[LEFT] = {
    position: LEFT,
    match: sides[LEFT].match,
    side: newRows.map(r => r[0])
  }
  let leftMatch = findTile(newSides[LEFT].match.id)
  if (leftMatch) leftMatch.sides[newSides[LEFT].match.position].match.position = LEFT
  
  newSides[RIGHT] = {
    position: RIGHT,
    match: sides[RIGHT].match,
    side: newRows.map(r => r[size - 1])
  }
  let rightMatch = findTile(newSides[RIGHT].match.id)
  if (rightMatch) rightMatch.sides[newSides[RIGHT].match.position].match.position = RIGHT

  tile.sides = newSides
  tile.rows = newRows
}

function rotatePicture(picture) {
  let size = picture.length
  let newPicture = []
  for (let i = 0; i < size; ++i)
    newPicture[i] = []

  for (let i = 0; i < size; ++i)
    for (let j = 0; j < size; ++j)
      newPicture[i][j] = picture[size - j - 1][i]

  return newPicture
}

function flipPicture(picture) {
  let size = picture.length
  let newPicture = []

  for (let i = 0; i < size; ++i)
    newPicture[i] = picture[size - 1 - i]

  return newPicture
}


function matchSides() {
  for (let t1 of tiles) {
    for (let t2 of tiles) {
      if (t1.id == t2.id)
        continue

      for (let s1 of t1.sides) {
        for (let s2 of t2.sides) {
          if (compareSides(s1.side, s2.side)) {
            s1.match.id = t2.id
            s1.match.position = s2.position

            s2.match.id = t1.id
            s2.match.position = s1.position
          }
        }
      }
    }
  }
}

function compareSides(s1, s2) {
  // some wonky bullshit to compare sides that could match in either direction
  let match = true
  for (let i = 0; i < s1.length; i++) {
    if (s1[i] != s2[i]) {
      match = false
      break
    }
  }
  if (match) return true

  for (let i = 0; i < s1.length; i++) {
    if (s1[ s1.length - 1 - i ] != s2[i])
      return false
  }
  return true
}

function needsReverse(s1, s2) { // assumes sides must match in some way, if not we're gonna have a bad time
  for (let i = 0; i < s1.length; i++)
    if (s1[i] != s2[i])
      return true
  
  return false
}

function countConnections(tile) {
  let count = 0
  tile.sides.forEach(s => {
    if (s.match.id)
      count++
  })
  return count
}

function findTile(id) {
  return tiles.find(tile => tile.id == id)
}



export const day20part1 = () => {
  let blobs = 
  getBlob('20')
    .split('\n\n')
  blobs.pop() // kill the spare

  tiles = blobs.map(processTile)

  matchSides()
  corners = tiles.filter(tile => countConnections(tile) == 2)
  
  let ids = corners.map(t => t.id)
  return ids.reduce((acc, id) => id * acc, 1)
}

export const day20part2 = () => {
  let start = corners[0]
  while (start.sides[LEFT].match.id || start.sides[TOP].match.id) {
    rotateRight(start)
  }

  let row = [ start ]
  let grid = [ row ]
  let lastRow = row
  let nextRow = null

  while (nextRow = startNextRow(lastRow)) {
    grid.push(nextRow)
    lastRow = nextRow
  }

  grid.forEach(row => assembleRow(row))

  let picture = assemblePicture(grid)

  picture = findOrientation(picture)

  let serpents = lookForSerpents(picture)
  removeSerpents(picture, serpents)

  let count = 0
  for (let y = 0; y < picture.length; ++y) {
    for (let x = 0; x < picture[0].length; ++x) {
      if (picture[y][x] == '#')
        count++
    }
  }

  return count
}
