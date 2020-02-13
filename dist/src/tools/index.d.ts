export declare type PojoValue = string | number | boolean | null | undefined;
export declare type PojoArray = Array<PojoValue | PojoObject | PojoArray>;
export interface PojoObject {
    [key: string]: Pojo;
}
export declare type Pojo = PojoValue | PojoObject | PojoArray;
export declare function isPojo(val: any): val is Pojo;
//# sourceMappingURL=index.d.ts.map