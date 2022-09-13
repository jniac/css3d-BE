"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toArray = void 0;
var toArray = function (value) {
    var array = new Array(value.length);
    for (var i = 0, max = value.length; i < max; i++) {
        array[i] = value[i];
    }
    return array;
};
exports.toArray = toArray;
//# sourceMappingURL=utils.js.map