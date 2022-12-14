import { Camera, FreeCamera, UniversalCamera } from '@babylonjs/core'
import { ui } from './ui'
import { computeVertigoPerspective } from './vertigo/vertigo'

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

    public onStart(): void {
        this.position.set(0, 0, -6);
        this.rotation.set(0, 0, 0);

        Object.assign(window, { camera: this });
    }

    public static cameraPositionUpdate(camera: FreeCamera) {
        const views = ['facing', 'top-down'] as const
        const { value: view, hasChanged } = ui.buttons('view', 'facing', views)
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
    
    public static updateCameraCSS(camera: Camera): void {
        const canvas = document.querySelector('canvas#renderCanvas') as HTMLCanvasElement
        const hud = document.querySelector('#hud') as HTMLDivElement
        hud.style.perspective = computeVertigoPerspective(camera, canvas.offsetHeight)
    }
}
