"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports._delete = exports.getById = exports.getAll = exports.update = exports.create = void 0;
var auth_header_1 = require("./auth-header");
var axios_1 = require("./axios");
function create(dataRequest) {
    return __awaiter(this, void 0, Promise, function () {
        var _a, provider, headers, data;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, auth_header_1["default"]()];
                case 1:
                    _a = _b.sent(), provider = _a.provider, headers = _a.headers;
                    return [4 /*yield*/, axios_1.apiClient().post("/upa", dataRequest, headers)];
                case 2:
                    data = (_b.sent()).data;
                    return [2 /*return*/, {
                            data: data.upa,
                            message: data.message,
                            error: data.error
                        }];
            }
        });
    });
}
exports.create = create;
function update(id, dataRequest) {
    return __awaiter(this, void 0, Promise, function () {
        var _a, provider, headers, data;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    console.log(dataRequest);
                    return [4 /*yield*/, auth_header_1["default"]()];
                case 1:
                    _a = _b.sent(), provider = _a.provider, headers = _a.headers;
                    return [4 /*yield*/, axios_1.apiClient().put("/upa/" + id, dataRequest, headers)];
                case 2:
                    data = (_b.sent()).data;
                    return [2 /*return*/, {
                            data: data.upa,
                            message: data.message,
                            error: data.error
                        }];
            }
        });
    });
}
exports.update = update;
function getAll() {
    return __awaiter(this, void 0, void 0, function () {
        var _a, provider, headers, request;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, auth_header_1["default"]()];
                case 1:
                    _a = _b.sent(), provider = _a.provider, headers = _a.headers;
                    return [4 /*yield*/, axios_1.apiClient().get("/upa", headers)
                            .then(function (response) {
                            var data = {
                                data: response.data.upas,
                                message: response.data.message,
                                error: response.data.error
                            };
                            return data;
                        })["catch"](function (error) {
                            return Promise.reject(error);
                        })];
                case 2:
                    request = _b.sent();
                    return [2 /*return*/, request];
            }
        });
    });
}
exports.getAll = getAll;
function getById(id) {
    return __awaiter(this, void 0, Promise, function () {
        var _a, provider, headers, response;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, auth_header_1["default"]()];
                case 1:
                    _a = _b.sent(), provider = _a.provider, headers = _a.headers;
                    return [4 /*yield*/, axios_1.apiClient().get("/upa/" + id, headers)];
                case 2:
                    response = _b.sent();
                    return [2 /*return*/, {
                            data: response.data,
                            message: "",
                            error: false
                        }];
            }
        });
    });
}
exports.getById = getById;
function _delete(id, ctx) {
    return __awaiter(this, void 0, Promise, function () {
        var _a, provider, headers;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, auth_header_1["default"]()];
                case 1:
                    _a = _b.sent(), provider = _a.provider, headers = _a.headers;
                    return [4 /*yield*/, axios_1.apiClient()["delete"]("/upa/" + id, headers)];
                case 2:
                    _b.sent();
                    return [2 /*return*/];
            }
        });
    });
}
exports._delete = _delete;
var upaService = {
    create: create,
    update: update,
    getById: getById,
    getAll: getAll,
    "delete": _delete
};
exports["default"] = upaService;
