import { getBlob } from '../input-helpers'

const toBinary = num => (num >>> 0).toString(2)
const pad = (size, binary) => `${'0'.repeat(size - binary.length)}${binary}`

const applyMask = (value, mask) => {
    let result = []
    for (let i = 0; i < mask.length; i++) {
        result[i] = mask[i] == 'X' ? value[i] : mask[i]
    }
    return result
}

const sumMemory = memory => {
    let sum = 0
    Object.keys(memory).forEach(address => {
        sum += parseInt(memory[address], 2)
    })
    return sum
}

const applyAddressMask = (address, mask) => {
    let adr = []
    for (let i = 0; i < mask.length; i++) {
        adr[i] = mask[i] == '0' ? address[i] : mask[i]
    }

    let all = []
    for (let i = 0; i < adr.length; i++) {
        let ch = adr[i]
        if (ch == 'X') {
            if (all.length == 0) {
                all = [ '1', '0' ]
            } else {
                all = [
                    ...all.map(a => `${a}1`),
                    ...all.map(a => `${a}0`)
                ]
            }
        } else {
            if (all.length == 0) {
                all = [ch]
            } else {
                all = all.map(a => `${a}${ch}`)
            }
        }
    }
    return all
}

const iterateMasks = (cb) => {
    maskSets.forEach(({ mask, instructions }) => {
        instructions.forEach(({ address, value }) => {
            cb(mask, address, value)
        })
    })
}

let maskSets = 
getBlob('14')
    .split(/\nmask = /)
    .map(blob => {
        let [mask, ...instructions] = blob.split('\n')
        return {
            mask: mask.split('').slice(0, -1),
            instructions: instructions.map(ins => {
                let match = ins.match(/.*\[(\d+)\] = (\d+)/)
                return {
                    address: pad(36, toBinary(match[1])).split(''),
                    value: pad(36, toBinary(match[2])).split('')
                }
            })
        }
    })


export const day14part1 = () => {
    let memory = {}
    iterateMasks((mask, address, value) => {
        memory[ address.join('') ] = applyMask(value, mask).join('')
    })
    return sumMemory(memory)
}

export const day14part2 = () => {
    let memory = {}
    iterateMasks((mask, address, value) => {
        applyAddressMask(address, mask).forEach(adr => {
            memory[ adr ] = value.join('')
        })
    })
    return sumMemory(memory)
}
