"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
exports.ui = void 0;
var style = document.createElement('style');
style.innerHTML =
    /* css */ "\n  #ui {\n    position: fixed;\n    width: 100%;\n    height: 100%;\n    pointer-events: none;\n    display: flex;\n    flex-direction: column;\n  }\n\n  #ui > div.input {\n    display: flex;\n    flex-direction: row;\n    align-items: center;\n    pointer-events: all;\n    padding: 2px;\n  }\n\n  #ui > div.input > .label {\n    display: flex;\n    flex-direction: row;\n    align-items: center;\n    flex: 0 0 140px;\n    overflow: hidden;\n    text-overflow: ellipsis;\n    font-size: 14px;\n  }\n\n  #ui > div.input > * + * {\n    margin-left: 4px;\n  }\n\n  #ui > div.input .value {\n    padding-left: 4px;\n    font-size: .66em;\n  }\n\n  #ui button,\n  #ui select {\n    font-family: inherit;\n  }\n  #ui button.selected {\n    font-weight: 900;\n  }\n  #ui div.input .name {\n    cursor: pointer;\n  }\n";
document.head.append(style);
var uiElement = document.querySelector('#ui');
var frame = 0;
var loop = function () {
    requestAnimationFrame(loop);
    frame++;
};
requestAnimationFrame(loop);
var getDiv = function (id, className, innerHTML) {
    var div = document.createElement('div');
    div.id = id;
    div.className = "input ".concat(className);
    div.innerHTML = innerHTML;
    uiElement.append(div);
    return div;
};
var toArray = function (value) {
    var array = new Array(value.length);
    for (var i = 0, max = value.length; i < max; i++) {
        array[i] = value[i];
    }
    return array;
};
var factory = {
    input: (function () {
        var create = function (name, type, props) {
            var div = getDiv(name, type, /* html */ "\n        <div class=\"label\">\n          <div class=\"name\">".concat(name, "</div>\n          <div class=\"value\">(").concat(props.value, ")</div>\n        </div>\n        <input type=\"range\" min=\"0\" max=\"1\" step=\"any\"></input>\n      "));
            var input = div.querySelector('input');
            var divValue = div.querySelector('.value');
            input.type = type;
            for (var key in props) {
                input.setAttribute(key, props[key]);
            }
            if (type === 'checkbox') {
                input.checked = !!props.value;
            }
            input.oninput = function () {
                if (type === 'range') {
                    divValue.innerHTML = "(".concat(parseFloat(input.value).toFixed(2), ")");
                    input.setAttribute('value', input.value);
                }
                if (type === 'checkbox') {
                    divValue.innerHTML = "(".concat(input.checked, ")");
                }
                div.dataset.frame = frame.toFixed();
            };
            div.querySelector('div.name').onclick = function () {
                input.value = props.value;
                input.oninput(null);
            };
            return { value: props.value, input: input, hasChanged: false };
        };
        var get = function (name, type, props) {
            var div = uiElement.querySelector("#".concat(name));
            if (div) {
                var input = div.querySelector('input');
                var value = Number.parseFloat(input.getAttribute('value'));
                var hasChanged = Number.parseInt(div.dataset.frame) === frame - 1;
                return { value: value, input: input, hasChanged: hasChanged };
            }
            return create(name, type, props);
        };
        return { create: create, get: get };
    })(),
    range: (function () {
        var create = function (name, value, _a) {
            if (value === void 0) { value = 1; }
            var _b = _a === void 0 ? {} : _a, _c = _b.min, min = _c === void 0 ? 0 : _c, _d = _b.max, max = _d === void 0 ? 1 : _d, _e = _b.step, step = _e === void 0 ? 'any' : _e, _f = _b.decimals, decimals = _f === void 0 ? 2 : _f;
            var format = function (n) { return n.toFixed(decimals); };
            var div = getDiv(name, 'range', /* html */ "\n        <div class=\"label\">\n          <div class=\"name\">".concat(name, "</div>\n          <div class=\"value\">(").concat(format(value), ")</div>\n        </div>\n        <input type=\"range\" min=\"").concat(min, "\" max=\"").concat(max, "\" step=\"").concat(step, "\" value=\"").concat(value, "\"></input>\n      "));
            var input = div.querySelector('input');
            var nameDiv = div.querySelector('.name');
            var valueDiv = div.querySelector('.value');
            input.oninput = function () {
                valueDiv.innerHTML = format(Number.parseFloat(input.value));
            };
            nameDiv.onclick = function () {
                input.value = value.toString();
                valueDiv.innerHTML = format(Number.parseFloat(input.value));
            };
            return { input: input, value: value, hasChanged: false };
        };
        var get = function (name, value, props) {
            if (value === void 0) { value = 1; }
            if (props === void 0) { props = {}; }
            var div = uiElement.querySelector("#".concat(name));
            if (div) {
                var input = div.querySelector('input');
                var value_1 = Number.parseFloat(input.value);
                var hasChanged = Number.parseInt(div.dataset.frame) === frame - 1;
                return { input: input, value: value_1, hasChanged: hasChanged };
            }
            if (Array.isArray(props)) {
                var _a = __read(props, 2), min = _a[0], max = _a[1];
                props = { min: min, max: max };
            }
            return create(name, value, props);
        };
        return { create: create, get: get };
    })(),
    select: (function () {
        var create = function (name, options, currentOption) {
            var div = getDiv(name, 'select', /* html */ "\n        <div class=\"label\">".concat(name, "</div>\n        <select>\n          ").concat(options.map(function (str) { return ("<option>".concat(str, "</option>")); }).join('\n'), "\n        </select>\n      "));
            var select = div.querySelector('select');
            select.selectedIndex = options.indexOf(currentOption);
            select.oninput = function () {
                div.dataset.frame = frame.toFixed();
            };
            return { select: select, value: currentOption, hasChanged: false };
        };
        var get = function (name, options, currentOption) {
            var div = uiElement.querySelector("#".concat(name));
            if (div) {
                var select = div.querySelector('select');
                var value = options[select.selectedIndex];
                var hasChanged = Number.parseInt(div.dataset.frame) === frame - 1;
                return { select: select, value: value, hasChanged: hasChanged };
            }
            return create(name, options, currentOption);
        };
        return { create: create, get: get };
    })(),
    buttons: (function () {
        var create = function (name, options, currentOption) {
            var div = getDiv(name, 'buttons', "\n        <div class=\"label\">".concat(name, "</div>\n        ").concat(options.map(function (opt) { return "<button>".concat(opt, "</button>"); }).join('\n'), "\n      "));
            var buttons = toArray(div.querySelectorAll('button'));
            var indexHistory = [];
            var currentSelectedIndexIs = function (index) { return indexHistory.length > 0 && indexHistory[indexHistory.length - 1] === index; };
            var setSelectedIndex = function (selectedIndex) {
                if (currentSelectedIndexIs(selectedIndex) === false) {
                    indexHistory.push(selectedIndex);
                    div.dataset.frame = frame.toFixed();
                    for (var index = 0, max = buttons.length; index < max; index++) {
                        var button = buttons[index];
                        button.classList.toggle('selected', index === selectedIndex);
                    }
                }
            };
            var _loop_1 = function (index, max) {
                var button = buttons[index];
                button.onclick = function () {
                    var _a;
                    if (currentSelectedIndexIs(index)) {
                        indexHistory.pop();
                        var newIndex = (_a = indexHistory.pop()) !== null && _a !== void 0 ? _a : 0;
                        setSelectedIndex(newIndex);
                    }
                    else {
                        setSelectedIndex(index);
                    }
                };
            };
            for (var index = 0, max = buttons.length; index < max; index++) {
                _loop_1(index, max);
            }
            setSelectedIndex(options.indexOf(currentOption));
            return { buttons: buttons, value: currentOption, hasChanged: false };
        };
        var get = function (name, options, currentOption) {
            var div = uiElement.querySelector("#".concat(name));
            if (div) {
                var buttons = toArray(div.querySelectorAll('button'));
                var index = buttons.findIndex(function (button) { return button.classList.contains('selected'); });
                var value = options[index];
                var hasChanged = Number.parseInt(div.dataset.frame) === frame - 1;
                return { buttons: buttons, value: value, hasChanged: hasChanged };
            }
            return create(name, options, currentOption);
        };
        return { create: create, get: get };
    })(),
};
var range = function (name, value, props) {
    if (props === void 0) { props = {}; }
    return factory.range.get(name, value, props);
};
exports.ui = {
    range: range,
    checkbox: function (name, value, props) {
        return factory.input.get(name, 'checkbox', __assign({ value: value }, props));
    },
    enumSelect: function (name, options, currentOption) {
        return factory.select.get(name, options, currentOption);
    },
    enumButtons: function (name, options, currentOption) {
        return factory.buttons.get(name, options, currentOption);
    },
};
//# sourceMappingURL=ui.js.map