import { UniversalCamera, Vector3 } from '@babylonjs/core';
export default class VertigoHandler extends UniversalCamera {
    perspective: number;
    height: number;
    focusPosition: Vector3;
    onInitialize(): void;
    update(): void;
}
