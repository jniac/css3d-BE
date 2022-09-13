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
var dom_1 = require("../dom");
var types_1 = require("../types");
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
    var _a = (0, types_1.resolveUIValueArg)(valueArg), value = _a.value, initialValue = _a.initialValue;
    var _b = resolvePropsArg(props), min = _b.min, max = _b.max, step = _b.step, decimals = _b.decimals;
    var format = function (n) { return n.toFixed(decimals); };
    var div = (0, dom_1.createDiv)(name, 'range', /* html */ "\n    <div class=\"label\">\n      <div class=\"name\">".concat(name, "</div>\n      <div class=\"value\">(").concat(format(value), ")</div>\n    </div>\n    <input type=\"range\" min=\"").concat(min, "\" max=\"").concat(max, "\" step=\"").concat(step, "\" value=\"").concat(value, "\"></input>\n  "));
    div.dataset.frame = dom_1.frame.toString();
    var input = div.querySelector('input');
    var nameDiv = div.querySelector('.name');
    var valueDiv = div.querySelector('.value');
    var updateValue = function (value, _a) {
        var _b = _a === void 0 ? {} : _a, _c = _b.triggerChange, triggerChange = _c === void 0 ? false : _c;
        input.value = value.toString();
        valueDiv.innerHTML = format(value);
        if (triggerChange) {
            div.dataset.frame = dom_1.frame.toString();
        }
    };
    input.oninput = function () {
        var value = Number.parseFloat(input.value);
        updateValue(value, { triggerChange: true });
    };
    nameDiv.onclick = function () {
        updateValue(initialValue, { triggerChange: true });
    };
    dom_1.divProps.get(div).updateValue = updateValue;
    return { value: value, hasChanged: false, input: input };
};
var range = function (name, valueArg, props) {
    if (props === void 0) { props = {}; }
    var div = dom_1.uiElement.querySelector("#".concat(name));
    if (div) {
        var input = div.querySelector('input');
        var inputValue = Number.parseFloat(input.value);
        var hasChanged = Number.parseInt(div.dataset.frame) === dom_1.frame - 1;
        var value = hasChanged ? inputValue : (0, types_1.resolveUIValueArg)(valueArg, inputValue).value;
        dom_1.divProps.get(div).updateValue(value);
        return { input: input, value: value, hasChanged: hasChanged };
    }
    return create(name, valueArg, props);
};
exports.range = range;
//# sourceMappingURL=range.js.map