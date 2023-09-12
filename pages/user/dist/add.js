"use strict";
exports.__esModule = true;
var AddEdit_1 = require("@/components/user/AddEdit");
var withAuthentication_1 = require("components/withAuthentication");
var styles = {
    label: 'block text-gray-700 text-sm font-bold pt-2 pb-1',
    field: 'text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none',
    button: ' bg-green-600 text-white font-bold py-2 px-4 rounded hover:bg-green-500',
    errorMsg: 'text-red-500 text-sm'
};
var AddUser = function () {
    return (React.createElement("div", { className: "bg-white shadow-lg rounded-xl px-4 py-2 w-1/3 mx-auto my-6" },
        React.createElement(AddEdit_1.AddEdit, { styles: styles, redirect: false })));
};
exports["default"] = withAuthentication_1["default"](AddUser);
