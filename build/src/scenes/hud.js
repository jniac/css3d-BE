"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hud = void 0;
var uiElement = document.querySelector('#ui');
var createInput = function (name) {
    var div = document.createElement('div');
    div.innerHTML = /* html */ "\n    <input type=\"range\" min=\"0\" max=\"1\"></input>\n    <div>".concat(name, "</div>\n  ");
    div.id = name;
    var input = div.querySelector('input');
    uiElement.append(div);
    return input;
};
var getOrCreateInput = function (name, props) {
    var _a;
    var input = ((_a = uiElement.querySelector("#".concat(name, " input"))) !== null && _a !== void 0 ? _a : createInput(name));
    return input;
};
exports.hud = {
    input: function (name, props) {
        var input = getOrCreateInput(name, props);
        return parseFloat(input.value);
    },
};
//# sourceMappingURL=hud.js.map