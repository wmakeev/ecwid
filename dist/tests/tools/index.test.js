"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const blue_tape_1 = __importDefault(require("blue-tape"));
const tools_1 = require("../../src/tools");
blue_tape_1.default('isPojo', t => {
    t.equal(tools_1.isPojo({}), true);
    t.equal(tools_1.isPojo({
        a: 1,
        b: 'foo',
        c: false,
        d: [1, 'bar', true, null, undefined],
        e: null,
        f: undefined
    }), true);
    t.equal(tools_1.isPojo({
        a: 1,
        b: 'foo',
        c: false,
        x: new Date(),
        d: [1, 'bar', true, null, undefined],
        e: null,
        f: undefined
    }), true);
    t.equal(tools_1.isPojo('str'), true);
    const imgReadStream = fs_1.default.createReadStream(path_1.default.resolve(process.cwd(), 'res/gift.jpg'));
    t.equal(tools_1.isPojo(imgReadStream), false);
    t.end();
});
//# sourceMappingURL=index.test.js.map