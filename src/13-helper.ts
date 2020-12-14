// let t1 = 829
// let o1 = 23

// let t2 = 677
// let o2 = 54

// let t = t1 - o1
// let a;
// let c = 0
// let last = 0
// while (true) {
//     if ((t + o2) % t2 == 0) {
//         // console.log(t)
//         a = t
//         console.log(a - last)
//         a = last
//         if (++c > 10) {
//             break
//         }
//         // break
//     }
//     t += t1
// }

// if ((a * 2 + o1* 2) % t1 == 0 && (a * 2 + o2*2) % t2 == 0) {
//     console.log('winner winner')
// }

function findCommon(pairs) {
    pairs = pairs.sort((l, r) => r[1] - l[1])
    console.log(pairs)
    
    let [[rem1, prime1], [rem2, prime2]] = pairs
    let n = rem1
    while (true) {
        if (n % prime1 == rem1 && n % prime2 == rem2) {
            break
        }
        n += prime1
    }
    return [n, prime1 * prime2]
}

let [rem, period] = findCommon([[0, 23], [28, 41]]);
[rem, period] = findCommon([[rem, period], [806, 829]]);
[rem, period] = findCommon([[rem, period], [3, 13]]);
[rem, period] = findCommon([[rem, period], [14, 17]]);
[rem, period] = findCommon([[rem, period], [6, 29]]);
[rem, period] = findCommon([[rem, period], [623, 677]]);
[rem, period] = findCommon([[rem, period], [14, 37]]);
[rem, period] = findCommon([[rem, period], [3, 19]]);

console.log('start', rem, 'period', period);



[rem, period] = 
[
    [0, 23],
    [28, 41],
    [806, 829],
    [3, 13],
    [14, 17],
    [6, 29],
    [623, 677],
    [14, 37],
    [3, 19],
].reduce((pair1, pair2) => findCommon([pair1, pair2]))
console.log('start', rem, 'period', period)