import { UniversalCamera, Vector3 } from '@babylonjs/core';
import { computeVertigo } from './vertigo'
import { ui } from '../ui'
import { getPointer } from './drag'

const clamp = (x: number, min = 0, max = 1) => x < min ? min : x > max ? max : x

enum NeedUpdate {
    None = 0,
    TransformOnly = 1,
    TransformAndProjection = 2,
}

export default class VertigoHandler extends UniversalCamera {

    public readonly perspectiveFovScalar = 0.8;

    public height = 4;
    public focusPosition = new Vector3();
    
    public get perspective() { return this.fov / this.perspectiveFovScalar; }
    public set perspective(value: number) {
        this.fov = value * this.perspectiveFovScalar;
    }
    
    public onInitialize() {  
        Object.assign(window, { camera: this, Vector3 });
    }
    
    private vertigoCache = {
        fov: this.fov,
        height: this.height,
        focusPosition: this.focusPosition.clone(),
        rotation: this.rotation.clone(),
    }

    private updateVertigoCache() {
        this.vertigoCache.fov = this.fov;
        this.vertigoCache.height = this.height;
        this.vertigoCache.focusPosition.copyFrom(this.focusPosition);
        this.vertigoCache.rotation.copyFrom(this.rotation);
    }

    private getNeedUpdate() {
        const cache = this.vertigoCache
        if (this.height !== cache.height || this.fov !== cache.fov) {
            return NeedUpdate.TransformAndProjection;
        }
        if (this.focusPosition.equalsWithEpsilon(cache.focusPosition, 1e-6) === false || this.rotation.equalsWithEpsilon(cache.rotation, 1e-6) === false) {
            return NeedUpdate.TransformOnly;
        }
        return NeedUpdate.None;
    }
    
    public onStart() {
        this.freezeProjectionMatrix();
        this.detachControl();
        const engine = this.getEngine();
        const aspect = engine.getScreenAspectRatio();
        const { useRightHandedSystem } = this._scene;
        computeVertigo(this, this.focusPosition, this.height, aspect, { useRightHandedSystem });
    }

    public onUpdate() {

        ui.group('camera', () => {
            this.perspective = ui.range("perspective", this.perspective, [0, 2]).value;
            this.height = ui.range("height", this.height, [1, 20]).value;
            this.rotation.x = ui.range("rx", this.rotation.x, [-Math.PI / 2, Math.PI / 2]).value;
            this.rotation.y = ui.range("ry", this.rotation.y, [-Math.PI, Math.PI]).value;
        })

        const pointer = getPointer('canvas')
        this.rotation.y += pointer.dragDelta.x * .003;
        this.rotation.x += pointer.dragDelta.y * .003;
        this.height = clamp(this.height + pointer.wheelDelta.y * .01, 1, 20)

        if (this.getNeedUpdate() !== NeedUpdate.None) {
            this.updateVertigoCache();
            const engine = this.getEngine();
            const aspect = engine.getScreenAspectRatio();
            const { useRightHandedSystem } = this._scene;
            computeVertigo(this, this.focusPosition, this.height, aspect, { useRightHandedSystem });
        }
    }
}
