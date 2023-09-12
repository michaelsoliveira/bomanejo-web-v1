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
var Select_1 = require("@/components/Select");
var react_1 = require("react");
var alert_1 = require("../../services/alert");
var AuthContext_1 = require("../../contexts/AuthContext");
var react_2 = require("next-auth/react");
var LinkBack_1 = require("@/components/LinkBack");
var Link_1 = require("@/components/Link");
var ProjetoContext_1 = require("contexts/ProjetoContext");
var styles_1 = require("../Utils/styles");
var ModalContext_1 = require("contexts/ModalContext");
var outline_1 = require("@heroicons/react/outline");
var AddEdit_1 = require("./AddEdit");
var LoadingContext_1 = require("contexts/LoadingContext");
var Projetos = function () {
    var client = react_1.useContext(AuthContext_1.AuthContext).client;
    var _a = react_1.useContext(ProjetoContext_1.ProjetoContext), projeto = _a.projeto, setProjeto = _a.setProjeto;
    var _b = react_1.useState(), selectedProjeto = _b[0], setSelectedProjeto = _b[1];
    var _c = react_1.useState(), projetoLocal = _c[0], setProjetoLocal = _c[1];
    var _d = react_1.useState(), projetos = _d[0], setProjetos = _d[1];
    var session = react_2.useSession().data;
    var setLoading = react_1.useContext(LoadingContext_1.LoadingContext).setLoading;
    var _e = ModalContext_1.useModalContext(), showModal = _e.showModal, hideModal = _e.hideModal;
    var deleteSingleModal = function () {
        return showModal({
            type: 'delete.projeto',
            title: 'Deletar Projeto',
            onConfirm: function () { deleteProjeto(selectedProjeto === null || selectedProjeto === void 0 ? void 0 : selectedProjeto.id); },
            styleButton: styles_1.styles.redButton,
            iconType: 'warn',
            confirmBtn: 'Deletar',
            content: "Tem Certeza que deseja excluir o Projeto " + (selectedProjeto === null || selectedProjeto === void 0 ? void 0 : selectedProjeto.nome) + " ?"
        });
    };
    var editModal = function () { return showModal({ title: 'Editar Projeto', type: "submit", hookForm: 'hook-form', styleButton: styles_1.styles.greenButton, confirmBtn: 'Salvar', content: React.createElement(AddEdit_1.AddEdit, { reloadData: loadProjetos, data: selectedProjeto }) }); };
    var addModal = function () {
        // setSelectedProjeto(null)
        showModal({ title: 'Novo Projeto', type: "submit", hookForm: 'hook-form', styleButton: styles_1.styles.greenButton, confirmBtn: 'Salvar', content: React.createElement(AddEdit_1.AddEdit, { reloadData: loadProjetos }) });
    };
    var loadOptions = function (inputValue, callback) { return __awaiter(void 0, void 0, void 0, function () {
        var response, json;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, client.get("/projeto/search/q?nome=" + inputValue)];
                case 1:
                    response = _a.sent();
                    json = response.data;
                    callback(json === null || json === void 0 ? void 0 : json.map(function (projeto) { return ({
                        value: projeto.id,
                        label: projeto.nome
                    }); }));
                    return [2 /*return*/];
            }
        });
    }); };
    function getProjetosDefaultOptions() {
        return projetos === null || projetos === void 0 ? void 0 : projetos.map(function (projeto) {
            return {
                label: projeto.nome,
                value: projeto.id
            };
        });
    }
    var loadProjetos = react_1.useCallback(function () { return __awaiter(void 0, void 0, void 0, function () {
        var response, _a, projetos_1, error, message, projetoAtivo;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    setLoading(true);
                    if (!(typeof session !== typeof undefined)) return [3 /*break*/, 2];
                    return [4 /*yield*/, client.get("/projeto")];
                case 1:
                    response = _b.sent();
                    _a = response.data, projetos_1 = _a.projetos, error = _a.error, message = _a.message;
                    projetoAtivo = projetos_1 ? projetos_1.find(function (projeto) { return projeto.active === true; }) : {};
                    setProjetoLocal({
                        label: projetoAtivo === null || projetoAtivo === void 0 ? void 0 : projetoAtivo.nome,
                        value: projetoAtivo === null || projetoAtivo === void 0 ? void 0 : projetoAtivo.id
                    });
                    setSelectedProjeto(projetoAtivo);
                    setProjeto(projetoAtivo);
                    if (error) {
                        console.log(message);
                    }
                    setProjetos(projetos_1);
                    setTimeout(function () {
                        setLoading(false);
                    }, 500);
                    _b.label = 2;
                case 2: return [2 /*return*/];
            }
        });
    }); }, [setLoading, session, client, setProjeto]);
    react_1.useEffect(function () {
        loadProjetos();
    }, [loadProjetos]);
    function deleteProjeto(id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(selectedProjeto === null || selectedProjeto === void 0 ? void 0 : selectedProjeto.active)) return [3 /*break*/, 1];
                        alert_1["default"].warn('Este projeto está ativo, por favor ative outro projeto para poder excluir este!');
                        hideModal();
                        return [3 /*break*/, 3];
                    case 1: return [4 /*yield*/, client["delete"]("/projeto/single/" + id)
                            .then(function (response) {
                            var _a = response.data, error = _a.error, message = _a.message;
                            if (error) {
                                alert_1["default"].error(message);
                            }
                            else {
                                alert_1["default"].success(message);
                            }
                            hideModal();
                            loadProjetos();
                            setProjetoLocal({
                                value: projeto.id,
                                label: projeto.nome
                            });
                        })];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        });
    }
    var selectProjeto = function (data) {
        var selectedProjeto = projetos.find(function (projeto) { return projeto.id === data.value; });
        setSelectedProjeto(selectedProjeto);
        setProjetoLocal(data);
    };
    return (React.createElement("div", null,
        React.createElement("div", { className: "py-6 flex flex-col justify-center sm:py-20 bg-gray-100 my-auto lg:h-[33.3em] h-[24em] p-2" },
            React.createElement("div", { className: "relative py-3 w-full max-w-xl mx-auto h-full" },
                React.createElement("div", { className: 'flex flex-row items-center justify-between border border-gray-400 shadow-lg bg-gray-100 py-4 rounded-t-xl' },
                    React.createElement("div", null,
                        React.createElement(LinkBack_1.LinkBack, { href: "/", className: "flex flex-col relative left-0 ml-4" })),
                    React.createElement("div", null,
                        React.createElement("h1", { className: 'text-xl text-gray-800' }, "Gerenciar Projetos")),
                    React.createElement("div", { className: 'flex items-center justify-center h-8 w-8 mr-4 bg-green-400 rounded-full' },
                        React.createElement(Link_1.Link, { href: "#", className: "", onClick: addModal },
                            React.createElement(outline_1.PlusIcon, { className: "h-6 w-6", "aria-hidden": "true" })))),
                React.createElement("div", { className: "relative p-8 bg-white shadow-sm rounded-b-xl border-x border-b border-gray-400" },
                    React.createElement("div", { className: 'pb-4' },
                        React.createElement(Select_1.Select, { initialData: {
                                label: 'Entre com as iniciais...',
                                value: ''
                            }, selectedValue: projetoLocal, defaultOptions: getProjetosDefaultOptions(), options: loadOptions, label: "Localizar Projeto", callback: selectProjeto })),
                    React.createElement("div", null,
                        React.createElement("span", { className: 'font-semibold' },
                            "Projeto Ativo: ", projeto === null || projeto === void 0 ? void 0 :
                            projeto.nome)),
                    projetoLocal && (React.createElement("div", { className: 'flex flex-row items-center justify-between pt-5' },
                        React.createElement(Link_1.Link, { href: "#", className: "text-center w-auto hover:bg-teal-600 bg-teal-700 text-sm font-medium text-white p-3 rounded-full transition ease duration-200", onClick: editModal },
                            React.createElement("div", { className: 'flex flex-row items-center justify-center space-x-2' },
                                React.createElement(outline_1.PencilIcon, { className: "h-5 w-5" }))),
                        React.createElement(Link_1.Link, { href: "/projeto/" + (selectedProjeto === null || selectedProjeto === void 0 ? void 0 : selectedProjeto.id) + "/users", className: "text-center w-auto hover:bg-indigo-600 bg-indigo-700 text-sm font-medium text-white p-3 rounded-full transition ease duration-200" },
                            React.createElement("div", { className: 'flex flex-row items-center justify-center space-x-2' },
                                React.createElement(outline_1.UsersIcon, { className: "h-5 w-5" }))),
                        React.createElement(Link_1.Link, { href: "/projeto/" + (selectedProjeto === null || selectedProjeto === void 0 ? void 0 : selectedProjeto.id) + "/equacao", className: "text-center w-auto hover:bg-sky-600 bg-sky-700 text-sm font-medium text-white p-3 rounded-full transition ease duration-200" },
                            React.createElement("div", { className: 'flex flex-row items-center justify-center space-x-2' },
                                React.createElement(outline_1.CalculatorIcon, { className: "h-5 w-5" }))),
                        React.createElement(Link_1.Link, { href: "#", className: "text-center w-auto hover:bg-red-600 bg-red-700 text-sm font-medium text-white p-3 rounded-full transition ease duration-200", onClick: deleteSingleModal },
                            React.createElement("div", { className: 'flex flex-row items-center justify-center space-x-2' },
                                React.createElement(outline_1.TrashIcon, { className: "h-5 w-5" }))),
                        React.createElement(Link_1.Link, { href: "/projeto/" + (selectedProjeto === null || selectedProjeto === void 0 ? void 0 : selectedProjeto.id) + "/empresa", className: "text-center w-32 hover:bg-sky-600 bg-sky-700 text-sm font-medium text-white p-3 rounded-full transition ease duration-200" },
                            React.createElement("div", { className: 'flex flex-row items-center justify-center space-x-2' },
                                React.createElement(outline_1.InboxInIcon, { className: "h-5 w-5" }),
                                React.createElement("span", null, "Empresas"))))))))));
};
exports["default"] = Projetos;
