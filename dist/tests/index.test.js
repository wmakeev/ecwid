"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const blue_tape_1 = __importDefault(require("blue-tape"));
const src_1 = __importDefault(require("../src"));
const { ECWID_STORE_ID, ECWID_TOKEN_SECRET, ECWID_TEST_PRODUCT_ID } = process.env;
const PRODUCT_ID = Number(ECWID_TEST_PRODUCT_ID);
blue_tape_1.default('Ecwid#GET (product)', async (t) => {
    var _a;
    const ecwid = new src_1.default(ECWID_STORE_ID, ECWID_TOKEN_SECRET);
    const product = await ecwid.GET(`products/${PRODUCT_ID}`);
    t.equal((_a = product) === null || _a === void 0 ? void 0 : _a.id, PRODUCT_ID, 'should fetch product');
});
blue_tape_1.default('Ecwid#POST (image)', async (t) => {
    var _a;
    const ecwid = new src_1.default(ECWID_STORE_ID, ECWID_TOKEN_SECRET);
    const imgReadStream = fs_1.default.createReadStream(path_1.default.resolve(process.cwd(), 'res/gift.jpg'));
    const result = await ecwid.POST(`products/${PRODUCT_ID}/image`, imgReadStream);
    t.equal(typeof ((_a = result) === null || _a === void 0 ? void 0 : _a.id), 'number', 'should return number id of uploaded image');
});
blue_tape_1.default('Ecwid Error', t => {
    t.plan(1);
    const ecwid = new src_1.default(ECWID_STORE_ID, ECWID_TOKEN_SECRET);
    ecwid.GET('product/160000000').catch(err => {
        t.equal(err.message, '404 File not found', 'should return error');
    });
});
//# sourceMappingURL=index.test.js.map