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
exports.resolveUIValueArg = void 0;
var resolveUIValueArg = function (arg, currentValue) {
    if (Array.isArray(arg)) {
        var _a = __read(arg, 2), initialValue = _a[0], value = _a[1];
        return { value: value, initialValue: initialValue };
    }
    if (typeof arg === 'object') {
        if ('value' in arg) {
            var _b = arg, value = _b.value, _c = _b.initialValue, initialValue = _c === void 0 ? value : _c;
            return { value: value, initialValue: initialValue };
        }
        else {
            var initialValue = arg.initialValue;
            return { value: currentValue !== null && currentValue !== void 0 ? currentValue : initialValue, initialValue: initialValue };
        }
    }
    return { value: arg, initialValue: arg };
};
exports.resolveUIValueArg = resolveUIValueArg;
//# sourceMappingURL=types.js.map