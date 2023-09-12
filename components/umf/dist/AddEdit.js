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
var Select_1 = require("../Select");
var FormInput_1 = require("../formInput");
var react_1 = require("react");
var router_1 = require("next/router");
var react_hook_form_1 = require("react-hook-form");
var alert_1 = require("../../services/alert");
var AuthContext_1 = require("../../contexts/AuthContext");
var react_2 = require("next-auth/react");
var LinkBack_1 = require("../LinkBack");
var Link_1 = require("../Link");
var Umf = function (_a) {
    var id = _a.id;
    var _b = react_hook_form_1.useForm(), register = _b.register, handleSubmit = _b.handleSubmit, errors = _b.formState.errors, setValue = _b.setValue;
    var _c = react_1.useState(), estado = _c[0], setEstado = _c[1];
    var _d = react_1.useState(), estados = _d[0], setEstados = _d[1];
    var client = react_1.useContext(AuthContext_1.AuthContext).client;
    var session = react_2.useSession().data;
    var router = router_1.useRouter();
    var isAddMode = !id;
    var loadOptions = function (inputValue, callback) { return __awaiter(void 0, void 0, void 0, function () {
        var response, data;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, client.get("/estado/search/q?nome=" + inputValue)];
                case 1:
                    response = _a.sent();
                    data = response.data;
                    callback(data === null || data === void 0 ? void 0 : data.map(function (estado) { return ({
                        value: estado.id,
                        label: estado.nome
                    }); }));
                    return [2 /*return*/];
            }
        });
    }); };
    react_1.useEffect(function () {
        function loadUmf() {
            var _a, _b, _c;
            return __awaiter(this, void 0, void 0, function () {
                var umf, _i, _d, _e, key, value;
                return __generator(this, function (_f) {
                    switch (_f.label) {
                        case 0:
                            if (!(!isAddMode && typeof session !== typeof undefined)) return [3 /*break*/, 2];
                            return [4 /*yield*/, client.get("/umf/" + id)];
                        case 1:
                            umf = (_f.sent()).data;
                            setEstado({
                                label: (_a = umf === null || umf === void 0 ? void 0 : umf.estado) === null || _a === void 0 ? void 0 : _a.nome,
                                value: (_b = umf === null || umf === void 0 ? void 0 : umf.estado) === null || _b === void 0 ? void 0 : _b.id
                            });
                            for (_i = 0, _d = Object.entries(umf); _i < _d.length; _i++) {
                                _e = _d[_i], key = _e[0], value = _e[1];
                                if (key === 'estado') {
                                    setValue('estado', (_c = umf.estado) === null || _c === void 0 ? void 0 : _c.id);
                                }
                                else {
                                    setValue(key, value, {
                                        shouldValidate: true,
                                        shouldDirty: true
                                    });
                                }
                            }
                            _f.label = 2;
                        case 2: return [2 /*return*/];
                    }
                });
            });
        }
        loadUmf();
    }, [session, isAddMode, client, id, setValue, setEstado]);
    react_1.useEffect(function () {
        var defaultOptions = function () { return __awaiter(void 0, void 0, void 0, function () {
            var response, estados_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(typeof session !== typeof undefined)) return [3 /*break*/, 2];
                        return [4 /*yield*/, client.get("/estado?orderBy=nome&order=asc")];
                    case 1:
                        response = _a.sent();
                        estados_1 = response.data.estados;
                        setEstados(estados_1);
                        _a.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        }); };
        defaultOptions();
    }, [session, client]);
    var selectedEstado = function (data) {
        setEstado(data);
        setValue('estado', data === null || data === void 0 ? void 0 : data.value);
    };
    function onSubmit(data) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                try {
                    return [2 /*return*/, isAddMode
                            ? createUmf(data)
                            : updateUmf(id, data)];
                }
                catch (error) {
                    alert_1["default"].error(error.message);
                }
                return [2 /*return*/];
            });
        });
    }
    function getEstadosDefaultOptions() {
        return estados === null || estados === void 0 ? void 0 : estados.map(function (estado) {
            return {
                label: estado.nome,
                value: estado.id
            };
        });
    }
    function createUmf(data) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, client.post('umf', data)
                            .then(function (response) {
                            var _a = response.data, error = _a.error, message = _a.message;
                            if (!error) {
                                alert_1["default"].success(message);
                                router.push('/umf');
                            }
                            else {
                                alert_1["default"].error(message);
                            }
                        })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    }
    function updateUmf(id, data) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, client.put("/umf/" + id, data)
                            .then(function (response) {
                            var _a = response.data, error = _a.error, message = _a.message;
                            if (!error) {
                                alert_1["default"].success(message);
                                router.push('/umf');
                            }
                            else {
                                alert_1["default"].error(message);
                            }
                        })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    }
    return (React.createElement("div", null,
        React.createElement("div", { className: "py-6 flex flex-col justify-center sm:py-12 bg-gray-50" },
            React.createElement("div", { className: "relative py-3 w-11/12 max-w-none lg:max-w-2xl mx-auto" },
                React.createElement("div", { className: 'flex flex-row items-center justify-between shadow-lg bg-gray-100 py-4 sm:rounded-t-xl' },
                    React.createElement("div", null,
                        React.createElement(LinkBack_1.LinkBack, { href: "/umf", className: "flex flex-col relative left-0 ml-4" })),
                    React.createElement("div", null, isAddMode ? (React.createElement("h1", { className: 'text-xl text-gray-800' }, "Cadastrar UMF")) : (React.createElement("h1", { className: 'text-xl text-gray-800' }, "Editar UMF"))),
                    React.createElement("div", null)),
                React.createElement("div", { className: "relative p-8 bg-white shadow-sm sm:rounded-b-xl" },
                    React.createElement("form", { onSubmit: handleSubmit(onSubmit) },
                        React.createElement("div", { className: 'w-full' },
                            React.createElement(FormInput_1.FormInput, { name: "nome", label: "Nome", register: register, errors: errors, rules: {
                                    required: 'O campo nome é obrigatório',
                                    minLength: {
                                        value: 3,
                                        message: 'Por favor, preencha o campo com no mínimo 3 caracteres'
                                    }
                                }, id: "nome", className: "pb-4" })),
                        React.createElement("div", { className: 'flex flex-col md:flex-row space-x-0 md:space-x-4' },
                            React.createElement("div", { className: 'w-full' },
                                React.createElement(FormInput_1.FormInput, { id: "localizacao", name: "localizacao", label: "Localiza\u00E7\u00E3o", type: "text", register: register, errors: errors, className: "pb-4" }))),
                        React.createElement("div", { className: 'flex flex-col md:flex-row space-x-0 md:space-x-4' },
                            React.createElement("div", { className: 'w-8/12' },
                                React.createElement(FormInput_1.FormInput, { id: "municipio", name: "municipio", label: "Munic\u00EDpio", type: "text", register: register, errors: errors, className: "pb-4" })),
                            React.createElement("div", { className: 'w-4/12' },
                                React.createElement(Select_1.Select, { initialData: {
                                        label: 'Selecione um Estado',
                                        value: ''
                                    }, selectedValue: estado, defaultOptions: getEstadosDefaultOptions(), options: loadOptions, label: "Estado", callback: selectedEstado }))),
                        React.createElement("div", { className: 'flex items-center justify-between pt-4' },
                            React.createElement(Link_1.Link, { href: "/umf", className: "text-center w-2/5 bg-gray-200 text-gray-800 p-3 rounded-md" }, "Voltar"),
                            React.createElement("button", { className: "w-2/5 bg-green-600 text-white p-3 rounded-md" }, "Salvar"))))))));
};
exports["default"] = Umf;
