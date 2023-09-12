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
exports.__esModule = true;
var react_1 = require("react");
var react_hook_form_1 = require("react-hook-form");
function Form(_a) {
    var defaultValues = _a.defaultValues, children = _a.children, onSubmit = _a.onSubmit;
    var methods = react_hook_form_1.useForm({ defaultValues: defaultValues });
    var handleSubmit = methods.handleSubmit;
    return (react_1["default"].createElement("form", { onSubmit: handleSubmit(onSubmit) }, react_1["default"].Children.map(children, function (child) {
        return child.props.name
            ? react_1.createElement(child.type, __assign({}, __assign(__assign({}, child.props), { register: methods.register, key: child.props.name })))
            : child;
    })));
}
exports["default"] = Form;
