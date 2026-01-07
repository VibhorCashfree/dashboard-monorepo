export interface PaginationQueryObj {
    size: number;
    previousId?: string | number;
    [key: string]: any;
}
export declare const from: (rows: any[], queryObj: PaginationQueryObj, extra?: {}) => {
    data: any;
    hasNext: boolean;
};
export declare const to: (queryObj: PaginationQueryObj) => PaginationQueryObj;
declare const _default: {
    from: (rows: any[], queryObj: PaginationQueryObj, extra?: {}) => {
        data: any;
        hasNext: boolean;
    };
    to: (queryObj: PaginationQueryObj) => PaginationQueryObj;
};
export default _default;
//# sourceMappingURL=listing.d.ts.map