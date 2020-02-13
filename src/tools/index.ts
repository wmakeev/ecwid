import isArray from 'lodash.isarray'
import isPlainObject from 'lodash.isplainobject'

export type PojoValue = string | number | boolean | null | undefined

export type PojoArray = Array<PojoValue | PojoObject | PojoArray>

export interface PojoObject {
  [key: string]: Pojo
}

export type Pojo = PojoValue | PojoObject | PojoArray

export function isPojo(val: any): val is Pojo {
  return isPlainObject(val) || isArray(val) || typeof val === 'string' // FIXME not precise enough
}
