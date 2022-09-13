import { UniversalCamera, Vector3 } from '@babylonjs/core';
export default class VertigoHandler extends UniversalCamera {
    perspective: number;
    height: number;
    focusPosition: Vector3;
    onInitialize(): void;
    private vertigoCache;
    private updateVertigoCache;
    private getNeedUpdate;
    onStart(): void;
    onUpdate(): void;
}
