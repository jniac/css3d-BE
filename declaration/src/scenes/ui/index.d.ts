export declare const ui: {
    range: (name: string, valueArg: import("./types").UIValueArg<number>, props?: Partial<{
        min: number;
        max: number;
        step: number | "any";
        decimals: number;
    }> | [number, number, (number | "any")?, number?]) => import("./types").UIResult<number>;
    buttons: <T extends readonly unknown[]>(name: string, valueArg: import("./types").UIValueArg<T[number]>, options: Readonly<T>) => import("./types").UIResult<T[number]>;
    group: (id: string, callback: () => void) => void;
};
