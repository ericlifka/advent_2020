type Cup = {
  id: number;
  next: Cup;
}

function findCup(head: Cup, id: number) {
  if (head.id == id) return head

  let iter = head.next
  while (iter.id != head.id) {
    if (iter.id == id)
      return iter
    else
      iter = iter.next
  }

  return null
}

function findDestination(current: Cup, removed: Cup[]) {
  let targetId = current.id - 1;

  while (true) {
    if (targetId == 0) targetId = 9

    let target = findCup(current, targetId)
    if (target) 
      return target
    else
      targetId--
  }
}

function printCups(head) {
  console.log(head.id)
  let iter = head.next
  while (iter.id != head.id) {
    console.log(iter.id)
    iter = iter.next
  }
}

export const day23part1 = () => {
  let cups = [5,2,3,7,6,4,8,1,9].map(id => ({ id, next: null }))
  let current = cups[0]
  for (let i = 0; i < cups.length - 1; i++) {
    cups[i].next = cups[i+1]
  }
  cups[ cups.length - 1 ].next = cups[0]

  printCups(current)
  
  for (let i = 0; i < 100; i++) {
    let removed = [ current.next, current.next.next, current.next.next.next ]
    current.next = current.next.next.next.next // lol
    let destination = findDestination(current, removed)
    let end = destination.next
    destination.next = removed[0]
    removed[2].next = end

    current = current.next
  }

  console.log(cups)
  printCups(current)

  let start = findCup(current, 1)
  console.log(start)
  let iter = start.next
  let str = ''
  while (iter != start) {
    str = `${str}${iter.id}`
    iter = iter.next
  }

  return str
}

export const day23part2 = () => {
  let cups = [5,2,3,7,6,4,8,1,9].map(id => ({ id, next: null }))
  for (let i = 0; i < cups.length - 1; i++) {
    cups[i].next = cups[i+1]
  }
  let one = cups[7]
  let current = cups[cups.length - 1]
  let id = 10
  while (id <= 1000000) {
    current.next = { id, next: null }
    current = current.next
    id++
  }
  console.log(current)
  current.next = cups[0]
  current = cups[0]
  let byId = new Array(1000000)
  let iter = current
  while (iter.next.id != current.id) {
    byId[iter.id] = iter
    iter = iter.next
  }
  byId[iter.id] = iter

  for (let i = 0; i < 10000000; i++) {
    let removed = [ current.next, current.next.next, current.next.next.next ]
    current.next = current.next.next.next.next // lol

    let target = current.id - 1
    while (true) {
      if (target == 0)
        target = 1000000

      if (target == removed[0].id || target == removed[1].id || target == removed[2].id) {
        target--
      } else {
        break
      }
    }
    let destination = byId[ target ]

    if (!destination) {
      console.log(target, destination)
    }
    
    let end = destination.next
    destination.next = removed[0]
    removed[2].next = end

    current = current.next
  }

  return one.next.id * one.next.next.id
}
