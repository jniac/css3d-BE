declare type UIResult<T> = {
    value: T;
    hasChanged: boolean;
};
declare type UIInput<T> = (name: string, value: T | [T, T], props?: unknown) => UIResult<T>;
export declare const ui: Record<string, UIInput<unknown>>;
export {};
