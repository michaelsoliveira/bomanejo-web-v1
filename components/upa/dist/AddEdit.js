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
var hooks_1 = require("../../store/hooks");
var upaSlice_1 = require("../../store/upaSlice");
var ProjetoContext_1 = require("contexts/ProjetoContext");
var AddEdit = function (_a) {
    var id = _a.id;
    var _b = react_hook_form_1.useForm(), register = _b.register, handleSubmit = _b.handleSubmit, errors = _b.formState.errors, setValue = _b.setValue;
    var _c = react_1.useState(), equacao_volume = _c[0], setEquacao = _c[1];
    var _d = react_1.useState(), equacoes = _d[0], setEquacoes = _d[1];
    var _e = react_1.useState(), sysRef = _e[0], setSysRef = _e[1];
    var _f = react_1.useState(), sysRefs = _f[0], setSysRefs = _f[1];
    var client = react_1.useContext(AuthContext_1.AuthContext).client;
    var projeto = react_1.useContext(ProjetoContext_1.ProjetoContext).projeto;
    var umf = hooks_1.useAppSelector(function (state) { return state.umf; });
    var dispatch = hooks_1.useAppDispatch();
    var session = react_2.useSession().data;
    var router = router_1.useRouter();
    var isAddMode = !id;
    var loadEquacoes = function (inputValue, callback) { return __awaiter(void 0, void 0, void 0, function () {
        var response, equacoes;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, client.get("/projeto/" + (projeto === null || projeto === void 0 ? void 0 : projeto.id) + "/eq-volume?search=" + inputValue)];
                case 1:
                    response = _a.sent();
                    equacoes = response.data.equacoes;
                    console.log(equacoes);
                    callback(equacoes === null || equacoes === void 0 ? void 0 : equacoes.map(function (eqVolume) { return ({
                        value: eqVolume.id,
                        label: eqVolume.nome
                    }); }));
                    return [2 /*return*/];
            }
        });
    }); };
    var loadSysRefs = function (inputValue, callback) { return __awaiter(void 0, void 0, void 0, function () {
        var response, data;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, client.get("/sys-ref/search/q?nome=" + inputValue)];
                case 1:
                    response = _a.sent();
                    data = response.data;
                    callback(data === null || data === void 0 ? void 0 : data.map(function (sysRef) { return ({
                        value: sysRef.srid,
                        label: sysRef.srtext
                    }); }));
                    return [2 /*return*/];
            }
        });
    }); };
    react_1.useEffect(function () {
        function loadUpa() {
            var _a, _b, _c, _d, _e, _f, _g;
            return __awaiter(this, void 0, void 0, function () {
                var upa, _i, _h, _j, key, value;
                return __generator(this, function (_k) {
                    switch (_k.label) {
                        case 0:
                            if (!(!isAddMode && typeof session !== typeof undefined)) return [3 /*break*/, 2];
                            return [4 /*yield*/, client.get("/upa/" + id)];
                        case 1:
                            upa = (_k.sent()).data;
                            setEquacao({
                                label: (_a = upa === null || upa === void 0 ? void 0 : upa.equacao_volume) === null || _a === void 0 ? void 0 : _a.nome,
                                value: (_b = upa === null || upa === void 0 ? void 0 : upa.equacao_volume) === null || _b === void 0 ? void 0 : _b.id
                            });
                            setSysRef({
                                label: (_c = upa === null || upa === void 0 ? void 0 : upa.spatial_ref_sys) === null || _c === void 0 ? void 0 : _c.srtext.split("\"")[1],
                                value: (_d = upa === null || upa === void 0 ? void 0 : upa.spatial_ref_sys) === null || _d === void 0 ? void 0 : _d.srid
                            });
                            for (_i = 0, _h = Object.entries(upa); _i < _h.length; _i++) {
                                _j = _h[_i], key = _j[0], value = _j[1];
                                switch (key) {
                                    case 'equacao_volume':
                                        setValue('equacao_volume', (_e = upa.equacao_volume) === null || _e === void 0 ? void 0 : _e.id);
                                        break;
                                    case 'spatial_ref_sys':
                                        setValue('spatial_ref_sys', (_f = upa.spatial_ref_sys) === null || _f === void 0 ? void 0 : _f.srid);
                                        break;
                                    case 'umf':
                                        setValue('umf', (_g = upa.umf) === null || _g === void 0 ? void 0 : _g.id);
                                        break;
                                    case 'tipo':
                                        setValue('tipo', upa === null || upa === void 0 ? void 0 : upa.tipo.toString());
                                        break;
                                    default: {
                                        setValue(key, value, {
                                            shouldValidate: true,
                                            shouldDirty: true
                                        });
                                    }
                                }
                            }
                            _k.label = 2;
                        case 2: return [2 /*return*/];
                    }
                });
            });
        }
        loadUpa();
    }, [session, isAddMode, client, id, setValue, setEquacao]);
    react_1.useEffect(function () {
        var defaultOptions = function () { return __awaiter(void 0, void 0, void 0, function () {
            var eqResponse, equacoes_1, sysRefResponse, sysRefs_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(typeof session !== typeof undefined)) return [3 /*break*/, 3];
                        return [4 /*yield*/, client.get("/projeto/" + (projeto === null || projeto === void 0 ? void 0 : projeto.id) + "/eq-volume?orderBy=nome&order=asc")];
                    case 1:
                        eqResponse = _a.sent();
                        equacoes_1 = eqResponse.data.equacoes;
                        return [4 /*yield*/, client.get("/sys-ref?orderBy=srtext&order=asc")];
                    case 2:
                        sysRefResponse = _a.sent();
                        sysRefs_1 = sysRefResponse.data.sysRefs;
                        setSysRefs(sysRefs_1);
                        setEquacoes(equacoes_1);
                        _a.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        defaultOptions();
    }, [session, client, projeto]);
    var selectedEquacao = function (data) {
        setEquacao(data);
        setValue('equacao_volume', data === null || data === void 0 ? void 0 : data.value);
    };
    var selectedSysRef = function (data) {
        setSysRef(data);
        setValue('spatial_ref_sys', data === null || data === void 0 ? void 0 : data.value);
    };
    function onSubmit(data) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                try {
                    return [2 /*return*/, isAddMode
                            ? createUpa(data)
                            : updateUpa(id, data)];
                }
                catch (error) {
                    alert_1["default"].error(error.message);
                }
                return [2 /*return*/];
            });
        });
    }
    function getSysRefDefaultOptions() {
        return sysRefs === null || sysRefs === void 0 ? void 0 : sysRefs.map(function (spatialRef) {
            return {
                label: spatialRef.srtext,
                value: spatialRef.srid
            };
        });
    }
    function getEquacoesDefaultOptions() {
        return equacoes === null || equacoes === void 0 ? void 0 : equacoes.map(function (equacao) {
            return {
                label: equacao.nome,
                value: equacao.id
            };
        });
    }
    function createUpa(data) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, client.post('upa', __assign({ umf: umf.id }, data))
                            .then(function (response) {
                            var _a = response.data, error = _a.error, message = _a.message, upa = _a.upa;
                            if (!error) {
                                dispatch(upaSlice_1.setUpa({
                                    id: upa.id,
                                    descricao: upa.descricao,
                                    tipo: upa.tipo
                                }));
                                alert_1["default"].success(message);
                                router.push('/upa');
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
    function updateUpa(id, data) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, client.put("/upa/" + id, __assign({ umf: umf.id }, data))
                            .then(function (response) {
                            var _a = response.data, error = _a.error, message = _a.message, upa = _a.upa;
                            if (!error) {
                                dispatch(upaSlice_1.setUpa({
                                    id: upa.id,
                                    descricao: upa.descricao,
                                    tipo: upa.tipo
                                }));
                                alert_1["default"].success(message);
                                router.push('/upa');
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
            React.createElement("div", { className: "relative py-3 w-11/12 max-w-none lg:max-w-5xl mx-auto" },
                React.createElement("div", { className: 'flex flex-row border-x-2 border-t-2 border-green-600 text-white items-center justify-between shadow-lg bg-gradient-to-r from-green-700 to-green-500 py-4 sm:rounded-t-xl' },
                    React.createElement("div", null,
                        React.createElement(LinkBack_1.LinkBack, { href: "/upa", className: "flex flex-col relative left-0 ml-4" })),
                    React.createElement("div", null, isAddMode ? (React.createElement("h1", { className: 'text-xl' }, "Cadastrar UPA")) : (React.createElement("h1", { className: 'text-xl' }, "Editar UPA"))),
                    React.createElement("div", null)),
                React.createElement("div", { className: "relative p-8 bg-white shadow-sm sm:rounded-b-xl border-x-2 border-b-2 border-green-600" },
                    React.createElement("form", { onSubmit: handleSubmit(onSubmit) },
                        React.createElement("div", { className: 'flex flex-col lg:flex-row md:flex-row space-x-0 md:space-x-4' },
                            React.createElement("div", { className: 'w-3/12' },
                                React.createElement(FormInput_1.FormInput, { name: "ano", label: "Ano", register: register, errors: errors, rules: {
                                        required: 'O campo nome é obrigatório',
                                        minLength: {
                                            value: 3,
                                            message: 'Por favor, preencha o campo com no mínimo 3 caracteres'
                                        }
                                    }, id: "ano", className: "pb-4" })),
                            React.createElement("div", { className: 'lg:w-9/12' },
                                React.createElement(FormInput_1.FormInput, { id: "descricao", name: "descricao", label: "Descri\u00E7\u00E3o", type: "text", register: register, errors: errors, className: "pb-4" }))),
                        React.createElement("div", { className: "border border-gray-200 p-4 mt-4 rounded-md" },
                            React.createElement("span", { className: "text-gray-700" }, "Forma de Invent\u00E1rio"),
                            React.createElement("div", { className: "mt-2" },
                                React.createElement("label", { className: "inline-flex items-center" },
                                    React.createElement("input", __assign({}, register("tipo"), { type: "radio", className: "form-radio", name: "tipo", value: "0" })),
                                    React.createElement("span", { className: "ml-2" }, "GPS")),
                                React.createElement("label", { className: "inline-flex items-center ml-6" },
                                    React.createElement("input", __assign({}, register("tipo"), { type: "radio", className: "form-radio", name: "tipo", value: "1" })),
                                    React.createElement("span", { className: "ml-2" }, "Cartesiano (X Y)")))),
                        React.createElement("div", { className: 'flex flex-col lg:flex-row space-y-4 mt-4 lg:space-y-0 space-x-0 lg:space-x-4' },
                            React.createElement("div", { className: 'lg:w-1/2 border border-gray-200 rounded-lg p-4' },
                                React.createElement("span", { className: "text-gray-700 py-2" }, "Coordenadas"),
                                React.createElement("div", { className: 'mt-2' },
                                    React.createElement(Select_1.Select, { placeholder: 'Selecione o Sistema de Coordenadas', selectedValue: sysRef, defaultOptions: getSysRefDefaultOptions(), options: loadSysRefs, label: "Sistema de Coordenada", callback: selectedSysRef }))),
                            React.createElement("div", { className: 'lg:w-1/2 border border-gray-200 rounded-lg p-4' },
                                React.createElement("span", { className: "text-gray-700 py-2" }, "Equa\u00E7\u00E3o"),
                                React.createElement("div", { className: 'mt-2' },
                                    React.createElement(Select_1.Select, { placeholder: 'Selecione uma Equacao', selectedValue: equacao_volume, defaultOptions: getEquacoesDefaultOptions(), options: loadEquacoes, label: "Volume da \u00C1rvore", callback: selectedEquacao })))),
                        React.createElement("div", { className: 'flex items-center justify-between pt-4' },
                            React.createElement(Link_1.Link, { href: "/upa", className: "text-center w-1/5 bg-gradient-to-r from-orange-600 to-orange-400 text-white p-3 rounded-md" }, "Voltar"),
                            React.createElement("button", { className: "w-1/5 bg-green-600 text-white p-3 rounded-md" }, "Salvar"))))))));
};
exports["default"] = AddEdit;
