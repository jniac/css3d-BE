"use strict";
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.range = void 0;
var dom_1 = require("./dom");
var types_1 = require("./types");
var utils_1 = require("./utils");
var resolvePropsArg = function (arg) {
    if (arg === void 0) { arg = {}; }
    if (Array.isArray(arg)) {
        var _a = __read(arg, 4), min_1 = _a[0], max_1 = _a[1], step_1 = _a[2], decimals_1 = _a[3];
        return resolvePropsArg({ min: min_1, max: max_1, step: step_1, decimals: decimals_1 });
    }
    var _b = arg.min, min = _b === void 0 ? 0 : _b, _c = arg.max, max = _c === void 0 ? 1 : _c, _d = arg.step, step = _d === void 0 ? 'any' : _d, _e = arg.decimals, decimals = _e === void 0 ? 2 : _e;
    return {
        min: min,
        max: max,
        step: step,
        decimals: decimals,
    };
};
var create = function (name, valueArg, props) {
    var _a = (0, types_1.resolveUIValue)(valueArg), value = _a.value, initialValue = _a.initialValue;
    var _b = resolvePropsArg(props), min = _b.min, max = _b.max, step = _b.step, decimals = _b.decimals;
    var format = function (n) { return n.toFixed(decimals); };
    var div = (0, utils_1.getDiv)(name, 'range', /* html */ "\n    <div class=\"label\">\n      <div class=\"name\">".concat(name, "</div>\n      <div class=\"value\">(").concat(format(value), ")</div>\n    </div>\n    <input type=\"range\" min=\"").concat(min, "\" max=\"").concat(max, "\" step=\"").concat(step, "\" value=\"").concat(value, "\"></input>\n  "));
    var input = div.querySelector('input');
    var nameDiv = div.querySelector('.name');
    var valueDiv = div.querySelector('.value');
    input.oninput = function () {
        valueDiv.innerHTML = format(Number.parseFloat(input.value));
    };
    nameDiv.onclick = function () {
        input.value = initialValue.toString();
        valueDiv.innerHTML = format(initialValue);
    };
    return { value: value, hasChanged: false, input: input };
};
var range = function (name, value, props) {
    if (props === void 0) { props = {}; }
    var div = dom_1.uiElement.querySelector("#".concat(name));
    if (div) {
        var input = div.querySelector('input');
        var value_1 = Number.parseFloat(input.value);
        var hasChanged = Number.parseInt(div.dataset.frame) === dom_1.frame - 1;
        return { input: input, value: value_1, hasChanged: hasChanged };
    }
    return create(name, value, props);
};
exports.range = range;
//# sourceMappingURL=range.js.map