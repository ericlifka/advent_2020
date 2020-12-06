export const union = <T>(set1: Set<T>, set2: Set<T>): Set<T> =>
  new Set([ ...set1, ...set2 ])

export const intersection = <T>(set1: Set<T>, set2: Set<T>): Set<T> =>
  new Set( [...set1].filter( i => set2.has(i) ))
