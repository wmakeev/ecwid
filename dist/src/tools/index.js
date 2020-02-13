"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_isarray_1 = __importDefault(require("lodash.isarray"));
const lodash_isplainobject_1 = __importDefault(require("lodash.isplainobject"));
function isPojo(val) {
    return lodash_isplainobject_1.default(val) || lodash_isarray_1.default(val) || typeof val === 'string'; // FIXME not precise enough
}
exports.isPojo = isPojo;
//# sourceMappingURL=index.js.map