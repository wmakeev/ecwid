import fs from 'fs'
import path from 'path'
import test from 'blue-tape'

import { Ecwid, Product, CreateStatus } from '../src'

const {
  ECWID_STORE_ID,
  ECWID_TOKEN_SECRET,
  ECWID_TEST_PRODUCT_ID
} = process.env

const PRODUCT_ID = Number(ECWID_TEST_PRODUCT_ID)

test('Ecwid#GET (product)', async t => {
  const ecwid = new Ecwid(ECWID_STORE_ID!, ECWID_TOKEN_SECRET!)

  const product = await ecwid.GET<Product>(`products/${PRODUCT_ID}`)

  t.equal(product?.id, PRODUCT_ID, 'should fetch product')
})

test('Ecwid#POST (image)', async t => {
  const ecwid = new Ecwid(ECWID_STORE_ID!, ECWID_TOKEN_SECRET!)

  const imgReadStream = fs.createReadStream(
    path.resolve(process.cwd(), 'res/gift.jpg')
  )

  const result = await ecwid.POST<CreateStatus>(
    `products/${PRODUCT_ID}/image`,
    imgReadStream
  )

  t.equal(
    typeof result?.id,
    'number',
    'should return number id of uploaded image'
  )
})

test('Ecwid Error', t => {
  t.plan(1)

  const ecwid = new Ecwid(ECWID_STORE_ID!, ECWID_TOKEN_SECRET!)

  ecwid.GET<Product>('product/160000000').catch(err => {
    t.equal(err.message, '404 File not found', 'should return error')
  })
})
