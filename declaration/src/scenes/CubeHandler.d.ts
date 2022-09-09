import { Color3, Material, Mesh, StandardMaterial } from '@babylonjs/core';
import CameraHandler from './CameraHandler';
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
export default class CubeHandler extends Mesh {
    camera: CameraHandler;
    /**
     * Override constructor.
     * @warn do not fill.
     */
    protected constructor();
    /**
     * Called on the node is being initialized.
     * This function is called immediatly after the constructor has been called.
     */
    onInitialize(): void;
    createEmissiveMaterial(color: Color3): StandardMaterial;
    createSphere(name: string, mat: Material): Mesh;
    spheres: Mesh[];
    onStart(): void;
    onUpdate(): void;
    time: number;
    sphereUpdate(): void;
    animation(): void;
    projectPlane(id: string, { x, y, z, rx, ry, rz, }?: {
        x?: number;
        y?: number;
        z?: number;
        rx?: number;
        ry?: number;
        rz?: number;
    }): void;
}
