"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.computeVertigo = void 0;
var core_1 = require("@babylonjs/core");
var perspectiveOneAngle = 0.8;
var perspectiveEpsilon = 0.001;
var defaultVertigoProps = {
    perspective: 1,
    height: 6,
};
var vectorZ = new core_1.Vector3();
var vectorPosition = new core_1.Vector3();
var computeVertigo = function (camera, focusPosition, perspective, height, aspect, useRightHandedSystem) {
    if (useRightHandedSystem === void 0) { useRightHandedSystem = true; }
    var near = .01, far = 1e6;
    if (perspective > perspectiveEpsilon) {
        // PERSPECTIVE
        var fov = perspectiveOneAngle * perspective;
        var length_1 = height / 2 / Math.tan(fov / 2);
        vectorZ.set(0, 0, length_1).applyRotationQuaternionInPlace(camera.absoluteRotation);
        focusPosition.subtractToRef(vectorZ, vectorPosition);
        var fn = useRightHandedSystem ? core_1.Matrix.PerspectiveFovRHToRef : core_1.Matrix.PerspectiveFovLHToRef;
        // update the camera
        fn(fov, aspect, near, length_1 + far, camera._projectionMatrix);
        camera.fov = fov;
        camera.mode = core_1.Camera.PERSPECTIVE_CAMERA;
        camera._position.copyFrom(vectorPosition);
        camera.position.copyFrom(vectorPosition);
    }
    else {
        // ORTHOGRAPHIC
        var h2 = height / 2;
        var w2 = h2 * aspect;
        var length_2 = height;
        vectorZ.set(0, 0, length_2).applyRotationQuaternionInPlace(camera.absoluteRotation);
        focusPosition.subtractToRef(vectorZ, vectorPosition);
        var fn = useRightHandedSystem ? core_1.Matrix.OrthoOffCenterRHToRef : core_1.Matrix.OrthoOffCenterLHToRef;
        // update the camera
        fn(-w2, w2, -h2, h2, near, length_2 + far, camera._projectionMatrix);
        camera.fov = 0;
        camera.mode = core_1.Camera.ORTHOGRAPHIC_CAMERA;
        camera._position.copyFrom(vectorPosition);
        camera.position.copyFrom(vectorPosition);
    }
};
exports.computeVertigo = computeVertigo;
//# sourceMappingURL=computeVertigo.js.map