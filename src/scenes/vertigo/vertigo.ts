import { Camera, Matrix, Vector3 } from '@babylonjs/core'

const vector = new Vector3()
const matrix = new Matrix()

type Options = Partial<{
    /** Is it right handed? Babylon is! By default. */
    useRightHandedSystem: boolean
    /** Distance "before" the focus point to be rendered. */
    rangeMin: number 
    /** Distance "behind" the focus point to be rendered. */
    rangeMax: number
    /** "near" min value.  */
    nearMin: number
    /** "far" min value.  */
    farMax: number
    /** Threshold below which the camera is considered as being orthographic. Approximately 1° */
    fovEpsilon: number
}>

export const computeVertigoPerspective = (camera: Camera, canvasHeight: number) => {
    const { fov } = camera
    if (fov > 0) {
        const cameraHeight2 = 1 / Math.tan(camera.fov / 2)
        const perspective = canvasHeight * cameraHeight2 / 2
        return `${perspective}px`
    } else {
        return 'none'
    }
}

export const computeVertigoCamera = (
    camera: Camera,
    focusPosition: Vector3,
    height: number,
    aspect: number,
    {
        useRightHandedSystem = true,
        rangeMin = -100,
        rangeMax = 1000,
        nearMin = .01,
        farMax = 1e5,
        fovEpsilon = .02,
    }: Options = {},
) => {

    if (camera.fov > fovEpsilon) {

        // PERSPECTIVE
        const length = height / 2 / Math.tan(camera.fov / 2)
        vector.set(0, 0, length).applyRotationQuaternionInPlace(camera.absoluteRotation)
        focusPosition.subtractToRef(vector, vector)
        const fn = useRightHandedSystem ? Matrix.PerspectiveFovRHToRef : Matrix.PerspectiveFovLHToRef
        const near = Math.max(nearMin, length + rangeMin);
        const far = Math.min(farMax, length + rangeMax);
        fn(camera.fov, aspect, near, far, matrix)

        // update the camera
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
        const near = Math.max(nearMin, length + rangeMin);
        const far = Math.min(farMax, length + rangeMax);
        fn(-w2, w2, -h2, h2, near, far, matrix)

        // update the camera
        camera.mode = Camera.ORTHOGRAPHIC_CAMERA
        camera._projectionMatrix.copyFrom(matrix)
        camera._position.copyFrom(vector)
        camera.position.copyFrom(vector)

    }
}
