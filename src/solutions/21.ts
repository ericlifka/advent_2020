import { splitter } from '../converters'
import { getLines } from '../input-helpers'
import { union, intersection, difference } from '../sets'

const getInput = () =>
  getLines('21')
    .map(splitter(' (contains '))
    .map(([ingredients, allergens]) => ({
      ingredients: ingredients.split(' '),
      allergens: allergens.split(')')[0].split(', ')
    }))

function findOne(allergens) {
  for (let i = 0; i < allergens.length; i++)
    if (allergens[i].ingredients.size == 1)
      return i
}

export const day21part1 = () => {
  let food = getInput()
  let allergenMap = {}
  let allIngredients = new Set()

  food.forEach(({ingredients, allergens}) => {
    ingredients.forEach(i => allIngredients.add(i))

    allergens.forEach(a => {
      if (!allergenMap[ a ]) allergenMap[ a ] = []

      allergenMap[ a ].push(new Set(ingredients))
    })
  })

  let suspectedIngredients = new Set()
  let allergenTargets = []

  for (let allergen in allergenMap) {
    let sharedIngredients = allergenMap[allergen].reduce(intersection)
    sharedIngredients.forEach(i => suspectedIngredients.add(i))

    allergenTargets.push({ allergen, ingredients: sharedIngredients })
  }

  let eliminated = difference(allIngredients, suspectedIngredients)

  let count = 0
  food.forEach(({ingredients}) => {
    ingredients.forEach(i => {
      if (eliminated.has(i))
        count++
    })
  })

  console.log('count of eliminated ingredients: ', count)

  let solved = []

  while (allergenTargets.length > 0) {
    let theOne = findOne(allergenTargets)
    let {allergen, ingredients} = allergenTargets[ theOne ]
    let ingredient = ingredients.values().next().value

    allergenTargets = allergenTargets.filter((_, i) => i != theOne)
    
    allergenTargets.forEach(target => {
      target.ingredients.delete(ingredient)
    })

    solved.push({ allergen, ingredient })
  }

  solved.sort((a, b) => a.allergen > b.allergen ? 1 : -1)

  console.log('ingredients: ', solved.map(a => a.ingredient).join(','))
}

export const day21part2 = () => {

}
