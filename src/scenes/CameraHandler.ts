import { Matrix, Quaternion, TransformNode, UniversalCamera, Vector3 } from '@babylonjs/core'
import { Node } from "@babylonjs/core/node";
import { ui } from './ui'

/**
 * This represents a script that is attached to a node in the editor.
 * Available nodes are:
 *      - Meshes
 *      - Lights
 *      - Cameas
 *      - Transform nodes
 * 
 * You can extend the desired class according to the node type.
 * Example:
 *      export default class MyMesh extends Mesh {
 *          public onUpdate(): void {
 *              this.rotation.y += 0.04;
 *          }
 *      }
 * The function "onInitialize" is called immediately after the constructor is called.
 * The functions "onStart" and "onUpdate" are called automatically.
 */
export default class CameraHandler extends UniversalCamera {
    /**
     * Override constructor.
     * @warn do not fill.
     */
    // @ts-ignore ignoring the super call as we don't want to re-init
    protected constructor() { }

    public onStart(): void {
        this.position.set(0, 0, -6);
        this.rotation.set(0, 0, 0);

        Object.assign(window, { camera: this });
    }

    public onUpdate(): void {
    }
    
    public updateCameraCSS(): void {
        const camera = this
        const canvas = document.querySelector('canvas#renderCanvas') as HTMLCanvasElement
        const hud = document.querySelector('#hud') as HTMLDivElement

        const { value: fov } = ui.range('fov', 0.8, { min: 0.1, max: 2 });
        camera.fov = fov;

        const cameraHeight2 = 1 / Math.tan(camera.fov / 2)
        const perspective = canvas.offsetHeight * cameraHeight2 / 2
        hud.style.perspective = `${perspective}px`

        const views = ['facing', 'top-down'] as const
        const { value: view, hasChanged } = ui.enumButtons('view', views, 'facing')
        if (hasChanged) {
            switch (view) {
                case 'facing': {
                    camera.position.set(0, 0, -6);
                    camera.rotation.set(0, 0, 0);
                    break
                }
                case 'top-down': {
                    camera.position.set(3, 4, -6);
                    camera.rotation.set(.5, -.5, 0);
                    break
                }
            }
        }
    }
}
