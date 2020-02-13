import fetch, { RequestInit } from 'node-fetch'
import qs, { ParsedUrlQueryInput } from 'querystring'
import { isPojo, Pojo } from './tools'

export * from './types'

export interface EcwidOptions {
  endpoint: string
}

export default class Ecwid {
  constructor(
    private storeId: string,
    private token: string, // private options: {}
    private options: EcwidOptions = {
      endpoint: 'app.ecwid.com/api/v3'
    }
  ) {}

  request<T>(
    path: string,
    params: ParsedUrlQueryInput = {},
    options: RequestInit = {}
  ) {
    const endpoint = this.options.endpoint
    const urlQuery: ParsedUrlQueryInput = {
      token: this.token,
      ...params
    }

    const queryString = qs.encode(urlQuery)

    return fetch(`https://${endpoint}/${this.storeId}/${path}?${queryString}`, {
      method: 'GET',
      ...options,
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        'Accept-Encoding': 'gzip',
        ...options.headers
      }
    })
      .then(res => {
        if (res.status < 200 || res.status > 299) {
          throw new Error(`${res.status} ${res.statusText}`)
        } else {
          return res.text().then(text => ({
            response: res,
            body: text
          }))
        }
      })
      .then(({ body }) => {
        return (body ? JSON.parse(body) : null) as T
      })
  }

  GET<T>(path: string, params: ParsedUrlQueryInput = {}) {
    return this.request<T>(path, params, {
      method: 'GET'
    })
  }

  POST<T>(
    path: string,
    body: Pojo | unknown,
    params: ParsedUrlQueryInput = {}
  ) {
    return this.request<T>(path, params, {
      method: 'POST',
      body: isPojo(body) ? JSON.stringify(body) : (body as any)
    })
  }

  PUT<T>(path: string, body: Pojo, params: ParsedUrlQueryInput = {}) {
    return this.request<T>(path, params, {
      method: 'PUT',
      body: JSON.stringify(body)
    })
  }
}
