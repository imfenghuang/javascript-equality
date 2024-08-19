import { typeList, values, valuesX, valuesY } from './const'
import type { TypeItem } from './const'

const len = values.length + 1

export const getStr = (val: any) => {
  if (Array.isArray(val)) {
    return JSON.stringify(val)
  } else if (typeof val === 'string') {
    return `${JSON.stringify(val)}`
  } else if (val === null) {
    return 'null'
  } else if (val === undefined) {
    return 'undefined'
  } else if (typeof val === 'object') {
    return '{}'
  } else {
    return val.toString()
  }
}

export const getCompareStr = (str: string) => {
  if (str === '{}') {
    return '({})'
  }
  return str
}

type CompareFn = (a: any, b: any) => '-' | ''

export const compare = (i: number, j: number, compareFn: CompareFn) => {
  const a = getCompareStr(getStr(values[i]))
  const b = getCompareStr(getStr(values[j]))
  return compareFn(a, b)
}
export const equalCompare = (a: any, b: any) => {
  return eval(a) == eval(b) ? '-' : ''
}
export const strictEqualCompare = (a: any, b: any) => {
  return eval(a) === eval(b) ? '-' : ''
}

const getIfArr = () => {
  const arr = new Array(3).fill('').map(() => new Array(len - 1).fill(''))
  for (let i = 0, l = arr.length; i < l; i++) {
    for (let j = 0; j < len - 1; j++) {
      if (i === 0) {
        arr[0][j] = getStr(values[j])
      } else if (i === l - 1) {
        arr[i][j] =
          `if (${getStr(values[j])}) { /* ${!!values[j] !== true ? 'not ' : ''}executes */ }`
      } else {
        arr[i][j] = !!values[j]
      }
    }
  }
  return arr
}

const getEqualArr = (type: TypeItem, compareFn: CompareFn) => {
  const arr = new Array(len).fill('').map(() => new Array(len).fill(''))
  for (let i = 0; i < len; i++) {
    for (let j = 0; j < len; j++) {
      if (i === 0 && j === 0) continue
      if (i === 0) {
        arr[i][j] = getStr(values[j - 1])
      } else if (j === 0) {
        arr[i][j] = getStr(values[i - 1])
      } else {
        if (type === typeList[2]) {
          const strictEqual = compare(i - 1, j - 1, strictEqualCompare)
          const looseEqual = compare(i - 1, j - 1, equalCompare)
          arr[i][j] = {
            result: strictEqual,
            looseEqual,
            tip: `${getStr(values[i - 1])} ${strictEqual ? '===' : looseEqual ? '==' : '≠'} ${getStr(values[j - 1])}`,
            text: strictEqual ? '=' : looseEqual ? '≅' : '≠'
          }
        } else {
          const result = compare(i - 1, j - 1, compareFn)
          arr[i][j] = {
            result,
            tip: `${getStr(values[i])} ${type} ${getStr(values[j])} // ${result === '-'}`
          }
        }
      }
    }
  }
  return arr
}

export const getArr = (type: TypeItem, compareFn: CompareFn) => {
  switch (type) {
    case typeList[3]:
      return getIfArr()
    case typeList[0]:
    case typeList[1]:
    case typeList[2]:
      return getEqualArr(type, compareFn)
    case typeList[4]:
      return getCompareArr()
    default:
      return undefined
  }
}

function sameValueZero(x: any, y: any) {
  if (typeof x === 'number' && typeof y === 'number') {
    // x and y are equal (may be -0 and 0) or they are both NaN
    return x === y || (x !== x && y !== y)
  }
  return x === y
}

export const getCompareArr = () => {
  const x = valuesX
  const y = valuesY
  const len = valuesX.length
  const header = ['x', 'y', '==', '===', 'Object.is', 'SameValueZero']
  const headerLen = header.length
  const arr = new Array(headerLen).fill('').map(() => new Array(len).fill(''))
  for (let i = 0; i < headerLen; i++) {
    for (let j = 0; j <= len; j++) {
      if (j === 0) {
        arr[i][0] = header[i]
        continue
      }
      switch (i) {
        case 0:
          arr[i][j] = x[j - 1].desc
          break
        case 1:
          arr[i][j] = y[j - 1].desc
          break
        case 2:
          arr[i][j] = x[j - 1].value == y[j - 1].value
          break
        case 3:
          arr[i][j] = x[j - 1].value === y[j - 1].value
          break
        case 4:
          arr[i][j] = Object.is(x[j - 1].value, y[j - 1].value)
          break
        case 5:
          arr[i][j] = sameValueZero(x[j - 1].value, y[j - 1].value)
          break
        default:
          break
      }
    }
  }
  console.log(arr)
  return arr
}
