import { UIResult, UIValueArg } from '../types';
declare type Step = number | 'any';
declare type Props = Partial<{
    min: number;
    max: number;
    step: Step;
    decimals: number;
}>;
declare type PropsArg = Props | [number, number, Step?, number?];
export declare const range: (name: string, valueArg: UIValueArg<number>, props?: PropsArg) => UIResult<number>;
export {};
