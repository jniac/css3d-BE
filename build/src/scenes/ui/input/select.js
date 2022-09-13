"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.select = exports.create = void 0;
var dom_1 = require("../dom");
var types_1 = require("../types");
var div_1 = require("../div");
var create = function (name, valueArg, options) {
    var initialValue = (0, types_1.resolveUIValueArg)(valueArg).initialValue;
    var div = (0, div_1.getDiv)(name, 'select', /* html */ "\n    <div class=\"label\">".concat(name, "</div>\n    <select>\n      ").concat(options.map(function (str) { return ("<option>".concat(str, "</option>")); }).join('\n'), "\n    </select>\n  "));
    var select = div.querySelector('select');
    select.selectedIndex = options.indexOf(initialValue);
    select.oninput = function () {
        div.dataset.frame = dom_1.frame.toFixed();
    };
    return { value: initialValue, hasChanged: false, select: select };
};
exports.create = create;
var select = function (name, valueArg, options) {
    var div = dom_1.uiElement.querySelector("#".concat(name));
    if (div) {
        var select_1 = div.querySelector('select');
        var value = options[select_1.selectedIndex];
        var hasChanged = Number.parseInt(div.dataset.frame) === dom_1.frame - 1;
        return { value: value, hasChanged: hasChanged, select: select_1 };
    }
    return (0, exports.create)(name, valueArg, options);
};
exports.select = select;
//# sourceMappingURL=select.js.map