"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.computeVertigo = void 0;
var core_1 = require("@babylonjs/core");
var perspectiveOneFov = 0.8;
var perspectiveEpsilon = 0.01;
var vector = new core_1.Vector3();
var matrix = new core_1.Matrix();
var computeVertigo = function (camera, focusPosition, perspective, height, aspect, _a) {
    var _b = _a === void 0 ? {} : _a, _c = _b.useRightHandedSystem, useRightHandedSystem = _c === void 0 ? true : _c, _d = _b.rangeMin, rangeMin = _d === void 0 ? -100 : _d, _e = _b.rangeMax, rangeMax = _e === void 0 ? 100 : _e, _f = _b.nearMin, nearMin = _f === void 0 ? .01 : _f, _g = _b.farMax, farMax = _g === void 0 ? 1e5 : _g;
    if (perspective > perspectiveEpsilon) {
        // PERSPECTIVE
        var fov = perspectiveOneFov * perspective;
        var length_1 = height / 2 / Math.tan(fov / 2);
        vector.set(0, 0, length_1).applyRotationQuaternionInPlace(camera.absoluteRotation);
        focusPosition.subtractToRef(vector, vector);
        var fn = useRightHandedSystem ? core_1.Matrix.PerspectiveFovRHToRef : core_1.Matrix.PerspectiveFovLHToRef;
        var near = Math.max(nearMin, length_1 + rangeMin);
        var far = Math.min(farMax, length_1 + rangeMax);
        fn(fov, aspect, near, far, matrix);
        // update the camera
        camera.fov = fov;
        camera.mode = core_1.Camera.PERSPECTIVE_CAMERA;
        camera._projectionMatrix.copyFrom(matrix);
        camera._position.copyFrom(vector);
        camera.position.copyFrom(vector);
    }
    else {
        // ORTHOGRAPHIC
        var h2 = height / 2;
        var w2 = h2 * aspect;
        var length_2 = -rangeMin;
        vector.set(0, 0, length_2).applyRotationQuaternionInPlace(camera.absoluteRotation);
        focusPosition.subtractToRef(vector, vector);
        var fn = useRightHandedSystem ? core_1.Matrix.OrthoOffCenterRHToRef : core_1.Matrix.OrthoOffCenterLHToRef;
        fn(-w2, w2, -h2, h2, nearMin, length_2 + farMax, matrix);
        // update the camera
        camera.fov = 0;
        camera.mode = core_1.Camera.ORTHOGRAPHIC_CAMERA;
        camera._projectionMatrix.copyFrom(matrix);
        camera._position.copyFrom(vector);
        camera.position.copyFrom(vector);
    }
};
exports.computeVertigo = computeVertigo;
//# sourceMappingURL=vertigo.js.map