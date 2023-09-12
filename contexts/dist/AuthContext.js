"use strict";
exports.__esModule = true;
exports.AuthProvider = exports.AuthContext = void 0;
var react_1 = require("react");
var client_1 = require("../services/client");
exports.AuthContext = react_1.createContext({});
function AuthProvider(_a) {
    var children = _a.children;
    var client = client_1["default"]();
    return (React.createElement(exports.AuthContext.Provider, { value: { client: client } }, children));
}
exports.AuthProvider = AuthProvider;
