export declare const getQueryString: (obj: Record<string, any>) => string;
export declare const copyToClipboard: (text: string) => void;
export declare const getSizeText: (size: number) => string;
export declare const formatNumber: (num: number) => string | number;
export declare const decodeFile: (str?: string) => string;
export declare const arrayToObject: (arr: any[], idKey: string, valueKey: string) => import("lodash").Dictionary<any>;
export declare const joinWithAnd: (arr: string[]) => string;
export declare const getFileName: (fileName: string, id: string, status: string) => string;
export declare const downloadText: (fileName: string, text: string) => void;
export declare const triggerDownload: (dataObj: {
    type: string;
    payload: string;
}, name?: string) => void;
export declare const showDownload: (status: string) => boolean;
//# sourceMappingURL=common.d.ts.map