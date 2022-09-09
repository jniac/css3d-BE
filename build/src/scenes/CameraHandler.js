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
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@babylonjs/core");
var ui_1 = require("./ui");
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
var CameraHandler = /** @class */ (function (_super) {
    __extends(CameraHandler, _super);
    /**
     * Override constructor.
     * @warn do not fill.
     */
    // @ts-ignore ignoring the super call as we don't want to re-init
    function CameraHandler() {
        var _this = this;
        return _this;
    }
    CameraHandler.prototype.onStart = function () {
        this.position.set(0, 0, -6);
        this.rotation.set(0, 0, 0);
        Object.assign(window, { camera: this });
    };
    CameraHandler.prototype.onUpdate = function () {
    };
    CameraHandler.prototype.updateCameraCSS = function () {
        var camera = this;
        var canvas = document.querySelector('canvas#renderCanvas');
        var hud = document.querySelector('#hud');
        var fov = ui_1.ui.range('fov', 0.8, { min: 0.1, max: 2 }).value;
        camera.fov = fov;
        var cameraHeight2 = 1 / Math.tan(camera.fov / 2);
        var perspective = canvas.offsetHeight * cameraHeight2 / 2;
        hud.style.perspective = "".concat(perspective, "px");
        var views = ['facing', 'top-down'];
        var _a = ui_1.ui.enumButtons('view', views, 'facing'), view = _a.value, hasChanged = _a.hasChanged;
        if (hasChanged) {
            switch (view) {
                case 'facing': {
                    camera.position.set(0, 0, -6);
                    camera.rotation.set(0, 0, 0);
                    break;
                }
                case 'top-down': {
                    camera.position.set(3, 4, -6);
                    camera.rotation.set(.5, -.5, 0);
                    break;
                }
            }
        }
    };
    return CameraHandler;
}(core_1.UniversalCamera));
exports.default = CameraHandler;
//# sourceMappingURL=CameraHandler.js.map