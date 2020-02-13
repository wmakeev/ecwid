"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_fetch_1 = __importDefault(require("node-fetch"));
const querystring_1 = __importDefault(require("querystring"));
const tools_1 = require("./tools");
class Ecwid {
    constructor(storeId, token, // private options: {}
    options = {
        endpoint: 'app.ecwid.com/api/v3'
    }) {
        this.storeId = storeId;
        this.token = token;
        this.options = options;
    }
    request(path, params = {}, options = {}) {
        const endpoint = this.options.endpoint;
        const urlQuery = {
            token: this.token,
            ...params
        };
        const queryString = querystring_1.default.encode(urlQuery);
        return node_fetch_1.default(`https://${endpoint}/${this.storeId}/${path}?${queryString}`, {
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
                throw new Error(`${res.status} ${res.statusText}`);
            }
            else {
                return res.text().then(text => ({
                    response: res,
                    body: text
                }));
            }
        })
            .then(({ body }) => {
            return (body ? JSON.parse(body) : null);
        });
    }
    GET(path, params = {}) {
        return this.request(path, params, {
            method: 'GET'
        });
    }
    POST(path, body, params = {}) {
        return this.request(path, params, {
            method: 'POST',
            body: tools_1.isPojo(body) ? JSON.stringify(body) : body
        });
    }
    PUT(path, body, params = {}) {
        return this.request(path, params, {
            method: 'PUT',
            body: JSON.stringify(body)
        });
    }
}
exports.default = Ecwid;
//# sourceMappingURL=index.js.map