import { Camera, Vector3 } from '@babylonjs/core';
export declare const computeVertigo: (camera: Camera, focusPosition: Vector3, perspective: number, height: number, aspect: number, { useRightHandedSystem, rangeMin, rangeMax, nearMin, farMax }?: {
    useRightHandedSystem?: boolean;
    rangeMin?: number;
    rangeMax?: number;
    nearMin?: number;
    farMax?: number;
}) => void;
