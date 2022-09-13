var style = document.createElement('style');
style.innerHTML =
    /* css */ "\n  #ui {\n    position: fixed;\n    width: 100%;\n    height: 100%;\n    pointer-events: none;\n    display: flex;\n    flex-direction: column;\n    font-size: 14px;\n    padding: 4px;\n  }\n\n  #ui .group {\n    border: solid 1px black;\n    padding: 4px;\n    width: 320px;\n    display: flex;\n    flex-direction: column;\n    overflow: hidden;\n  }\n\n  #ui .group > .name {\n    text-decoration: underline;\n  }\n\n  #ui .group .contents {\n    padding-left: 16px;\n  }\n\n  #ui div.input {\n    max-width: 320px;\n    display: flex;\n    flex-direction: row;\n    align-items: center;\n    pointer-events: all;\n    padding: 2px;\n  }\n\n  #ui div.input > .label {\n    display: flex;\n    flex-direction: row;\n    align-items: center;\n    flex: 0 0 140px;\n    overflow: hidden;\n    text-overflow: ellipsis;\n  }\n\n  #ui div.input > .label + * {\n    flex: 1 0 0;\n  }\n\n  #ui div.input > * + * {\n    margin-left: 4px;\n  }\n\n  #ui div.input .value {\n    padding-left: 4px;\n    font-size: .66em;\n  }\n\n  #ui button,\n  #ui select {\n    font-family: inherit;\n  }\n  #ui button.selected {\n    font-weight: 900;\n  }\n  #ui div.input .name {\n    cursor: pointer;\n  }\n\n  #ui .buttons {\n    display: flex;\n    flex-wrap: wrap;\n  }\n";
document.head.append(style);
//# sourceMappingURL=style.js.map