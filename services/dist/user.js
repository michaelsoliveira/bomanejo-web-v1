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
exports.findProvider = exports.sendEmail = exports.update = exports.create = void 0;
function create(dataRequest) {
    return __awaiter(this, void 0, Promise, function () {
        var url, response, data;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    url = process.env.NEXT_PUBLIC_API_URL + "/users/create";
                    return [4 /*yield*/, fetch(url, {
                            method: "POST",
                            body: JSON.stringify(__assign({}, dataRequest)),
                            headers: {
                                'Content-Type': 'application/json',
                                'Accept': 'application/json'
                            }
                        })];
                case 1:
                    response = _a.sent();
                    return [4 /*yield*/, response.json()];
                case 2:
                    data = _a.sent();
                    return [2 /*return*/, {
                            data: data.user,
                            message: data.message,
                            error: data.error
                        }];
            }
        });
    });
}
exports.create = create;
function update(id, dataRequest, token) {
    return __awaiter(this, void 0, Promise, function () {
        var url, response, data;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    url = process.env.NEXT_PUBLIC_API_URL + "/users/" + id;
                    return [4 /*yield*/, fetch(url, {
                            method: "PUT",
                            body: JSON.stringify(__assign({}, dataRequest)),
                            headers: {
                                'Content-Type': 'application/json',
                                'Accept': 'application/json',
                                "Authorization": "Bearer " + token
                            }
                        })];
                case 1:
                    response = _a.sent();
                    return [4 /*yield*/, response.json()];
                case 2:
                    data = _a.sent();
                    return [2 /*return*/, {
                            data: data.user,
                            message: data.message,
                            error: data.error
                        }];
            }
        });
    });
}
exports.update = update;
function sendEmail(dataResponse) {
    return __awaiter(this, void 0, Promise, function () {
        var email, name, password, url, response, data;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    email = dataResponse.email, name = dataResponse.username, password = dataResponse.password;
                    url = process.env.NEXT_PUBLIC_API_URL + "/users/send-email";
                    return [4 /*yield*/, fetch(url, {
                            method: "POST",
                            body: JSON.stringify({
                                email: email,
                                name: name,
                                message: "Sua senha de acesso \u00E9: <b>" + password + "</b>"
                            }),
                            headers: {
                                'Content-Type': 'application/json',
                                'Accept': 'application/json'
                            }
                        })];
                case 1:
                    response = _a.sent();
                    data = response.json();
                    return [2 /*return*/, data];
            }
        });
    });
}
exports.sendEmail = sendEmail;
function findProvider(token) {
    return __awaiter(this, void 0, Promise, function () {
        var url, response, data, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    url = process.env.NEXT_PUBLIC_API_URL + "/users/provider/find-by-email?" +
                        new URLSearchParams({
                            email: token === null || token === void 0 ? void 0 : token.email
                        });
                    return [4 /*yield*/, fetch(url, {
                            method: 'GET',
                            headers: {
                                'Accept': 'application/json',
                                'Content-Type': 'application/json',
                                'Authorization': 'Bearer ' + (token === null || token === void 0 ? void 0 : token.access_token)
                            }
                        })];
                case 1:
                    response = _a.sent();
                    return [4 /*yield*/, response.json()];
                case 2:
                    data = _a.sent();
                    console.log(data);
                    return [2 /*return*/, data.user];
                case 3:
                    error_1 = _a.sent();
                    return [2 /*return*/, false];
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.findProvider = findProvider;
var UserService = {
    create: create,
    sendEmail: sendEmail,
    findProvider: findProvider,
    update: update
};
exports["default"] = UserService;
