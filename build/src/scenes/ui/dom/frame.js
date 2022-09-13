"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.frame = void 0;
exports.frame = 0;
var loop = function () {
    requestAnimationFrame(loop);
    exports.frame++;
};
requestAnimationFrame(loop);
//# sourceMappingURL=frame.js.map