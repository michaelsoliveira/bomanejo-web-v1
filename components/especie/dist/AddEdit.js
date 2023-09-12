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
var ProjetoContext_1 = require("contexts/ProjetoContext");
var AddEdit = function (_a) {
    var id = _a.id;
    var _b = react_hook_form_1.useForm(), register = _b.register, handleSubmit = _b.handleSubmit, errors = _b.formState.errors, setValue = _b.setValue;
    var _c = react_1.useState(), categoria = _c[0], setCategoria = _c[1];
    var _d = react_1.useState(), categorias = _d[0], setCategorias = _d[1];
    var projeto = react_1.useContext(ProjetoContext_1.ProjetoContext).projeto;
    var client = react_1.useContext(AuthContext_1.AuthContext).client;
    var session = react_2.useSession().data;
    var router = router_1.useRouter();
    var isAddMode = !id;
    var loadOptions = function (inputValue, callback) { return __awaiter(void 0, void 0, void 0, function () {
        var response, json;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, client.get("/categoria/search/q?nome=" + inputValue)];
                case 1:
                    response = _a.sent();
                    json = response.data;
                    callback(json === null || json === void 0 ? void 0 : json.map(function (category) { return ({
                        value: category.id,
                        label: category.nome
                    }); }));
                    return [2 /*return*/];
            }
        });
    }); };
    react_1.useEffect(function () {
        function loadEspecie() {
            var _a, _b;
            return __awaiter(this, void 0, void 0, function () {
                var especie, _i, _c, _d, key, value;
                return __generator(this, function (_e) {
                    switch (_e.label) {
                        case 0:
                            if (!(!isAddMode && typeof session !== typeof undefined)) return [3 /*break*/, 2];
                            return [4 /*yield*/, client.get("/especie/" + id)];
                        case 1:
                            especie = (_e.sent()).data;
                            setCategoria({
                                label: (_a = especie === null || especie === void 0 ? void 0 : especie.categoria_especie) === null || _a === void 0 ? void 0 : _a.nome,
                                value: (_b = especie === null || especie === void 0 ? void 0 : especie.categoria_especie) === null || _b === void 0 ? void 0 : _b.id
                            });
                            for (_i = 0, _c = Object.entries(especie); _i < _c.length; _i++) {
                                _d = _c[_i], key = _d[0], value = _d[1];
                                setValue(key, value, {
                                    shouldValidate: true,
                                    shouldDirty: true
                                });
                            }
                            _e.label = 2;
                        case 2: return [2 /*return*/];
                    }
                });
            });
        }
        loadEspecie();
    }, [session, isAddMode, client, id, setValue, setCategoria]);
    react_1.useEffect(function () {
        var defaultOptions = function () { return __awaiter(void 0, void 0, void 0, function () {
            var response, categorias_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(typeof session !== typeof undefined)) return [3 /*break*/, 2];
                        return [4 /*yield*/, client.get("categoria")];
                    case 1:
                        response = _a.sent();
                        categorias_1 = response.data.categorias;
                        setCategorias(categorias_1);
                        _a.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        }); };
        defaultOptions();
    }, [session, client]);
    var selectedCategoria = function (data) {
        setCategoria(data);
        setValue('categoria', data === null || data === void 0 ? void 0 : data.value);
    };
    function onSubmit(data) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var preparedData;
            return __generator(this, function (_b) {
                preparedData = __assign(__assign({}, data), { id_projeto: projeto === null || projeto === void 0 ? void 0 : projeto.id, id_categoria: (_a = categoria === null || categoria === void 0 ? void 0 : categoria.value) !== null && _a !== void 0 ? _a : categoria === null || categoria === void 0 ? void 0 : categoria.value });
                try {
                    return [2 /*return*/, isAddMode
                            ? createEspecie(preparedData)
                            : updateEspecie(id, preparedData)];
                }
                catch (error) {
                    console.log(error.message);
                    alert_1["default"].error(error.message);
                }
                return [2 /*return*/];
            });
        });
    }
    function createEspecie(data) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                client.post('especie', data)
                    .then(function (response) {
                    var _a = response.data, error = _a.error, message = _a.message;
                    if (!error) {
                        alert_1["default"].success(message);
                        router.push('/especie');
                    }
                    else {
                        alert_1["default"].error(message);
                    }
                });
                return [2 /*return*/];
            });
        });
    }
    function getCategoriasDefaultOptions() {
        return categorias === null || categorias === void 0 ? void 0 : categorias.map(function (categoria) {
            return {
                label: categoria.nome,
                value: categoria.id
            };
        });
    }
    function updateEspecie(id, data) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                client.put("/especie/" + id, data)
                    .then(function (response) {
                    var _a = response.data, error = _a.error, message = _a.message;
                    if (!error) {
                        alert_1["default"].success(message);
                        router.push('/especie');
                    }
                    else {
                        console.log(message);
                        alert_1["default"].error(message);
                    }
                });
                return [2 /*return*/];
            });
        });
    }
    return (React.createElement("div", null,
        React.createElement("div", { className: "py-6 flex flex-col justify-center sm:py-12 bg-gray-50" },
            React.createElement("div", { className: "relative py-3 w-11/12 max-w-xl mx-auto" },
                React.createElement("div", { className: 'flex flex-row items-center justify-between shadow-lg bg-gray-100 py-4 sm:rounded-t-xl' },
                    React.createElement("div", null,
                        React.createElement(LinkBack_1.LinkBack, { href: "/especie", className: "flex flex-col relative left-0 ml-4" })),
                    React.createElement("div", null, isAddMode ? (React.createElement("h1", { className: 'text-xl text-gray-800' }, "Cadastro de Esp\u00E9cie")) : (React.createElement("h1", { className: 'text-xl text-gray-800' }, "Editar Esp\u00E9cie"))),
                    React.createElement("div", null)),
                React.createElement("div", { className: "relative p-8 bg-white shadow-sm sm:rounded-b-xl" },
                    React.createElement("form", { className: "w-full", onSubmit: handleSubmit(onSubmit) },
                        React.createElement(FormInput_1.FormInput, { name: "nome", label: "Nome", register: register, errors: errors, rules: { required: 'O campo nome é obrigatório' }, id: "nome", className: "pb-4" }),
                        React.createElement(FormInput_1.FormInput, { id: "nome_orgao", name: "nome_orgao", label: "Nome Vulgar", register: register, errors: errors, rules: {
                                minLength: {
                                    value: 3,
                                    message: 'Por favor, preencha o campo com no mínimo 3 caracteres'
                                }
                            }, className: "pb-4" }),
                        React.createElement(FormInput_1.FormInput, { id: "nome_cientifico", name: "nome_cientifico", label: "Nome Cient\u00EDfico", register: register, errors: errors, rules: {
                                minLength: {
                                    value: 3,
                                    message: 'Por favor, preencha o campo com no mínimo 3 caracteres'
                                }
                            }, className: "pb-4" }),
                        React.createElement("div", { className: 'pb-4' },
                            React.createElement(Select_1.Select, { initialData: {
                                    label: 'Selecione uma Categoria',
                                    value: ''
                                }, selectedValue: categoria, defaultOptions: getCategoriasDefaultOptions(), options: loadOptions, label: "Categoria", callback: selectedCategoria })),
                        React.createElement("div", { className: 'flex items-center justify-between pt-4' },
                            React.createElement(Link_1.Link, { href: "/especie", className: "text-center w-2/5 bg-gray-200 text-gray-800 p-3 rounded-md" }, "Voltar"),
                            React.createElement("button", { className: "w-2/5 bg-green-600 text-white p-3 rounded-md" }, "Salvar"))))))));
};
exports["default"] = AddEdit;
