
function scoreDeck(deck) {
  let score = 0

  for (let i = 0; i < deck.length; i++) {
    score += deck[i] * (deck.length - i)
  }

  return score
}

export const day22part1 = () => {
  let p1 = [ 41,26,29,11,50,38,42,20,13,9,40,43,10,24,35,30,23,15,31,48,27,44,16,12,14 ]
  let p2 = [ 18,6,32,37,25,21,33,28,7,8,45,46,49,5,19,2,39,4,17,3,22,1,34,36,47 ]

  while (p1.length > 0 && p2.length > 0) {
    let p1Top = p1.shift()
    let p2Top = p2.shift()

    if (p1Top > p2Top) {
      p1.push(p1Top)
      p1.push(p2Top)
    } else {
      p2.push(p2Top)
      p2.push(p1Top)
    }
  }

  let winner = p1.length > 0 ? p1 : p2
  return scoreDeck(winner)
}

function playGame(deck1, deck2) {
  let stateCache = new Set()

  while (deck1.length > 0 && deck2.length > 0) {
    let cacheKey = `[${deck1.join(',')}][${deck2.join(',')}]`
    if (stateCache.has(cacheKey)) {
      return {
        winner: 'p1',
        deck: deck1
      }
    }
    stateCache.add(cacheKey)

    let d1Top = deck1.shift()
    let d2Top = deck2.shift()

    if (d1Top <= deck1.length && d2Top <= deck2.length) {
      // play recursive round for winner
      let result = playGame(
        deck1.slice(0, d1Top),
        deck2.slice(0, d2Top)
      )
      
      if (result.winner == 'p1') {
        deck1.push(d1Top)
        deck1.push(d2Top)
      } else {
        deck2.push(d2Top)
        deck2.push(d1Top)
      }
    } else {
      // normal compare for winner
      if (d1Top > d2Top) {
        deck1.push(d1Top)
        deck1.push(d2Top)
      } else {
        deck2.push(d2Top)
        deck2.push(d1Top)
      }
    }
  }

  if (deck1.length > 0)
    return {
      winner: 'p1',
      deck: deck1
    }
  else
    return {
      winner: 'p2',
      deck: deck2
    }
}

export const day22part2 = () => {
  let p1 = [ 41,26,29,11,50,38,42,20,13,9,40,43,10,24,35,30,23,15,31,48,27,44,16,12,14 ]
  let p2 = [ 18,6,32,37,25,21,33,28,7,8,45,46,49,5,19,2,39,4,17,3,22,1,34,36,47 ]

  let result = playGame(p1, p2)
  return scoreDeck(result.deck)
}
