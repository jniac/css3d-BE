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
var vertigo_1 = require("./vertigo");
var ui_1 = require("../ui");
var drag_1 = require("./drag");
var NeedUpdate;
(function (NeedUpdate) {
    NeedUpdate[NeedUpdate["None"] = 0] = "None";
    NeedUpdate[NeedUpdate["TransformOnly"] = 1] = "TransformOnly";
    NeedUpdate[NeedUpdate["TransformAndProjection"] = 2] = "TransformAndProjection";
})(NeedUpdate || (NeedUpdate = {}));
var VertigoHandler = /** @class */ (function (_super) {
    __extends(VertigoHandler, _super);
    function VertigoHandler() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.perspective = 1;
        _this.height = 4;
        _this.focusPosition = new core_1.Vector3();
        _this.vertigoCache = {
            perspective: _this.perspective,
            height: _this.height,
            focusPosition: _this.focusPosition.clone(),
            rotation: _this.rotation.clone(),
        };
        return _this;
    }
    VertigoHandler.prototype.onInitialize = function () {
        Object.assign(window, { camera: this, Vector3: core_1.Vector3 });
    };
    VertigoHandler.prototype.updateVertigoCache = function () {
        this.vertigoCache.perspective = this.perspective;
        this.vertigoCache.height = this.height;
        this.vertigoCache.focusPosition.copyFrom(this.focusPosition);
        this.vertigoCache.rotation.copyFrom(this.rotation);
    };
    VertigoHandler.prototype.getNeedUpdate = function () {
        var cache = this.vertigoCache;
        if (this.height !== cache.height || this.perspective !== cache.perspective) {
            return NeedUpdate.TransformAndProjection;
        }
        if (this.focusPosition.equalsWithEpsilon(cache.focusPosition, 1e-6) === false || this.rotation.equalsWithEpsilon(cache.rotation, 1e-6) === false) {
            return NeedUpdate.TransformOnly;
        }
        return NeedUpdate.None;
    };
    VertigoHandler.prototype.onStart = function () {
        this.freezeProjectionMatrix();
        this.detachControl();
        var engine = this.getEngine();
        var aspect = engine.getScreenAspectRatio();
        var useRightHandedSystem = this._scene.useRightHandedSystem;
        (0, vertigo_1.computeVertigo)(this, this.focusPosition, this.perspective, this.height, aspect, { useRightHandedSystem: useRightHandedSystem });
    };
    VertigoHandler.prototype.onUpdate = function () {
        var _this = this;
        ui_1.ui.group('camera', function () {
            _this.perspective = ui_1.ui.range("perspective", _this.perspective, [0, 2]).value;
            _this.height = ui_1.ui.range("height", _this.height, [1, 20]).value;
            _this.rotation.x = ui_1.ui.range("rx", _this.rotation.x, [-Math.PI / 2, Math.PI / 2]).value;
            _this.rotation.y = ui_1.ui.range("ry", _this.rotation.y, [-Math.PI, Math.PI]).value;
        });
        var drag = (0, drag_1.getPointer)('body');
        this.rotation.y += drag.dragDelta.x * .001;
        this.rotation.x += drag.dragDelta.y * .001;
        if (this.getNeedUpdate() !== NeedUpdate.None) {
            this.updateVertigoCache();
            var engine = this.getEngine();
            var aspect = engine.getScreenAspectRatio();
            var useRightHandedSystem = this._scene.useRightHandedSystem;
            (0, vertigo_1.computeVertigo)(this, this.focusPosition, this.perspective, this.height, aspect, { useRightHandedSystem: useRightHandedSystem });
        }
    };
    return VertigoHandler;
}(core_1.UniversalCamera));
exports.default = VertigoHandler;
//# sourceMappingURL=VertigoHandler.js.map