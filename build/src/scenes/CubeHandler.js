"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@babylonjs/core");
var CameraHandler_1 = require("./CameraHandler");
var decorators_1 = require("./decorators");
var ui_1 = require("./ui");
var utils_1 = require("./utils");
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
var CubeHandler = /** @class */ (function (_super) {
    __extends(CubeHandler, _super);
    function CubeHandler() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.spheres = [];
        _this.time = 0;
        return _this;
    }
    /**
     * Called on the node is being initialized.
     * This function is called immediatly after the constructor has been called.
     */
    CubeHandler.prototype.onInitialize = function () {
        // ...
    };
    CubeHandler.prototype.createEmissiveMaterial = function (color) {
        var mat = new core_1.StandardMaterial('red', this._scene);
        mat.diffuseColor = color;
        mat.emissiveColor = color.clone().scale(.66);
        return mat;
    };
    CubeHandler.prototype.createSphere = function (name, mat) {
        var sphere = core_1.MeshBuilder.CreateSphere(name, {}, this._scene);
        sphere.material = mat;
        return sphere;
    };
    CubeHandler.prototype.onStart = function () {
        var red = this.createEmissiveMaterial(new core_1.Color3(1, 0, 0));
        var green = this.createEmissiveMaterial(new core_1.Color3(0, 1, 0));
        var blue = this.createEmissiveMaterial(new core_1.Color3(.2, .2, 1));
        var sphereX = this.createSphere('sphereX', red);
        var sphereY = this.createSphere('sphereY', green);
        var sphereZ = this.createSphere('sphereZ', blue);
        this.spheres = [sphereX, sphereY, sphereZ];
    };
    CubeHandler.prototype.onUpdate = function () {
        // CameraHandler.cameraPositionUpdate(this.camera);
        var animationType = this.animation();
        if (animationType === 'suspended') {
            return;
        }
        CameraHandler_1.default.updateCameraCSS(this.camera);
        this.sphereUpdate();
        var offset = ui_1.ui.range('offset', { initialValue: .5 }, { min: 0, max: 1 }).value;
        this.projectPlane('#plane-1', { z: offset, ry: 0 });
        this.projectPlane('#plane-2', { x: offset, ry: Math.PI / 2 });
    };
    CubeHandler.prototype.sphereUpdate = function () {
        var _a = __read(this.spheres, 3), sphereX = _a[0], sphereY = _a[1], sphereZ = _a[2];
        var mx = core_1.Matrix.Compose(new core_1.Vector3().setAll(.2), new core_1.Vector3(0, 0, 0).toQuaternion(), new core_1.Vector3(.5, 0, 0));
        var my = core_1.Matrix.Compose(new core_1.Vector3().setAll(.2), new core_1.Vector3(0, 0, 0).toQuaternion(), new core_1.Vector3(0, .5, 0));
        var mz = core_1.Matrix.Compose(new core_1.Vector3().setAll(.2), new core_1.Vector3(0, 0, 0).toQuaternion(), new core_1.Vector3(0, 0, .5));
        this.computeWorldMatrix(true);
        mx.multiplyToRef(this.getWorldMatrix(), sphereX.getWorldMatrix());
        my.multiplyToRef(this.getWorldMatrix(), sphereY.getWorldMatrix());
        mz.multiplyToRef(this.getWorldMatrix(), sphereZ.getWorldMatrix());
    };
    CubeHandler.prototype.animation = function () {
        var _this = this;
        var centerRotationDamping = function (x, y, z) {
            var damping = 1 / 20;
            _this.time += (utils_1.utils.round(_this.time, Math.PI) - _this.time) * damping;
            _this.rotation.x += (x * Math.PI - _this.rotation.x) * damping;
            _this.rotation.y += (y * Math.PI - _this.rotation.y) * damping;
            _this.rotation.z += (z * Math.PI - _this.rotation.z) * damping;
        };
        var timeScale = ui_1.ui.range('timeScale', { initialValue: 1 }, { min: 0, max: 10 }).value;
        var options = ['suspended', 'rotating', 'fixed', 'identity', 'x:180', 'y:180', 'z:180', 'y:90'];
        var animationType = ui_1.ui.buttons('animation', { initialValue: 'rotating' }, options).value;
        switch (animationType) {
            case 'rotating': {
                var speed = .5;
                this.time += 1 / 60 * timeScale * speed;
                this.rotation.x = utils_1.utils.centerModulo(this.rotation.x + timeScale * .01 * speed, 2 * Math.PI);
                this.rotation.y = utils_1.utils.centerModulo(this.rotation.y + timeScale * .02 * speed, 2 * Math.PI);
                this.rotation.z = utils_1.utils.centerModulo(this.rotation.z + timeScale * .03 * speed, 2 * Math.PI);
                break;
            }
            case 'identity': {
                centerRotationDamping(0, 0, 0);
                break;
            }
            case 'y:180': {
                centerRotationDamping(0, 1, 0);
                break;
            }
            case 'x:180': {
                centerRotationDamping(1, 0, 0);
                break;
            }
            case 'z:180': {
                centerRotationDamping(0, 0, 1);
                break;
            }
            case 'y:90': {
                centerRotationDamping(0, .5, 0);
                break;
            }
        }
        this.position.x = Math.sin(this.time);
        this.position.y = Math.sin(this.time);
        this.position.z = Math.sin(this.time + Math.PI / 2);
        return animationType;
    };
    CubeHandler.prototype.projectPlane = function (id, _a) {
        var _b = _a === void 0 ? {} : _a, _c = _b.x, x = _c === void 0 ? 0 : _c, _d = _b.y, y = _d === void 0 ? 0 : _d, _e = _b.z, z = _e === void 0 ? 0 : _e, _f = _b.rx, rx = _f === void 0 ? 0 : _f, _g = _b.ry, ry = _g === void 0 ? 0 : _g, _h = _b.rz, rz = _h === void 0 ? 0 : _h;
        var canvas = document.querySelector('canvas#renderCanvas');
        var plane = document.querySelector("#hud ".concat(id));
        var cameraHeight2 = this.camera.mode === core_1.Camera.PERSPECTIVE_CAMERA
            ? 1 / Math.tan(this.camera.fov / 2)
            : 1 / this.camera._projectionMatrix.m[5];
        var uiScale = ui_1.ui.range('scale', { initialValue: 1 }, { min: 0, max: 3 }).value;
        var scale = new core_1.Vector3().setAll(uiScale);
        var rotation = new core_1.Vector3(rx, ry, rz).toQuaternion();
        var position = new core_1.Vector3(x, y, z);
        this.computeWorldMatrix(true);
        var targetMatrix = core_1.Matrix.Compose(scale, rotation, position).multiply(this.getWorldMatrix());
        var cameraMatrix = this.camera.getWorldMatrix().clone().invert();
        var matrix = targetMatrix.multiply(cameraMatrix);
        var numbers = utils_1.utils.cloneArray(matrix.m);
        utils_1.utils.incrementTranslation(numbers, 0, 0, -5);
        var pixelScalar = this.camera.mode === core_1.Camera.PERSPECTIVE_CAMERA
            ? cameraHeight2 * canvas.offsetHeight / 2 / 5
            : canvas.offsetHeight / 2 / cameraHeight2;
        utils_1.utils.scaleMatrix(numbers, pixelScalar / 200);
        utils_1.utils.scaleTranslation(numbers, pixelScalar);
        utils_1.utils.scaleRow4(numbers, 1, -1);
        utils_1.utils.scaleRow4(numbers, 2, -1);
        plane.style.transform = "matrix3d(".concat(numbers.join(', '), ")");
        var P = utils_1.utils.getTranslation(matrix.m);
        var F = utils_1.utils.getColVec3(matrix.m, 2);
        var dot = core_1.Vector3.Dot(F, P);
        plane.classList.toggle('backface', dot > 0);
    };
    __decorate([
        (0, decorators_1.fromScene)("camera")
    ], CubeHandler.prototype, "camera", void 0);
    return CubeHandler;
}(core_1.Mesh));
exports.default = CubeHandler;
//# sourceMappingURL=CubeHandler.js.map