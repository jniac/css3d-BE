"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buttons = void 0;
var dom_1 = require("./dom");
var types_1 = require("./types");
var utils_1 = require("./utils");
var create = function (name, currentOption, options) {
    var _a = (0, types_1.resolveUIValue)(currentOption), value = _a.value, initialValue = _a.initialValue;
    var div = (0, utils_1.getDiv)(name, 'buttons', "\n    <div class=\"label\">".concat(name, "</div>\n    ").concat(options.map(function (opt) { return "<button>".concat(opt, "</button>"); }).join('\n'), "\n  "));
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
    return { buttons: buttons, value: value, hasChanged: false };
};
var buttons = function (name, currentOption, options) {
    var div = dom_1.uiElement.querySelector("#".concat(name));
    if (div) {
        var buttons_1 = (0, utils_1.toArray)(div.querySelectorAll('button'));
        var index = buttons_1.findIndex(function (button) { return button.classList.contains('selected'); });
        var value = options[index];
        var hasChanged = Number.parseInt(div.dataset.frame) === dom_1.frame - 1;
        return { buttons: buttons_1, value: value, hasChanged: hasChanged };
    }
    return create(name, currentOption, options);
};
exports.buttons = buttons;
//# sourceMappingURL=buttons.js.map