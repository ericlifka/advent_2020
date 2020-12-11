
export const doTimes = (n, cb) => [...Array(n)].forEach((_, i) => cb(i + 1))
