import fs from 'fs'
import path from 'path'
import test from 'blue-tape'

import { isPojo } from '../../src/tools'

test('isPojo', t => {
  t.equal(isPojo({}), true)

  t.equal(
    isPojo({
      a: 1,
      b: 'foo',
      c: false,
      d: [1, 'bar', true, null, undefined],
      e: null,
      f: undefined
    }),
    true
  )

  t.equal(
    isPojo({
      a: 1,
      b: 'foo',
      c: false,
      x: new Date(),
      d: [1, 'bar', true, null, undefined],
      e: null,
      f: undefined
    }),
    true
  )

  t.equal(isPojo('str'), true)

  const imgReadStream = fs.createReadStream(
    path.resolve(process.cwd(), 'res/gift.jpg')
  )

  t.equal(isPojo(imgReadStream), false)

  t.end()
})
