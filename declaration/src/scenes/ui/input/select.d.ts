import { UIResult, UIValueArg } from '../types';
export declare const create: <T extends readonly unknown[]>(name: string, valueArg: UIValueArg<T[number]>, options: Readonly<T>) => UIResult<T[number]>;
export declare const select: <T extends readonly unknown[]>(name: string, valueArg: UIValueArg<T[number]>, options: Readonly<T>) => UIResult<T[number]>;
