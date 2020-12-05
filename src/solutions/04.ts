import { getLines } from '../input-helpers'
import { parseInteger } from '../converters'

let passports =
getLines('04')
  .join('\n')
  .split('\n\n')
  .map(pblob => pblob.split(/\s/))
  .map(parr => {
    let passport = {}
    parr.forEach(s => {
      let [key, val] = s.split(':')
      passport[key] = val
    })
    return passport
  })

const isValidSimple = p => p.byr && p.iyr && p.eyr && p.hgt && p.hcl && p.ecl && p.pid

export const day04part1 = () => {
  return passports.reduce((sum: number, p) => isValidSimple(p) ? sum + 1 : sum, 0)
}

const valid_byr = (byr, year = parseInteger(byr)) => year >= 1920 && year <= 2002
const valid_iyr = (iyr, year = parseInteger(iyr)) => year >= 2010 && year <= 2020
const valid_eyr = (eyr, year = parseInteger(eyr)) => year >= 2020 && year <= 2030

const valid_hgt =
( hgt
, unit = hgt.slice(-2)
, val = parseInteger(hgt.slice(0, -2))
) => unit === 'cm'
      ? val >= 150 && val <= 193
   : unit === 'in'
      ? val >= 59 && val <= 76
   : false

const valid_hcl = hcl => /^#[0123456789abcdef]{6}$/.test(hcl)
const valid_ecl = ecl => ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'].includes(ecl)
const valid_pid = pid => /^\d{9}$/.test(pid)

const isValid = p =>
  p.byr && valid_byr(p.byr) &&
  p.iyr && valid_iyr(p.iyr) &&
  p.eyr && valid_eyr(p.eyr) &&
  p.hgt && valid_hgt(p.hgt) &&
  p.hcl && valid_hcl(p.hcl) &&
  p.ecl && valid_ecl(p.ecl) &&
  p.pid && valid_pid(p.pid)

export const day04part2 = () => {
  return passports.reduce((sum: number, p) => isValid(p) ? sum + 1 : sum, 0)
}
