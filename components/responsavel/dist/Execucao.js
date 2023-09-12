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
var react_1 = require("react");
var react_hook_form_1 = require("react-hook-form");
var router_1 = require("next/router");
var alert_1 = require("../../services/alert");
var AuthContext_1 = require("../../contexts/AuthContext");
var PessoaFisica_1 = require("../../components/Form/PessoaFisica");
var endereco_1 = require("../endereco");
var ProjetoContext_1 = require("contexts/ProjetoContext");
var FormInput_1 = require("../formInput");
var ModalContext_1 = require("contexts/ModalContext");
var Execucao = react_1.forwardRef(function AddEdit(_a, ref) {
    var _this = this;
    var responseData = _a.responseData;
    var router = router_1.useRouter();
    var client = react_1.useContext(AuthContext_1.AuthContext).client;
    var _b = react_1.useState(), responsavel = _b[0], setResponsavel = _b[1];
    var projeto = react_1.useContext(ProjetoContext_1.ProjetoContext).projeto;
    var _c = react_1.useState(), estado = _c[0], setEstado = _c[1];
    var isAddMode = !(projeto === null || projeto === void 0 ? void 0 : projeto.pessoa);
    var hideModal = ModalContext_1.useModalContext().hideModal;
    var _d = react_hook_form_1.useForm(), register = _d.register, handleSubmit = _d.handleSubmit, reset = _d.reset, errors = _d.formState.errors, setValue = _d.setValue;
    var loadResponsaveis = react_1.useCallback(function () { return __awaiter(_this, void 0, void 0, function () {
        var data, _i, _a, _b, key, value;
        var _c, _d, _e, _f;
        return __generator(this, function (_g) {
            switch (_g.label) {
                case 0: return [4 /*yield*/, client.get("/responsavel")];
                case 1:
                    data = (_g.sent()).data;
                    setResponsavel(data);
                    setEstado({
                        label: (_d = (_c = data === null || data === void 0 ? void 0 : data.endereco) === null || _c === void 0 ? void 0 : _c.estado) === null || _d === void 0 ? void 0 : _d.nome,
                        value: (_f = (_e = data === null || data === void 0 ? void 0 : data.endereco) === null || _e === void 0 ? void 0 : _e.estado) === null || _f === void 0 ? void 0 : _f.id
                    });
                    for (_i = 0, _a = Object.entries(data); _i < _a.length; _i++) {
                        _b = _a[_i], key = _b[0], value = _b[1];
                        setValue(key, value, {
                            shouldValidate: true,
                            shouldDirty: true
                        });
                    }
                    return [2 /*return*/];
            }
        });
    }); }, [projeto, client, setValue]);
    react_1.useEffect(function () {
        loadResponsaveis();
    }, [loadResponsaveis]);
    function onSubmit(data) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                try {
                    return [2 /*return*/, isAddMode
                            ? create(__assign(__assign({}, data), { id_projeto: projeto === null || projeto === void 0 ? void 0 : projeto.id }))
                            : update(responsavel === null || responsavel === void 0 ? void 0 : responsavel.id, __assign(__assign({}, data), { id_projeto: projeto === null || projeto === void 0 ? void 0 : projeto.id }))];
                }
                catch (error) {
                    alert_1["default"].error(error.message);
                }
                return [2 /*return*/];
            });
        });
    }
    function create(data) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, client.post('/responsavel', data)
                            .then(function (response) {
                            var _a = response.data, error = _a.error, responsavel = _a.responsavel, message = _a.message;
                            if (error) {
                                console.log('Error: ', message);
                                alert_1["default"].error(message);
                            }
                            else {
                                responseData(responsavel);
                                hideModal();
                                alert_1["default"].success("Respons\u00E1vel T\u00E9cnico cadastrada com SUCESSO!!!");
                                //router.push(`/poa`)
                            }
                        })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    }
    function update(id, data) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, client.put("/responsavel/" + id, data)
                            .then(function (response) {
                            var responsavel = response.data;
                            alert_1["default"].success("Respons\u00E1vel T\u00E9cnico atualizada com SUCESSO!!!");
                            router.push('/poa');
                        })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    }
    return (React.createElement("div", { className: "px-4 py-4" },
        React.createElement("div", { className: "mt-10 sm:mt-0" },
            React.createElement("div", { className: "md:grid md:grid-cols-2 md:gap-6" },
                React.createElement("div", { className: "mt-5 md:mt-0 md:col-span-2" },
                    React.createElement("form", { id: "hook-form", onSubmit: handleSubmit(onSubmit) },
                        React.createElement("div", { className: "shadow sm:rounded-md" },
                            React.createElement("div", { className: "px-4 py-5 bg-white sm:p-6 w-full" },
                                React.createElement("div", { className: "grid grid-cols-6 gap-6 w-full" },
                                    React.createElement("div", { className: "col-span-6" },
                                        React.createElement("div", { className: "grid grid-cols-6 gap-4" },
                                            React.createElement("div", { className: "col-span-2" },
                                                React.createElement(FormInput_1.FormInput, { name: "crea", label: "CREA", register: register, errors: errors, rules: { required: 'O campo CREA é obrigatório' }, id: "nome", className: "pb-4" })),
                                            React.createElement("div", { className: "col-span-2" },
                                                React.createElement(FormInput_1.FormInput, { name: "numero_art", label: "N\u00FAmero ART", register: register, errors: errors, id: "rg", className: "pb-4" }))),
                                        React.createElement(PessoaFisica_1["default"], { register: register, errors: errors }),
                                        React.createElement(endereco_1["default"], { value: estado, setValue: setValue, register: register, errors: errors })))))))))));
});
exports["default"] = Execucao;
