export type TypeTuple = ['==', '===', 'unified', 'if', 'compare']
export type TypeItem = TypeTuple[number]
export const typeList: TypeTuple = ['==', '===', 'unified', 'if', 'compare']
export const typeObj = {
  '==': '==',
  '===': '===',
  unified: 'Unified',
  if: 'if()',
  compare: 'Compare'
}

export const values = [
  true,
  false,
  1,
  0,
  -1,
  'true',
  'false',
  '1',
  '0',
  '-1',
  '',
  null,
  undefined,
  Infinity,
  -Infinity,
  [],
  {},
  [[]],
  [0],
  [1],
  NaN
]

export const valuesLength = values.length

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Equality_comparisons_and_sameness
export const valuesX = [
  {
    value: undefined,
    desc: 'undefined'
  },
  {
    value: null,
    desc: 'null'
  },
  {
    value: true,
    desc: 'true'
  },
  {
    value: false,
    desc: 'false'
  },
  {
    value: 'foo',
    desc: `'foo'`
  },
  {
    value: 0,
    desc: 0
  },
  {
    value: +0,
    desc: '+0'
  },
  {
    value: +0,
    desc: '+0'
  },
  {
    value: -0,
    desc: '-0'
  },
  {
    value: 0n,
    desc: '0n'
  },
  {
    value: 0,
    desc: 0
  },
  {
    value: '',
    desc: `""`
  },
  {
    value: '0',
    desc: `'0'`
  },
  {
    value: '8',
    desc: `'8'`
  },
  {
    value: [1, 2],
    desc: `[1,2]`
  },
  {
    value: new String('foo'),
    desc: `new String('foo')`
  },
  {
    value: null,
    desc: 'null'
  },
  {
    value: null,
    desc: 'null'
  },
  {
    value: undefined,
    desc: 'undefined'
  },
  {
    value: { foo: 'bar' },
    desc: "{ foo: 'bar' }"
  },
  {
    value: new String('foo'),
    desc: `new String('foo')`
  },
  {
    value: 0,
    desc: 0
  },
  {
    value: 0,
    desc: 0
  },
  {
    value: 0,
    desc: 0
  },
  {
    value: 'foo',
    desc: `'foo'`
  },
  {
    value: NaN,
    desc: 'NaN'
  }
]
export const valuesY = [
  {
    value: undefined,
    desc: 'undefined'
  },
  {
    value: null,
    desc: 'null'
  },
  {
    value: true,
    desc: 'true'
  },
  {
    value: false,
    desc: 'false'
  },
  {
    value: 'foo',
    desc: `'foo'`
  },
  {
    value: 0,
    desc: 0
  },
  {
    value: -0,
    desc: '-0'
  },
  {
    value: 0,
    desc: 0
  },
  {
    value: 0,
    desc: 0
  },
  {
    value: -0n,
    desc: '-0n'
  },
  {
    value: false,
    desc: 'false'
  },
  {
    value: false,
    desc: 'false'
  },
  {
    value: 0,
    desc: 0
  },
  {
    value: 8,
    desc: 8
  },
  {
    value: '1,2',
    desc: `'1,2'`
  },
  {
    value: 'foo',
    desc: `'foo'`
  },
  {
    value: undefined,
    desc: 'undefined'
  },
  {
    value: false,
    desc: 'false'
  },
  {
    value: false,
    desc: 'false'
  },
  {
    value: { foo: 'bar' },
    desc: "{ foo: 'bar' }"
  },
  {
    value: new String('foo'),
    desc: `new String('foo')`
  },
  {
    value: null,
    desc: 'null'
  },
  {
    value: undefined,
    desc: 'undefined'
  },
  {
    value: NaN,
    desc: 'NaN'
  },
  {
    value: NaN,
    desc: 'NaN'
  },
  {
    value: NaN,
    desc: 'NaN'
  }
]
