import { getLines } from '../input-helpers'
import {parseInteger} from '../converters'
import {ascending} from '../converters'

let [targetstr, idstr] = getLines('13')

let target = parseInteger(targetstr)
let ids = idstr
    .split(',')
    .filter(n => n!=='x')
    .map(parseInteger)

export const day13part1 = () => {
    let waits = []
    ids.forEach(id => {
        let period = target / id
        let wait = Math.ceil(period) * id - target
        waits.push({wait, id, score: wait * id})
    })

    waits.sort((l, r) => l.wait - r.wait)
    console.log( waits)
    return waits[0].score
}

export const day13part2 = () => {
    let ids = idstr.split(',').map((id, i) => {
        if (id == 'x') {
            return null
        } else {
            return { id: parseInteger(id), offset: i }
        }
    }).filter(n => !!n)

    console.log(JSON.stringify(ids))
    let t = 100000000000675
    while (true) {
        if (t % 23 == 0 &&
            (t + 13) % 41 == 0 &&
            (t + 23) % 829 == 0 &&
            (t + 36) % 13 == 0 &&
            (t + 37 % 17) == 0 &&
            (t + 52) % 29 == 0 &&
            (t + 54) % 677 == 0 &&
            (t + 60) % 37 == 0 &&
            (t + 73) % 19 == 0) {
                console.log(t)
                return t
            }
        
        t += 829
        if (t % 1000000000 === 0) {
            console.log(t)
        }
    }
}

/*
0 23
28 41
806 829
3 13
14 17
6 29
623 677
14 37
3 19
*/