"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.group = exports.createGroup = exports.createDiv = exports.divProps = exports.uiElement = void 0;
exports.uiElement = document.querySelector('#ui');
var noop = function () { };
exports.divProps = new Map();
var currentGroup = null;
var createDiv = function (id, className, innerHTML) {
    var div = document.createElement('div');
    div.id = id;
    div.className = "input ".concat(className);
    div.innerHTML = innerHTML;
    var parent = currentGroup !== null && currentGroup !== void 0 ? currentGroup : exports.uiElement;
    parent.append(div);
    exports.divProps.set(div, { updateValue: noop });
    return div;
};
exports.createDiv = createDiv;
var createGroup = function (id) {
    var div = document.createElement('div');
    div.id = id;
    div.className = "group";
    div.innerHTML = "\n    <div class=\"name\">".concat(id, "</div>\n    <div class=\"contents\">\n    </div>\n  ");
    var parent = currentGroup !== null && currentGroup !== void 0 ? currentGroup : exports.uiElement;
    parent.append(div);
    return div;
};
exports.createGroup = createGroup;
var group = function (id, callback) {
    var _a;
    console.log(id);
    var previousGroup = currentGroup;
    currentGroup = (_a = exports.uiElement.querySelector("div#".concat(id, ".group .contents"))) !== null && _a !== void 0 ? _a : (0, exports.createGroup)(id).querySelector('.contents');
    callback();
    currentGroup = previousGroup;
};
exports.group = group;
//# sourceMappingURL=elements.js.map