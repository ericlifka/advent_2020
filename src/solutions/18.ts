import { parseInteger, splitter, identity, reduceSum } from '../converters'
import { getLines } from '../input-helpers'

let equations = getLines('18')
  .map(splitter(''))
  .map(line => line
                .map(parseSymbol)
                .filter(identity))
  .map(normalizeEquation)

function parseSymbol(symbol) {
  if (symbol == '(' || symbol == ')' || symbol == '*' || symbol == '+')
    return symbol
  else if (symbol == ' ')
    return null
  else
    return parseInteger(symbol)
}

function normalizeEquation(symbols) {
  let stack = [ [] ]
  for (let symbol of symbols) {
    if (symbol == '(') {
      let newEquation = []
      stack[0].push(newEquation)
      stack.unshift(newEquation)
    } else if (symbol == ')') {
      stack.shift()
    }
    else {
      stack[0].push(symbol)
    }
  }
  return stack[0]
}

function solveEquationP1(equation) {
  if (equation.length == 1)
    return equation[0]

  let [ left, symbol, right, ...rest ] = equation

  if (Array.isArray(left))
    left = solveEquationP1(left)

  if (Array.isArray(right))
    right = solveEquationP1(right)

  let num = symbol == '*' 
    ? left * right 
    : left + right

  return solveEquationP1([ num, ...rest ])
}

function solveEquationP2(equation) {
  for (let i = 0; i < equation.length; i++)
    if (Array.isArray(equation[i]))
      equation[i] = solveEquationP2(equation[i])

  let found = true
  while (found) {
    found = false
    for (let i = 0; i < equation.length; i++) {
      if (equation[i] == '+') {
        let left = equation.slice(0, i - 1)
        let right = equation.slice(i + 2)
        equation = [ ...left, equation[i - 1] + equation[i + 1], ...right ]
        found = true
        break
      }
    }
  }
  return solveEquationP1(equation)
}

export const day18part1 = () =>
  equations
    .map(solveEquationP1)
    .reduce(reduceSum)


export const day18part2 = () =>
  equations
    .map(solveEquationP2)
    .reduce(reduceSum)
