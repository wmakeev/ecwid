import qs, { ParsedUrlQueryInput } from 'querystring'
import { isPojo, Pojo } from './tools'

export * from './types'

type FetchApiRequestOptions = {
  method?: string
  body?: string
  headers?: { [key: string]: string }
}

type FetchAPI = (
  url: string,
  init?: FetchApiRequestOptions
) => Promise<{
  status: number
  statusText: string
  text: () => Promise<string>
}>

export interface EcwidOptions {
  endpoint?: string
  fetch?: FetchAPI
}

const ECWID_API_ENDPOINT = 'app.ecwid.com/api/v3'

export class Ecwid {
  private options: EcwidOptions

  constructor(
    private storeId: string,
    private token: string, // private options: {}
    options?: EcwidOptions
  ) {
    this.options = {
      endpoint: ECWID_API_ENDPOINT,
      ...options
    }
  }

  request<T>(
    path: string,
    params: ParsedUrlQueryInput = {},
    options: FetchApiRequestOptions = {}
  ) {
    const endpoint = this.options.endpoint
    const urlQuery: ParsedUrlQueryInput = {
      token: this.token,
      ...params
    }

    const queryString = qs.encode(urlQuery)

    const fetchApi: FetchAPI | null =
      this.options.fetch ?? (typeof fetch !== 'undefined' ? fetch : null)

    if (!fetchApi) {
      throw new Error('Ecwid: FetchAPI not found')
    }

    return fetchApi(
      `https://${endpoint}/${this.storeId}/${path}?${queryString}`,
      {
        method: 'GET',
        ...options,
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
          'Accept-Encoding': 'gzip',
          ...options.headers
        }
      }
    )
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
