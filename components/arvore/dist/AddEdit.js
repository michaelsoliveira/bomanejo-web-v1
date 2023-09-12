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
var RadioGroup_1 = require("../form/RadioGroup");
var Option_1 = require("../form/Option");
var hooks_1 = require("store/hooks");
var AddEdit = function (_a) {
    var id = _a.id;
    var _b = react_hook_form_1.useForm(), register = _b.register, handleSubmit = _b.handleSubmit, errors = _b.formState.errors, setValue = _b.setValue;
    var _c = react_1.useState(), observacao = _c[0], setObservances = _c[1];
    var _d = react_1.useState(), observacoes = _d[0], setObservacoes = _d[1];
    var _e = react_1.useState(), especie = _e[0], setEspecie = _e[1];
    var _f = react_1.useState(), especies = _f[0], setEspecies = _f[1];
    var _g = react_1.useState({ label: 'DIR', value: 'D' }), orient_x = _g[0], setOrientX = _g[1];
    var _h = react_1.useState(), medicao = _h[0], setMedicao = _h[1];
    var projeto = react_1.useContext(ProjetoContext_1.ProjetoContext).projeto;
    var client = react_1.useContext(AuthContext_1.AuthContext).client;
    var session = react_2.useSession().data;
    var upa = hooks_1.useAppSelector(function (state) { return state.upa; });
    var ut = hooks_1.useAppSelector(function (state) { return state.ut; });
    var router = router_1.useRouter();
    var isAddMode = !id;
    var loadObsOptions = function (inputValue, callback) { return __awaiter(void 0, void 0, void 0, function () {
        var response, json;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, client.get("/obs-arvore/search/q?nome=" + inputValue)];
                case 1:
                    response = _a.sent();
                    json = response.data;
                    callback(json === null || json === void 0 ? void 0 : json.map(function (observacao) { return ({
                        value: observacao.id,
                        label: observacao.nome
                    }); }));
                    return [2 /*return*/];
            }
        });
    }); };
    var loadEspecieOptions = function (inputValue, callback) { return __awaiter(void 0, void 0, void 0, function () {
        var response, json;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, client.get("/especie/search/q?nome=" + inputValue)];
                case 1:
                    response = _a.sent();
                    json = response.data;
                    callback(json === null || json === void 0 ? void 0 : json.map(function (especie) { return ({
                        value: especie.id,
                        label: especie.nome
                    }); }));
                    return [2 /*return*/];
            }
        });
    }); };
    react_1.useEffect(function () {
        function loadArvore() {
            var _a, _b, _c, _d;
            return __awaiter(this, void 0, void 0, function () {
                var arvore, _i, _e, _f, key, value;
                return __generator(this, function (_g) {
                    switch (_g.label) {
                        case 0:
                            if (!(!isAddMode && typeof session !== typeof undefined)) return [3 /*break*/, 2];
                            return [4 /*yield*/, client.get("/arvore/" + id)];
                        case 1:
                            arvore = (_g.sent()).data;
                            console.log(arvore);
                            if (arvore === null || arvore === void 0 ? void 0 : arvore.observacao_arvore) {
                                setObservances({
                                    label: (_a = arvore === null || arvore === void 0 ? void 0 : arvore.observacao_arvore) === null || _a === void 0 ? void 0 : _a.nome,
                                    value: (_b = arvore === null || arvore === void 0 ? void 0 : arvore.observacao_arvore) === null || _b === void 0 ? void 0 : _b.id
                                });
                            }
                            setEspecie({
                                label: (_c = arvore === null || arvore === void 0 ? void 0 : arvore.especie) === null || _c === void 0 ? void 0 : _c.nome,
                                value: (_d = arvore === null || arvore === void 0 ? void 0 : arvore.especie) === null || _d === void 0 ? void 0 : _d.id
                            });
                            if ((upa === null || upa === void 0 ? void 0 : upa.tipo) === 1) {
                                setOrientX({
                                    label: (arvore === null || arvore === void 0 ? void 0 : arvore.orient_x) === 'D' && 'DIR',
                                    value: arvore === null || arvore === void 0 ? void 0 : arvore.orient_x
                                });
                            }
                            for (_i = 0, _e = Object.entries(arvore); _i < _e.length; _i++) {
                                _f = _e[_i], key = _f[0], value = _f[1];
                                setValue(key, value, {
                                    shouldValidate: true,
                                    shouldDirty: true
                                });
                            }
                            _g.label = 2;
                        case 2: return [2 /*return*/];
                    }
                });
            });
        }
        loadArvore();
    }, [session, isAddMode, client, id, setValue, setObservances, setEspecie, upa === null || upa === void 0 ? void 0 : upa.tipo]);
    react_1.useEffect(function () {
        var defaultObsOptions = function () { return __awaiter(void 0, void 0, void 0, function () {
            var response, observacoes_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(typeof session !== typeof undefined)) return [3 /*break*/, 2];
                        return [4 /*yield*/, client.get("obs-arvore")];
                    case 1:
                        response = _a.sent();
                        observacoes_1 = response.data.observacoes;
                        setObservacoes(observacoes_1);
                        _a.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        }); };
        var defaultEspecieOptions = function () { return __awaiter(void 0, void 0, void 0, function () {
            var response, especies_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(typeof session !== typeof undefined)) return [3 /*break*/, 2];
                        return [4 /*yield*/, client.get("especie")];
                    case 1:
                        response = _a.sent();
                        especies_1 = response.data.especies;
                        setEspecies(especies_1);
                        _a.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        }); };
        defaultEspecieOptions();
        defaultObsOptions();
    }, [session, client]);
    var selectedObservacao = function (data) {
        setObservances(data);
        setValue('observacao_arvore', data === null || data === void 0 ? void 0 : data.value);
    };
    var selectedEspecie = function (data) {
        setEspecie(data);
        setValue('especie', data === null || data === void 0 ? void 0 : data.value);
    };
    function onSubmit(data) {
        return __awaiter(this, void 0, void 0, function () {
            var preparedData;
            return __generator(this, function (_a) {
                preparedData = __assign(__assign({}, data), { orient_x: orient_x === null || orient_x === void 0 ? void 0 : orient_x.value, id_projeto: projeto === null || projeto === void 0 ? void 0 : projeto.id, id_observacao: (observacao === null || observacao === void 0 ? void 0 : observacao.value) && (observacao === null || observacao === void 0 ? void 0 : observacao.value), id_especie: (especie === null || especie === void 0 ? void 0 : especie.value) && (especie === null || especie === void 0 ? void 0 : especie.value) });
                try {
                    return [2 /*return*/, isAddMode
                            ? createArvore(preparedData)
                            : updateArvore(id, preparedData)];
                }
                catch (error) {
                    console.log(error.message);
                    alert_1["default"].error(error.message);
                }
                return [2 /*return*/];
            });
        });
    }
    function createArvore(data) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                client.post("/arvore", __assign({ upa: upa === null || upa === void 0 ? void 0 : upa.id, ut: ut === null || ut === void 0 ? void 0 : ut.id }, data))
                    .then(function (response) {
                    var _a = response.data, error = _a.error, message = _a.message;
                    if (!error) {
                        alert_1["default"].success(message);
                        router.push('/arvore');
                    }
                    else {
                        alert_1["default"].error(message);
                    }
                });
                return [2 /*return*/];
            });
        });
    }
    function getObservacoesDefaultOptions() {
        return observacoes === null || observacoes === void 0 ? void 0 : observacoes.map(function (observacao) {
            return {
                label: observacao.nome,
                value: observacao.id
            };
        });
    }
    function getEspeciesDefaultOptions() {
        return especies === null || especies === void 0 ? void 0 : especies.map(function (especie) {
            return {
                label: especie.nome,
                value: especie.id
            };
        });
    }
    function updateArvore(id, data) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                client.put("/arvore/" + id, data)
                    .then(function (response) {
                    var _a = response.data, error = _a.error, message = _a.message;
                    if (!error) {
                        alert_1["default"].success(message);
                        router.push('/arvore');
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
    function onSelect(index) {
        setMedicao(index);
    }
    return (React.createElement("div", null,
        React.createElement("div", { className: "py-6 flex flex-col justify-center sm:py-12 bg-gray-50" },
            React.createElement("div", { className: "relative py-3 w-full px-4 lg:max-w-4xl mx-auto" },
                React.createElement("div", { className: 'flex flex-row items-center justify-between shadow-lg bg-gray-100 py-4 sm:rounded-t-xl' },
                    React.createElement("div", null,
                        React.createElement(LinkBack_1.LinkBack, { href: "/arvore", className: "flex flex-col relative left-0 ml-4" })),
                    React.createElement("div", null, isAddMode ? (React.createElement("h1", { className: 'text-xl text-gray-800' }, "Cadastro de \u00C1rvore")) : (React.createElement("h1", { className: 'text-xl text-gray-800' }, "Editar \u00C1rvore"))),
                    React.createElement("div", null)),
                React.createElement("div", { className: "relative p-8 bg-white shadow-sm sm:rounded-b-xl" },
                    React.createElement("form", { onSubmit: handleSubmit(onSubmit) },
                        React.createElement("div", { className: 'grid grid-cols-3 lg:grid-cols-5 gap-4' },
                            React.createElement("div", { className: 'col-span-3 lg:col-span-5 w-48' },
                                React.createElement(RadioGroup_1["default"], { labelText: "Medi\u00E7\u00E3o" }, ["CAP", "DAP"].map(function (el, index) { return (React.createElement(Option_1["default"], { key: index, index: index, selectedIndex: medicao ? medicao : 1, onSelect: function (index) {
                                        onSelect(index);
                                    } }, el)); }))),
                            React.createElement("div", null,
                                React.createElement(FormInput_1.FormInput, { id: "numero_arvore", name: "numero_arvore", label: "N\u00BA \u00C1rvore", register: register, errors: errors, rules: { required: 'O campo nome é obrigatório' }, className: "pb-4" })),
                            (upa.tipo === 1) ? (React.createElement(React.Fragment, null,
                                React.createElement("div", null,
                                    React.createElement(FormInput_1.FormInput, { name: "faixa", label: "Faixa", register: register, errors: errors, rules: { required: 'O campo nome é obrigatório' }, id: "faixa", className: "pb-4" })),
                                React.createElement("div", null,
                                    React.createElement(FormInput_1.FormInput, { id: "lat_x", name: "lat_x", label: "Coord. X", register: register, errors: errors, rules: { required: 'O campo nome é obrigatório' }, className: "pb-4" })),
                                React.createElement("div", { className: 'pt-1' },
                                    React.createElement(Select_1.Select, { selectedValue: orient_x, defaultOptions: [
                                            { label: 'DIR', value: 'D' },
                                            { label: 'ESQ', value: 'E' }
                                        ], label: "DIR / ESQ", callback: function (e) { return setOrientX(e); } })),
                                React.createElement("div", null,
                                    React.createElement(FormInput_1.FormInput, { id: "long_y", name: "long_y", label: "Coord. Y", register: register, errors: errors, rules: { required: 'O campo nome é obrigatório' }, className: "pb-4" })))) : (React.createElement(React.Fragment, null,
                                React.createElement("div", { className: 'lg:col-span-1 lg:w-full col-span-2 w-[7.5rem]' },
                                    React.createElement(FormInput_1.FormInput, { name: "ponto_gps", label: "Ponto", register: register, errors: errors, rules: { required: 'O campo nome é obrigatório' }, id: "ponto", className: "pb-4" })))),
                            (medicao === 0) ? (React.createElement(React.Fragment, null,
                                React.createElement("div", null,
                                    React.createElement(FormInput_1.FormInput, { name: "cap", label: "CAP", register: register, errors: errors, rules: { required: 'O campo nome é obrigatório' }, id: "cap", type: 'number', step: 0.01, className: "pb-4" })))) : (React.createElement(React.Fragment, null,
                                React.createElement("div", null,
                                    React.createElement(FormInput_1.FormInput, { name: "dap", label: "DAP", register: register, errors: errors, rules: { required: 'O campo nome é obrigatório' }, id: "dap", type: 'number', step: 0.01, className: "pb-4" })))),
                            React.createElement("div", null,
                                React.createElement(FormInput_1.FormInput, { name: "altura", label: "Altura", register: register, errors: errors, rules: { required: 'O campo nome é obrigatório' }, id: "altura", type: 'number', step: 0.01, className: "pb-4" })),
                            React.createElement("div", null,
                                React.createElement(FormInput_1.FormInput, { name: "fuste", label: "Fuste", register: register, errors: errors, rules: { required: 'O campo nome é obrigatório' }, id: "fuste", type: 'number', className: "pb-4" })),
                            React.createElement("div", { className: 'lg:col-span-2 col-span-3 pb-4' },
                                React.createElement(Select_1.Select, { initialData: {
                                        label: 'Selecione uma Observação',
                                        value: ''
                                    }, selectedValue: observacao, defaultOptions: getObservacoesDefaultOptions(), options: loadObsOptions, label: "Observa\u00E7\u00E3o", callback: selectedObservacao }))),
                        React.createElement("div", { className: 'lg:col-span-3 col-span-3 pb-4' },
                            React.createElement(Select_1.Select, { initialData: {
                                    label: 'Selecione uma Espécie',
                                    value: ''
                                }, selectedValue: especie, defaultOptions: getEspeciesDefaultOptions(), options: loadEspecieOptions, label: "Esp\u00E9cie", callback: selectedEspecie })),
                        React.createElement("div", null,
                            React.createElement("div", { className: 'flex flex-row items-center justify-between pt-4 w-full' },
                                React.createElement(Link_1.Link, { href: "/arvore", className: "text-center lg:w-1/6 bg-gray-200 text-gray-800 p-3 rounded-md" }, "Voltar"),
                                React.createElement("button", { className: "lg:w-1/6 bg-green-600 text-white p-3 rounded-md" }, "Salvar")))))))));
};
exports["default"] = AddEdit;
