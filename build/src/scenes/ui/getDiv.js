"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toArray = exports.getDiv = void 0;
var index_1 = require("./index");
var getDiv = function (id, className, innerHTML) {
    var div = document.createElement('div');
    div.id = id;
    div.className = "input ".concat(className);
    div.innerHTML = innerHTML;
    index_1.uiElement.append(div);
    return div;
};
exports.getDiv = getDiv;
var toArray = function (value) {
    var array = new Array(value.length);
    for (var i = 0, max = value.length; i < max; i++) {
        array[i] = value[i];
    }
    return array;
};
exports.toArray = toArray;
//# sourceMappingURL=getDiv.js.map