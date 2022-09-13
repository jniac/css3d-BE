declare type Point = {
    x: number;
    y: number;
};
declare type PointInfo = {
    point: Point;
    time: number;
};
declare type Pointer = {
    isDown: boolean;
    point: Point;
    delta: Point;
    pointOld: Point;
    dragDelta: Point;
    dragTotal: Point;
    down: PointInfo;
    up: PointInfo;
};
export declare const getPointer: (target: HTMLElement | string) => Pointer;
export declare const releasePointer: (target: HTMLElement | string) => void;
export {};
