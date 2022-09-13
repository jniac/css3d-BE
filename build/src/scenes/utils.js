"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.utils = exports.toString = exports.matrixToString = exports.round = exports.centerModulo = exports.cloneArray = exports.scaleRow3 = exports.scaleRow4 = exports.scaleMatrix = exports.getColVec3 = exports.getColVec4 = exports.getRowVec3 = exports.getRowVec4 = exports.incrementTranslation = exports.scaleTranslation = exports.getTranslation = exports.swapMatrixOrder = void 0;
var core_1 = require("@babylonjs/core");
/*

  a | b | c | x
  d | e | f | y
  g | h | i | z
  0 | 0 | 0 | 1

  row-major                 babylon
  00 | 01 | 02 | 03    -    00 | 04 | 08 | 12
  04 | 05 | 06 | 07    -    01 | 05 | 09 | 13
  08 | 09 | 10 | 11    -    02 | 06 | 10 | 14
  12 | 13 | 14 | 15    -    03 | 07 | 11 | 15

*/
var swapMatrixOrder = function (numbers) {
    var a1 = numbers[4 * 0 + 0], a2 = numbers[4 * 0 + 1], a3 = numbers[4 * 0 + 2], a4 = numbers[4 * 0 + 3];
    var b1 = numbers[4 * 1 + 0], b2 = numbers[4 * 1 + 1], b3 = numbers[4 * 1 + 2], b4 = numbers[4 * 1 + 3];
    var c1 = numbers[4 * 2 + 0], c2 = numbers[4 * 2 + 1], c3 = numbers[4 * 2 + 2], c4 = numbers[4 * 2 + 3];
    var d1 = numbers[4 * 3 + 0], d2 = numbers[4 * 3 + 1], d3 = numbers[4 * 3 + 2], d4 = numbers[4 * 3 + 3];
    return [
        a1, b1, c1, d1,
        a2, b2, c2, d2,
        a3, b3, c3, d3,
        a4, b4, c4, d4,
    ];
};
exports.swapMatrixOrder = swapMatrixOrder;
var getTranslation = function (numbers) { return new core_1.Vector3(numbers[4 * 3 + 0], numbers[4 * 3 + 1], numbers[4 * 3 + 2]); };
exports.getTranslation = getTranslation;
var scaleTranslation = function (numbers, scale, scaleY, scaleZ) {
    if (scaleY === void 0) { scaleY = scale; }
    if (scaleZ === void 0) { scaleZ = scale; }
    numbers[4 * 3 + 0] *= scale;
    numbers[4 * 3 + 1] *= scaleY;
    numbers[4 * 3 + 2] *= scaleZ;
    return numbers;
};
exports.scaleTranslation = scaleTranslation;
var incrementTranslation = function (numbers, x, y, z) {
    numbers[4 * 3 + 0] += x;
    numbers[4 * 3 + 1] += y;
    numbers[4 * 3 + 2] += z;
    return numbers;
};
exports.incrementTranslation = incrementTranslation;
var getRowVec4 = function (numbers, rowIndex) { return new core_1.Vector4(numbers[4 * 0 + rowIndex], numbers[4 * 1 + rowIndex], numbers[4 * 2 + rowIndex], numbers[4 * 3 + rowIndex]); };
exports.getRowVec4 = getRowVec4;
var getRowVec3 = function (numbers, rowIndex) { return new core_1.Vector3(numbers[4 * 0 + rowIndex], numbers[4 * 1 + rowIndex], numbers[4 * 2 + rowIndex]); };
exports.getRowVec3 = getRowVec3;
var getColVec4 = function (numbers, colIndex) { return new core_1.Vector4(numbers[0 + colIndex * 4], numbers[1 + colIndex * 4], numbers[2 + colIndex * 4], numbers[3 + colIndex * 4]); };
exports.getColVec4 = getColVec4;
var getColVec3 = function (numbers, colIndex) { return new core_1.Vector3(numbers[0 + colIndex * 4], numbers[1 + colIndex * 4], numbers[2 + colIndex * 4]); };
exports.getColVec3 = getColVec3;
var scaleMatrix = function (numbers, scale) {
    numbers[0 + 0 * 4] *= scale;
    numbers[0 + 1 * 4] *= scale;
    numbers[0 + 2 * 4] *= scale;
    numbers[1 + 0 * 4] *= scale;
    numbers[1 + 1 * 4] *= scale;
    numbers[1 + 2 * 4] *= scale;
    numbers[2 + 0 * 4] *= scale;
    numbers[2 + 1 * 4] *= scale;
    numbers[2 + 2 * 4] *= scale;
    return numbers;
};
exports.scaleMatrix = scaleMatrix;
var scaleRow4 = function (numbers, rowIndex, scale) {
    numbers[rowIndex + 0 * 4] *= scale;
    numbers[rowIndex + 1 * 4] *= scale;
    numbers[rowIndex + 2 * 4] *= scale;
    numbers[rowIndex + 3 * 4] *= scale;
    return numbers;
};
exports.scaleRow4 = scaleRow4;
var scaleRow3 = function (numbers, rowIndex, scale) {
    numbers[rowIndex + 0 * 4] *= scale;
    numbers[rowIndex + 1 * 4] *= scale;
    numbers[rowIndex + 2 * 4] *= scale;
    return numbers;
};
exports.scaleRow3 = scaleRow3;
var cloneArray = function (array) {
    var length = array.length;
    var result = new Array(length);
    for (var index = 0; index < length; index++) {
        result[index] = array[index];
    }
    return result;
};
exports.cloneArray = cloneArray;
var centerModulo = function (x, base) {
    x %= base;
    var halfBase = base / 2;
    return x < -halfBase ? x + base : x > halfBase ? x - base : x;
};
exports.centerModulo = centerModulo;
var round = function (x, base) {
    return Math.round(x / base) * base;
};
exports.round = round;
var matrixToString = function (m) {
    // 00 | 04 | 08 | 12
    // 01 | 05 | 09 | 13
    // 02 | 06 | 10 | 14
    // 03 | 07 | 11 | 15
    var f1 = function (n) { return n.toFixed(2); };
    var getCol = function (x, y, z, w, decimals) {
        if (decimals === void 0) { decimals = 3; }
        var tr = [x, y, z, w].map(function (n) { return n.toFixed(decimals); });
        var tr_max = tr.reduce(function (max, x) { return Math.max(x.length, max); }, 0);
        return tr.map(function (x) { return x.padStart(tr_max, ' '); });
    };
    var R = getCol(m[0], m[1], m[2], m[3], 3);
    var U = getCol(m[4], m[5], m[6], m[7], 3);
    var F = getCol(m[8], m[9], m[10], m[11], 3);
    var tr = getCol(m[12], m[13], m[14], m[15], 2);
    var lines = [
        [R[0], U[0], F[0], tr[0]].join(', '),
        [R[1], U[1], F[1], tr[1]].join(', '),
        [R[2], U[2], F[2], tr[2]].join(', '),
        [R[3], U[3], F[3], tr[3]].join(', '),
    ];
    return lines.join('\n');
};
exports.matrixToString = matrixToString;
var toString = function (value) {
    if (value instanceof core_1.Vector3) {
        return "(".concat(value.asArray().map(function (x) { return x.toFixed(1); }).join(', '), ")");
    }
    if (value instanceof core_1.Matrix) {
        return "matrix:\n".concat((0, exports.matrixToString)(value.m));
    }
    if (Array.isArray(value) && value.length === 16 && value.every(function (x) { return typeof x === 'number'; })) {
        return "matrix:\n".concat((0, exports.matrixToString)(value));
    }
    return '??';
};
exports.toString = toString;
exports.utils = {
    swapMatrixOrder: exports.swapMatrixOrder,
    getTranslation: exports.getTranslation,
    scaleTranslation: exports.scaleTranslation,
    incrementTranslation: exports.incrementTranslation,
    getRowVec4: exports.getRowVec4,
    getRowVec3: exports.getRowVec3,
    getColVec4: exports.getColVec4,
    getColVec3: exports.getColVec3,
    scaleRow4: exports.scaleRow4,
    scaleRow3: exports.scaleRow3,
    scaleMatrix: exports.scaleMatrix,
    cloneArray: exports.cloneArray,
    centerModulo: exports.centerModulo,
    round: exports.round,
    toString: exports.toString,
};
//# sourceMappingURL=utils.js.map