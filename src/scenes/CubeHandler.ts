import { Color3, Material, Matrix, Mesh, MeshBuilder, Quaternion, StandardMaterial, UniversalCamera, Vector3 } from '@babylonjs/core'
import CameraHandler from './CameraHandler'
import { fromScene } from './decorators'
import { ui } from './ui'
import { utils } from './utils'

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
    @fromScene("camera") public camera: CameraHandler;

    /**
     * Override constructor.
     * @warn do not fill.
     */
    // @ts-ignore ignoring the super call as we don't want to re-init
    protected constructor() { }

    /**
     * Called on the node is being initialized.
     * This function is called immediatly after the constructor has been called.
     */
    public onInitialize(): void {
        // ...
    }

    createEmissiveMaterial(color: Color3) {
        const mat = new StandardMaterial('red', this._scene)
        mat.diffuseColor = color
        mat.emissiveColor = color.clone().scale(.66)
        return mat
    }

    createSphere(name: string, mat: Material) {
        const sphere = MeshBuilder.CreateSphere(name, {}, this._scene)
        sphere.material = mat
        return sphere
    }

    spheres = [] as Mesh[]

    public onStart(): void {
        const red = this.createEmissiveMaterial(new Color3(1, 0, 0))
        const green = this.createEmissiveMaterial(new Color3(0, 1, 0))
        const blue = this.createEmissiveMaterial(new Color3(.2, .2, 1))
        const sphereX = this.createSphere('sphereX', red)
        const sphereY = this.createSphere('sphereY', green)
        const sphereZ = this.createSphere('sphereZ', blue)
        this.spheres = [sphereX, sphereY, sphereZ]
    }

    public onUpdate(): void {
        this.camera.updateCameraCSS()
        this.animation()
        this.sphereUpdate()
        // ;(document.querySelector('#plane-1') as HTMLElement).style.display = 'none'
        this.projectPlane('#plane-1', { z: .5, ry: 0 })
        this.projectPlane('#plane-2', { x: .5, ry: Math.PI / 2 })
    }

    time = 0

    sphereUpdate() {
        const [sphereX, sphereY, sphereZ] = this.spheres
        const mx = Matrix.Compose(new Vector3().setAll(.2), new Vector3(0, 0, 0).toQuaternion(), new Vector3(.5, 0, 0))
        const my = Matrix.Compose(new Vector3().setAll(.2), new Vector3(0, 0, 0).toQuaternion(), new Vector3(0, .5, 0))
        const mz = Matrix.Compose(new Vector3().setAll(.2), new Vector3(0, 0, 0).toQuaternion(), new Vector3(0, 0, .5))
        this.computeWorldMatrix(true)
        mx.multiplyToRef(this.getWorldMatrix(), sphereX.getWorldMatrix())
        my.multiplyToRef(this.getWorldMatrix(), sphereY.getWorldMatrix())
        mz.multiplyToRef(this.getWorldMatrix(), sphereZ.getWorldMatrix())
    }

    animation () {
        const centerRotationDamping = (x: number, y: number, z: number) => {
            const damping = 1 / 20
            this.time += (utils.round(this.time, Math.PI) - this.time) * damping
            this.rotation.x += (x * Math.PI - this.rotation.x) * damping
            this.rotation.y += (y * Math.PI - this.rotation.y) * damping
            this.rotation.z += (z * Math.PI - this.rotation.z) * damping
        }

        const { value: timeScale } = ui.range('timeScale', 1, { min: 0, max: 10 })
        const options = ['rotating', 'fixed', 'identity', 'x:180', 'y:180', 'z:180', 'y:90'] as const
        switch (ui.enumButtons('animation', options, 'rotating').value) {
            case 'rotating': {
                const speed = .5
                this.time += 1 / 60 * timeScale * speed
                this.rotation.x = utils.centerModulo(this.rotation.x + timeScale * .01 * speed, 2 * Math.PI)
                this.rotation.y = utils.centerModulo(this.rotation.y + timeScale * .02 * speed, 2 * Math.PI)
                this.rotation.z = utils.centerModulo(this.rotation.z + timeScale * .03 * speed, 2 * Math.PI)
                break
            }
            case 'identity': {
                centerRotationDamping(0, 0, 0)
                break
            }
            case 'y:180': {
                centerRotationDamping(0, 1, 0)
                break
            }
            case 'x:180': {
                centerRotationDamping(1, 0, 0)
                break
            }
            case 'z:180': {
                centerRotationDamping(0, 0, 1)
                break
            }
            case 'y:90': {
                centerRotationDamping(0, .5, 0)
                break
            }
        }

        this.position.x = Math.sin(this.time)
        this.position.y = Math.sin(this.time)
        this.position.z = Math.sin(this.time + Math.PI / 2)
    }

    public projectPlane (id: string, {
        x = 0,
        y = 0,
        z = 0,
        rx = 0,
        ry = 0,
        rz = 0,
    } = {}): void {
        const canvas = document.querySelector('canvas#renderCanvas') as HTMLCanvasElement
        const plane = document.querySelector(`#hud ${id}`) as HTMLDivElement
        const cameraHeight2 = 1 / Math.tan(this.camera.fov / 2)

        const uiScale = ui.range('scale', 1, { min: 0, max: 3 }).value
        const scale = new Vector3().setAll(uiScale)
        const rotation = new Vector3(rx, ry, rz).toQuaternion()
        const position = new Vector3(x, y, z)
        
        this.computeWorldMatrix(true)
        const targetMatrix = Matrix.Compose(scale, rotation, position).multiply(this.getWorldMatrix())
        const cameraMatrix = this.camera.getWorldMatrix().clone().invert()
        const matrix = targetMatrix.multiply(cameraMatrix)

        const numbers = utils.cloneArray(matrix.m)
        utils.incrementTranslation(numbers, 0, 0, -5)
        utils.scaleMatrix(numbers, cameraHeight2 * canvas.offsetHeight / 200 / 10)
        utils.scaleTranslation(numbers, cameraHeight2 * canvas.offsetHeight / 10)
        utils.scaleRow4(numbers, 1, -1)
        utils.scaleRow4(numbers, 2, -1)

        plane.style.transform = `matrix3d(${numbers.join(', ')})`

        const P = utils.getTranslation(matrix.m)
        const F = utils.getColVec3(matrix.m, 2)
        const dot = Vector3.Dot(F, P)
        plane.classList.toggle('backface', dot > 0)
    }
}
