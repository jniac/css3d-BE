"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.releasePointer = exports.getPointer = void 0;
var map = new Map();
var watch = function (element) {
    var pointer = {
        isDown: false,
        point: { x: 0, y: 0 },
        delta: { x: 0, y: 0 },
        pointOld: { x: 0, y: 0 },
        dragDelta: { x: 0, y: 0 },
        dragTotal: { x: 0, y: 0 },
        down: {
            point: { x: 0, y: 0 },
            time: -1,
        },
        up: {
            point: { x: 0, y: 0 },
            time: -1,
        },
    };
    var move = { x: 0, y: 0 };
    var onMove = function (event) {
        move.x = event.x;
        move.y = event.y;
    };
    var onDown = function (event) {
        pointer.down.point.x = event.x;
        pointer.down.point.y = event.y;
        pointer.down.time = Date.now();
        pointer.isDown = true;
    };
    var onUp = function (event) {
        pointer.up.point.x = event.x;
        pointer.up.point.y = event.y;
        pointer.up.time = Date.now();
        pointer.isDown = false;
    };
    var loopId = -1;
    var loop = function () {
        loopId = requestAnimationFrame(loop);
        var point = pointer.point, pointOld = pointer.pointOld, delta = pointer.delta, isDown = pointer.isDown, dragDelta = pointer.dragDelta;
        pointOld.x = point.x;
        pointOld.y = point.y;
        point.x = move.x;
        point.y = move.y;
        delta.x = point.x - pointOld.x;
        delta.y = point.y - pointOld.y;
        if (isDown) {
            dragDelta.x += (delta.x - dragDelta.x) * .5;
            dragDelta.y += (delta.y - dragDelta.y) * .5;
        }
        else {
            dragDelta.x *= .95;
            dragDelta.y *= .95;
        }
    };
    element.addEventListener('pointermove', onMove);
    element.addEventListener('pointerdown', onDown);
    element.addEventListener('pointerup', onUp);
    loopId = requestAnimationFrame(loop);
    var destroy = function () {
        element.removeEventListener('pointermove', onMove);
        element.removeEventListener('pointerdown', onDown);
        element.removeEventListener('pointerup', onUp);
        cancelAnimationFrame(loopId);
    };
    return {
        pointer: pointer,
        destroy: destroy,
    };
};
var getPointer = function (target) {
    if (map.has(target) === false) {
        var targetElement = typeof target === 'string'
            ? document.querySelector(target)
            : target;
        console.log(targetElement);
        map.set(target, watch(targetElement));
    }
    return map.get(target).pointer;
};
exports.getPointer = getPointer;
var releasePointer = function (target) {
    var _a;
    (_a = map.get(target)) === null || _a === void 0 ? void 0 : _a.destroy();
};
exports.releasePointer = releasePointer;
//# sourceMappingURL=drag.js.map