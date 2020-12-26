
let publicKeys = { card: 9232416, door: 14144084 }

function getLoopSize(subject, target) {
  let count = 0
  let value = 1

  while (true) {
    value = value * subject
    value = value % 20201227
    count++
    if (value == target) {
      return count
    }
  }
}

function transform(subject, loopSize) {
  let value = 1

  for(let i = 0; i < loopSize; i++) {
    value = (value * subject) % 20201227
  }

  return value
}

export const day25part1 = () => {
  let cardLoopSize = getLoopSize(7, publicKeys.card)
  let doorLoopSize = getLoopSize(7, publicKeys.door)

  let privateKey = transform(publicKeys.door, cardLoopSize)
  let otherPrivateKey = transform(publicKeys.card, doorLoopSize)

  return [privateKey, otherPrivateKey]
}

export const day25part2 = () => {
  return null
}
