"use strict";
exports.__esModule = true;
exports.store = void 0;
var toolkit_1 = require("@reduxjs/toolkit");
var projetoSlice_1 = require("./projetoSlice");
var userSlice_1 = require("./userSlice");
var messageSlice_1 = require("./messageSlice");
var paginationSlice_1 = require("./paginationSlice");
var umfSlice_1 = require("./umfSlice");
var upaSlice_1 = require("./upaSlice");
var utSlice_1 = require("./utSlice");
var poaSlice_1 = require("./poaSlice");
var browser_storage_1 = require("./browser-storage");
exports.store = toolkit_1.configureStore({
    devTools: true,
    reducer: {
        projeto: projetoSlice_1["default"],
        user: userSlice_1["default"],
        message: messageSlice_1["default"],
        pagination: paginationSlice_1["default"],
        umf: umfSlice_1["default"],
        upa: upaSlice_1["default"],
        ut: utSlice_1["default"],
        poa: poaSlice_1["default"]
    },
    preloadedState: browser_storage_1.loadState()
});
