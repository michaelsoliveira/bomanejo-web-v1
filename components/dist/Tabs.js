"use strict";
exports.__esModule = true;
var react_1 = require("@headlessui/react");
var classnames_1 = require("classnames");
var Login_1 = require("./Login");
var AddEdit_1 = require("./user/AddEdit");
var react_2 = require("react");
var outline_1 = require("@heroicons/react/outline");
var styles = {
    label: 'block text-gray-700 text-sm font-bold pt-2 pb-1',
    field: 'text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 w-[22.5em] appearance-none',
    button: ' bg-green-600 text-white font-bold py-2 px-4 rounded hover:bg-green-500',
    errorMsg: 'text-red-500 text-sm'
};
var Tabs = function () {
    var _a;
    var formRef = react_2.createRef();
    var submitForm = function () {
        if (formRef.current) {
            formRef.current.handleSubmit();
        }
    };
    return (react_2["default"].createElement("div", { className: "w-full py-4" },
        react_2["default"].createElement(react_1.Tab.Group, null,
            react_2["default"].createElement(react_1.Tab.List, { className: "flex p-1 space-x-2 bg-green-900/20 rounded-lg" },
                react_2["default"].createElement(react_1.Tab, { className: function (_a) {
                        var selected = _a.selected;
                        return classnames_1["default"]('w-full py-2.5 text-sm leading-5 font-medium rounded-md transition-all', 'focus:outline-none focus:ring-2 ring-offset-2 ring-offset-green-400 ring-white ring-opacity-60', selected
                            ? 'bg-green-700 text-white shadow'
                            : 'text-gray-700 hover:bg-gray-50 hover:text-gray-700');
                    } }, "Login"),
                react_2["default"].createElement(react_1.Tab, { className: function (_a) {
                        var selected = _a.selected;
                        return classnames_1["default"]('w-full py-2.5 text-sm leading-5 font-medium rounded-md transition-all', 'focus:outline-none focus:ring-2 ring-offset-2 ring-offset-green-400 ring-white ring-opacity-60', selected
                            ? 'bg-green-700 text-white shadow'
                            : 'text-gray-700 hover:bg-gray-100 hover:text-green-700');
                    } }, "Cadastro")),
            react_2["default"].createElement(react_1.Tab.Panels, null,
                react_2["default"].createElement(react_1.Tab.Panel, { className: classnames_1["default"]('px-6 py-2') },
                    react_2["default"].createElement(Login_1["default"], null)),
                react_2["default"].createElement(react_1.Tab.Panel, { className: classnames_1["default"]('px-4 py-2 text-left mx-auto flex flex-wrap justify-center items-center') },
                    react_2["default"].createElement("div", { className: "flex flex-col items-center justify-between w-full" },
                        react_2["default"].createElement(AddEdit_1.AddEdit, { ref: formRef, styles: styles, projetoId: "", redirect: true }),
                        react_2["default"].createElement("button", { onClick: submitForm, disabled: (_a = formRef.current) === null || _a === void 0 ? void 0 : _a.isSubmitting, type: "submit", className: "my-4 group relative w-3/4 py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500" },
                            react_2["default"].createElement("span", { className: "absolute left-0 inset-y-0 flex items-center pl-3" },
                                react_2["default"].createElement(outline_1.UserAddIcon, { className: "h-5 w-5 text-green-500 group-hover:text-green-400", "aria-hidden": "true" })),
                            "Cadastrar")))))));
};
exports["default"] = Tabs;
