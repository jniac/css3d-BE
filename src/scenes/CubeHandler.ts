import { Camera, Color3, Material, Matrix, Mesh, MeshBuilder, StandardMaterial, Vector3 } from '@babylonjs/core'
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
        const animationType = this.animation()

        if (animationType === 'suspended') {
            return
        }

        CameraHandler.updateCameraCSS(this.camera);
        this.sphereUpdate()

        const { value: offset } = ui.range('offset', { initialValue: .5 }, { min: 0, max: 1 })
        this.projectPlane('#plane-1', { z: offset, ry: 0 })
        this.projectPlane('#plane-2', { x: offset, ry: Math.PI / 2 })
    }

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

    time = 0

    animation () {
        const centerRotationDamping = (x: number, y: number, z: number) => {
            const damping = 1 / 20
            this.time += (utils.round(this.time, Math.PI) - this.time) * damping
            this.rotation.x += (x * Math.PI - this.rotation.x) * damping
            this.rotation.y += (y * Math.PI - this.rotation.y) * damping
            this.rotation.z += (z * Math.PI - this.rotation.z) * damping
        }

        const { value: timeScale } = ui.range('timeScale', { initialValue: 1 }, { min: 0, max: 10 })
        const options = ['suspended', 'rotating', 'fixed', 'identity', 'x:180', 'y:180', 'z:180', 'y:90'] as const
        const animationType = ui.buttons('animation', { initialValue: 'rotating' }, options).value
        switch (animationType) {
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

        return animationType
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
        
        const uiScale = ui.range('scale', { initialValue: 1 }, { min: 0, max: 3 }).value
        const scale = new Vector3().setAll(uiScale)
        const rotation = new Vector3(rx, ry, rz).toQuaternion()
        const position = new Vector3(x, y, z)
        
        this.computeWorldMatrix(true)
        const targetMatrix = Matrix.Compose(scale, rotation, position).multiply(this.getWorldMatrix())
        const cameraMatrix = this.camera.getWorldMatrix().clone().invert()
        const matrix = targetMatrix.multiply(cameraMatrix)
        
        const numbers = utils.cloneArray(matrix.m)
        utils.addTranslation(numbers, 0, 0, -5)
        const cameraHeight2 = this.camera.mode === Camera.PERSPECTIVE_CAMERA
            ? 1 / Math.tan(this.camera.fov / 2)
            : this.camera._projectionMatrix.m[5]
        const pixelScalar = this.camera.mode === Camera.PERSPECTIVE_CAMERA 
            ? cameraHeight2 * canvas.offsetHeight / 2 / 5
            : cameraHeight2 * canvas.offsetHeight / 2
        utils.scaleMatrix(numbers, pixelScalar / 200)
        utils.scaleTranslation(numbers, pixelScalar)
        utils.scaleRow4(numbers, 1, -1)
        utils.scaleRow4(numbers, 2, -1)

        plane.style.transform = `matrix3d(${numbers.join(', ')})`

        const P = utils.getTranslation(matrix.m)
        const F = utils.getColVec3(matrix.m, 2)
        const dot = Vector3.Dot(F, P)
        plane.classList.toggle('backface', dot > 0)
    }
}
