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
var computeVertigo_1 = require("./computeVertigo");
var ui_1 = require("./ui");
var UpdateNeedStatus;
(function (UpdateNeedStatus) {
    UpdateNeedStatus[UpdateNeedStatus["None"] = 0] = "None";
    UpdateNeedStatus[UpdateNeedStatus["TransformOnly"] = 1] = "TransformOnly";
    UpdateNeedStatus[UpdateNeedStatus["TransformAndProjection"] = 2] = "TransformAndProjection";
})(UpdateNeedStatus || (UpdateNeedStatus = {}));
var VertigoHandler = /** @class */ (function (_super) {
    __extends(VertigoHandler, _super);
    function VertigoHandler() {
        // private static _count = 0;
        // public readonly instanceId = VertigoHandler._count++;  
        var _this = _super !== null && _super.apply(this, arguments) || this;
        // private __transformMatrix = Matrix.Identity();
        // private __projectionMatrix = Matrix.Identity();
        // private _perspective = defaultVertigoProps.perspective;
        // private _height = defaultVertigoProps.height;
        // private _focusPosition = new Vector3();
        // private _rotation = new Vector3();
        // private _rotationQuaternion = Quaternion.Identity();
        _this.perspective = 1;
        _this.height = 4;
        _this.focusPosition = new core_1.Vector3();
        _this.lols = [1, 2, 3];
        _this.lol = 1;
        return _this;
        // public updateVertigo() {
        //     const engine = this.getEngine();
        //     const aspect = engine.getScreenAspectRatio();
        //     computeVertigoMatrices(
        //         this.__transformMatrix,
        //         this.__projectionMatrix, 
        //         this._focusPosition, 
        //         this._rotationQuaternion, 
        //         this._perspective, 
        //         this._height, 
        //         aspect);
        //     // Matrix
        //     // Indices:
        //     // 00 | 04 | 08 | 12
        //     // 01 | 05 | 09 | 13
        //     // 02 | 06 | 10 | 14
        //     // 03 | 07 | 11 | 15
        //     // Right (r), Up (u), Forward (f), Translation (t)
        //     // rx | ux | fx | tx
        //     // ry | uy | fy | ty
        //     // rz | uz | fz | tz
        //     // 00 | 00 | 00 | 01
        //     this.getWorldMatrix().copyFrom(this.__transformMatrix);
        //     this.position.set(this.__transformMatrix.m[12], this.__transformMatrix.m[13], this.__transformMatrix.m[14]);
        // }
        // public getUpdateNeedStatus(): UpdateNeedStatus {
        //     if ((
        //         this._perspective !== this.perspective
        //         || this._height !== this.height
        //     )) {
        //         return UpdateNeedStatus.TransformAndProjection;
        //     }
        //     if ((
        //         this._focusPosition.equalsWithEpsilon(this.focusPosition) === false
        //         || this._rotation.equalsWithEpsilon(this.rotation) === false
        //     )) {
        //         return UpdateNeedStatus.TransformOnly;
        //     }
        //     return UpdateNeedStatus.None;
        // }
        // public updateProps() {
        //     this._perspective = this.perspective;
        //     this._height = this.height;
        //     this._focusPosition.copyFrom(this.focusPosition);
        //     this._rotation.copyFrom(this.rotation);
        //     Quaternion.FromEulerAnglesToRef(this._rotation.x, this.rotation.y, this.rotation.z, this._rotationQuaternion);
        //     this.fov = perspectiveOneAngle * this.perspective;
        // }
        // public update() {
        //     const updateNeedStatus = this.getUpdateNeedStatus();
        //     if (updateNeedStatus !== UpdateNeedStatus.None) {
        //         this.updateProps();
        //         this.updateVertigo();
        //     }
        // }
    }
    // public rotation = new Vector3();
    // // public get fov() { return perspectiveOneAngle * this.perspective }
    // // public set fov(value: number) {
    // //     this.perspective = value / perspectiveOneAngle;
    // // } 
    VertigoHandler.prototype.onInitialize = function () {
        Object.assign(window, { camera: this, Vector3: core_1.Vector3 });
        this.freezeProjectionMatrix();
    };
    VertigoHandler.prototype.update = function () {
        this.lol = ui_1.ui.buttons('lol', this.lol, this.lols).value;
        console.log(this.lol);
        var engine = this.getEngine();
        var aspect = engine.getScreenAspectRatio();
        this.perspective = ui_1.ui.range("perspective", this.perspective, [0, 2]).value;
        this.height = ui_1.ui.range("height", this.height, [1, 20]).value;
        // this.rotation.x = ui.range("rx", 0, [-90, 90]).value * Math.PI / 180;
        // this.rotation.y = ui.range("ry", 0, [-180, 180]).value * Math.PI / 180;
        (0, computeVertigo_1.computeVertigo)(this, this.focusPosition, this.perspective, this.height, aspect, this._scene.useRightHandedSystem);
    };
    return VertigoHandler;
}(core_1.UniversalCamera));
exports.default = VertigoHandler;
//# sourceMappingURL=VertigoHandler.js.map