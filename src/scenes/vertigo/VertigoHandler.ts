import { UniversalCamera, Vector3 } from '@babylonjs/core';
import { computeVertigo } from './vertigo'
import { ui } from '../ui'
import { getPointer } from './drag'

enum NeedUpdate {
    None = 0,
    TransformOnly = 1,
    TransformAndProjection = 2,
}

export default class VertigoHandler extends UniversalCamera {

    public perspective = 1;
    public height = 4;
    public focusPosition = new Vector3();
    
    public onInitialize() {  
        Object.assign(window, { camera: this, Vector3 });
    }
    
    private vertigoCache = {
        perspective: this.perspective,
        height: this.height,
        focusPosition: this.focusPosition.clone(),
        rotation: this.rotation.clone(),
    }

    private updateVertigoCache() {
        this.vertigoCache.perspective = this.perspective;
        this.vertigoCache.height = this.height;
        this.vertigoCache.focusPosition.copyFrom(this.focusPosition);
        this.vertigoCache.rotation.copyFrom(this.rotation);
    }

    private getNeedUpdate() {
        const cache = this.vertigoCache
        if (this.height !== cache.height || this.perspective !== cache.perspective) {
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
        computeVertigo(this, this.focusPosition, this.perspective, this.height, aspect, { useRightHandedSystem });
    }

    public onUpdate() {

        ui.group('camera', () => {
            this.perspective = ui.range("perspective", this.perspective, [0, 2]).value;
            this.height = ui.range("height", this.height, [1, 20]).value;
            this.rotation.x = ui.range("rx", this.rotation.x, [-Math.PI / 2, Math.PI / 2]).value;
            this.rotation.y = ui.range("ry", this.rotation.y, [-Math.PI, Math.PI]).value;
        })

        const drag = getPointer('body')
        this.rotation.y += drag.dragDelta.x * .001;
        this.rotation.x += drag.dragDelta.y * .001;

        if (this.getNeedUpdate() !== NeedUpdate.None) {
            this.updateVertigoCache();
            const engine = this.getEngine();
            const aspect = engine.getScreenAspectRatio();
            const { useRightHandedSystem } = this._scene;
            computeVertigo(this, this.focusPosition, this.perspective, this.height, aspect, { useRightHandedSystem });
        }
    }
}
