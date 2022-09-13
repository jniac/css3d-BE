"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buttons = exports.create = void 0;
var dom_1 = require("../dom");
var types_1 = require("../types");
var utils_1 = require("../utils");
var create = function (name, valueArg, options) {
    var _a = (0, types_1.resolveUIValueArg)(valueArg), value = _a.value, initialValue = _a.initialValue;
    var div = (0, dom_1.createDiv)(name, 'buttons', "\n    <div class=\"label\">\n      <div class=\"name\">".concat(name, "</div>\n    </div>\n    <div class=\"buttons\">\n      ").concat(options.map(function (opt) { return "<button>".concat(opt, "</button>"); }).join('\n'), "\n    </div>\n  "));
    var divName = div.querySelector('.name');
    divName.onclick = function () {
        setSelectedIndex(options.indexOf(initialValue));
    };
    var buttons = (0, utils_1.toArray)(div.querySelectorAll('button'));
    var indexHistory = [];
    var currentSelectedIndexIs = function (index) { return indexHistory.length > 0 && indexHistory[indexHistory.length - 1] === index; };
    var setSelectedIndex = function (selectedIndex) {
        if (currentSelectedIndexIs(selectedIndex) === false) {
            indexHistory.push(selectedIndex);
            div.dataset.frame = dom_1.frame.toFixed();
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
    setSelectedIndex(options.indexOf(initialValue));
    dom_1.divProps.get(div).updateValue = setSelectedIndex;
    return { buttons: buttons, value: value, hasChanged: false };
};
exports.create = create;
var buttons = function (name, valueArg, options) {
    var div = dom_1.uiElement.querySelector("#".concat(name));
    if (div) {
        var buttons_1 = (0, utils_1.toArray)(div.querySelectorAll('button'));
        var index = buttons_1.findIndex(function (button) { return button.classList.contains('selected'); });
        var hasChanged = Number.parseInt(div.dataset.frame) === dom_1.frame - 1;
        var value = hasChanged ? options[index] : (0, types_1.resolveUIValueArg)(valueArg, options[index]).value;
        dom_1.divProps.get(div).updateValue(options.indexOf(value));
        return { buttons: buttons_1, value: value, hasChanged: hasChanged };
    }
    return (0, exports.create)(name, valueArg, options);
};
exports.buttons = buttons;
//# sourceMappingURL=buttons.js.map