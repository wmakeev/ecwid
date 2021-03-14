/// <reference types="node" />
import { RequestInit } from 'node-fetch';
import { ParsedUrlQueryInput } from 'querystring';
import { Pojo } from './tools';
export * from './types';
export interface EcwidOptions {
    endpoint: string;
}
export declare class Ecwid {
    private storeId;
    private token;
    private options;
    constructor(storeId: string, token: string, // private options: {}
    options?: EcwidOptions);
    request<T>(path: string, params?: ParsedUrlQueryInput, options?: RequestInit): Promise<T>;
    GET<T>(path: string, params?: ParsedUrlQueryInput): Promise<T>;
    POST<T>(path: string, body: Pojo | unknown, params?: ParsedUrlQueryInput): Promise<T>;
    PUT<T>(path: string, body: Pojo, params?: ParsedUrlQueryInput): Promise<T>;
}
//# sourceMappingURL=index.d.ts.map