export declare type UIValueArg<T> = {
    value: T;
    initialValue?: T;
} | {
    initialValue: T;
} | [T, T] | T;
export declare type UIResult<T> = {
    value: T;
    hasChanged: boolean;
    [key: string]: any;
};
export declare const resolveUIValueArg: <T>(arg: UIValueArg<T>, currentValue?: T) => {
    value: T;
    initialValue: T;
};
