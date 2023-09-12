"use strict";
exports.__esModule = true;
exports.LoadingProvider = exports.LoadingContext = void 0;
var react_1 = require("react");
var initialState = {
    loading: false,
    setLoading: function () { }
};
exports.LoadingContext = react_1.createContext({});
function LoadingProvider(_a) {
    var children = _a.children;
    var _b = react_1.useState(false), loading = _b[0], setLoading = _b[1];
    return (React.createElement(exports.LoadingContext.Provider, { value: { loading: loading, setLoading: setLoading } }, children));
}
exports.LoadingProvider = LoadingProvider;
