import { Camera, Matrix, Vector3 } from '@babylonjs/core'

const perspectiveOneFov = 0.8
const perspectiveEpsilon = 0.01

const vector = new Vector3()
const matrix = new Matrix()

export const computeVertigo = (
    camera: Camera,
    focusPosition: Vector3,
    perspective: number,
    height: number,
    aspect: number,
    {
        useRightHandedSystem = true,
        rangeMin = -100,
        rangeMax = 100,
        nearMin = .01, 
        farMax = 1e5
    } = {},
) => {

    if (perspective > perspectiveEpsilon) {

        // PERSPECTIVE
        const fov = perspectiveOneFov * perspective
        const length = height / 2 / Math.tan(fov / 2)
        vector.set(0, 0, length).applyRotationQuaternionInPlace(camera.absoluteRotation)
        focusPosition.subtractToRef(vector, vector)
        const fn = useRightHandedSystem ? Matrix.PerspectiveFovRHToRef : Matrix.PerspectiveFovLHToRef
        const near = Math.max(nearMin, length + rangeMin); 
        const far = Math.min(farMax, length + rangeMax); 
        fn(fov, aspect, near, far, matrix)

        // update the camera
        camera.fov = fov
        camera.mode = Camera.PERSPECTIVE_CAMERA
        camera._projectionMatrix.copyFrom(matrix)
        camera._position.copyFrom(vector)
        camera.position.copyFrom(vector)

    } else {

        // ORTHOGRAPHIC
        const h2 = height / 2
        const w2 = h2 * aspect
        const length = -rangeMin
        vector.set(0, 0, length).applyRotationQuaternionInPlace(camera.absoluteRotation)
        focusPosition.subtractToRef(vector, vector)
        const fn = useRightHandedSystem ? Matrix.OrthoOffCenterRHToRef : Matrix.OrthoOffCenterLHToRef
        fn(-w2, w2, -h2, h2, nearMin, length + farMax, matrix)

        // update the camera
        camera.fov = 0
        camera.mode = Camera.ORTHOGRAPHIC_CAMERA
        camera._projectionMatrix.copyFrom(matrix)
        camera._position.copyFrom(vector)
        camera.position.copyFrom(vector)

    }
}
