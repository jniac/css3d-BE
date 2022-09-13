export declare type UIResult<T> = {
    value: T;
    hasChanged: boolean;
};
export declare type UIInput<T> = (name: string, value: T | [T, T], props?: unknown) => UIResult<T>;
