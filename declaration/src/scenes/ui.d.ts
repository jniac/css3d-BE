declare type UIResult<T> = {
    value: T;
    hasChanged: boolean;
};
export declare const ui: {
    range: (name: string, value: number, props?: Record<string, any>) => UIResult<number>;
    checkbox: (name: string, value: boolean, props?: Record<string, any>) => UIResult<boolean>;
    enumSelect: <T extends readonly string[]>(name: string, options: T, currentOption: T[number]) => UIResult<T[number]>;
    enumButtons: <T_1 extends readonly string[]>(name: string, options: T_1, currentOption: T_1[number]) => UIResult<T_1[number]>;
};
export {};
