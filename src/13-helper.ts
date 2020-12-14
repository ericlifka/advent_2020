let t1 = 829
let o1 = 23

let t2 = 677
let o2 = 54

let t = t1 - o1
let a;
let c = 0
let last = 0
while (true) {
    if ((t + o2) % t2 == 0) {
        // console.log(t)
        a = t
        console.log(a - last)
        a = last
        if (++c > 10) {
            break
        }
        // break
    }
    t += t1
}

if ((a * 2 + o1* 2) % t1 == 0 && (a * 2 + o2*2) % t2 == 0) {
    console.log('winner winner')
}