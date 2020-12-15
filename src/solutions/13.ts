import { getLines } from '../input-helpers'
import { parseInteger } from '../converters'

let [targetstr, idstr] = getLines('13')

export const day13part1 = (target = parseInteger(targetstr)) =>
  idstr
    .split(',')
    .filter(n => n !== 'x')
    .map(parseInteger)
    .map(id => {
      let period = target / id
      let wait = Math.ceil(period) * id - target

      return { wait, id, score: wait * id }
    })
    .sort((l, r) => l.wait - r.wait)
    [ 0 ].score

const findRemainder = (
  period, 
  offset,
  rem = (period - offset) % period
) => rem < 0
    ? rem + period
    : rem

function findCommon(pairs) {
  let [ [rem1, prime1], [rem2, prime2] ] = pairs.sort( (l, r) => r[1] - l[1] )
  let n = rem1
  while (n += prime1)
    if (n % prime1 == rem1 && n % prime2 == rem2)
      return [ n, prime1 * prime2 ]
}

export const day13part2 = () =>
  idstr
    .split(',')
    .map((id, i) =>
      id == 'x'
        ? null
        : [ i, parseInteger(id) ])
    .filter(n => n)
    .map(([ offset, period ]) => [ findRemainder(period, offset), period ])
    .reduce((pair1, pair2) => findCommon([ pair1, pair2 ]))[ 0 ]
