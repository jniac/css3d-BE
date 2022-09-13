"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.frame = exports.uiElement = void 0;
var style = document.createElement('style');
style.innerHTML =
    /* css */ "\n  #ui {\n    position: fixed;\n    width: 100%;\n    height: 100%;\n    pointer-events: none;\n    display: flex;\n    flex-direction: column;\n  }\n\n  #ui > div.input {\n    display: flex;\n    flex-direction: row;\n    align-items: center;\n    pointer-events: all;\n    padding: 2px;\n  }\n\n  #ui > div.input > .label {\n    display: flex;\n    flex-direction: row;\n    align-items: center;\n    flex: 0 0 140px;\n    overflow: hidden;\n    text-overflow: ellipsis;\n    font-size: 14px;\n  }\n\n  #ui > div.input > * + * {\n    margin-left: 4px;\n  }\n\n  #ui > div.input .value {\n    padding-left: 4px;\n    font-size: .66em;\n  }\n\n  #ui button,\n  #ui select {\n    font-family: inherit;\n  }\n  #ui button.selected {\n    font-weight: 900;\n  }\n  #ui div.input .name {\n    cursor: pointer;\n  }\n";
document.head.append(style);
exports.uiElement = document.querySelector('#ui');
exports.frame = 0;
var loop = function () {
    requestAnimationFrame(loop);
    exports.frame++;
};
requestAnimationFrame(loop);
//# sourceMappingURL=frame.js.map