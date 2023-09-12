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
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
var react_1 = require("react");
var Link_1 = require("../Link");
var solid_1 = require("@heroicons/react/solid");
var alert_1 = require("../../services/alert");
var AuthContext_1 = require("../../contexts/AuthContext");
var Select_1 = require("../Select");
var poaSlice_1 = require("../../store/poaSlice");
var hooks_1 = require("../../store/hooks");
var ModalContext_1 = require("contexts/ModalContext");
var styles_1 = require("../Utils/styles");
var ProjetoContext_1 = require("contexts/ProjetoContext");
var Index = function (_a) {
    var currentPoas = _a.currentPoas, onPageChanged = _a.onPageChanged, changeItemsPerPage = _a.changeItemsPerPage, orderBy = _a.orderBy, order = _a.order, currentPage = _a.currentPage, perPage = _a.perPage, loading = _a.loading;
    var _b = react_1.useState(currentPoas), filteredPoas = _b[0], setFilteredPoas = _b[1];
    var client = react_1.useContext(AuthContext_1.AuthContext).client;
    var _c = react_1.useState([]), checkedPoas = _c[0], setCheckedPoas = _c[1];
    var _d = react_1.useState(false), sorted = _d[0], setSorted = _d[1];
    var _e = react_1.useState(), poas = _e[0], setPoas = _e[1];
    var poa = hooks_1.useAppSelector(function (state) { return state.poa; });
    var _f = react_1.useState(), selectedPoa = _f[0], setSelectedPoa = _f[1];
    var dispatch = hooks_1.useAppDispatch();
    var projeto = react_1.useContext(ProjetoContext_1.ProjetoContext).projeto;
    var _g = ModalContext_1.useModalContext(), showModal = _g.showModal, hideModal = _g.hideModal, store = _g.store;
    var visible = store.visible;
    var poaById = function (id) {
        return currentPoas.find(function (poa) { return poa.id === id; });
    };
    var deleteSingleModal = function (id) { var _a; return showModal({ title: 'Deletar POA', onConfirm: function () { deletePoa(id); }, styleButton: styles_1.styles.redButton, iconType: 'warn', confirmBtn: 'Deletar', content: "Tem Certeza que deseja excluir o POA " + ((_a = poaById(id)) === null || _a === void 0 ? void 0 : _a.descricao) + " ?" }); };
    var deleteMultModal = function () { return showModal({ title: 'Deletar POAs', onConfirm: deletePoas, styleButton: styles_1.styles.redButton, iconType: 'warn', confirmBtn: 'Deletar', content: 'Tem certeza que deseja excluir os POAs selecionados' }); };
    var loadPoas = function (inputValue, callback) { return __awaiter(void 0, void 0, void 0, function () {
        var response, data;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, client.get("/poa/search/q?nome=" + inputValue)];
                case 1:
                    response = _a.sent();
                    data = response.data;
                    callback(data === null || data === void 0 ? void 0 : data.map(function (poa) { return ({
                        value: poa.id,
                        label: poa.nome
                    }); }));
                    return [2 /*return*/];
            }
        });
    }); };
    var poaExists = poas === null || poas === void 0 ? void 0 : poas.length;
    var loadPoa = react_1.useCallback(function () {
        if (poa && poaExists > 0) {
            setSelectedPoa({
                value: poa === null || poa === void 0 ? void 0 : poa.id,
                label: poa === null || poa === void 0 ? void 0 : poa.descricao
            });
        }
        else {
            setSelectedPoa({});
        }
    }, [poa, poaExists]);
    react_1.useEffect(function () {
        function defaultOptions() {
            return __awaiter(this, void 0, void 0, function () {
                var response, poas;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, client.get("/poa?orderBy=descricao&order=asc")];
                        case 1:
                            response = _a.sent();
                            poas = response.data.poas;
                            setPoas(poas);
                            if (poas.length === 0) {
                                setSelectedPoa({
                                    value: '0',
                                    label: 'Nenhum POA Cadastrada'
                                });
                            }
                            return [2 /*return*/];
                    }
                });
            });
        }
        loadPoa();
        defaultOptions();
        setFilteredPoas(currentPoas);
    }, [currentPoas, currentPage, client, poa, loadPoa, projeto === null || projeto === void 0 ? void 0 : projeto.id]);
    var selectPoa = function (poa) { return __awaiter(void 0, void 0, void 0, function () {
        var response, poas;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    dispatch(poaSlice_1.setPoa({
                        id: poa.value,
                        descricao: poa.label,
                        data_ultimo_plan: new Date(0),
                        pmfs: ''
                    }));
                    setSelectedPoa(poa);
                    return [4 /*yield*/, client.get("/poa?orderBy=nome&order=asc&umf=" + poa.value)];
                case 1:
                    response = _a.sent();
                    poas = response.data.poas;
                    setFilteredPoas(poas);
                    return [2 /*return*/];
            }
        });
    }); };
    function getPoasDefaultOptions() {
        var data = poas === null || poas === void 0 ? void 0 : poas.map(function (poa, idx) {
            return {
                label: poa.descricao,
                value: poa.id
            };
        });
        return data;
    }
    function deletePoa(id) {
        return __awaiter(this, void 0, void 0, function () {
            var error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, client["delete"]("/poa/single/" + id)
                                .then(function () {
                                alert_1["default"].success('O POA foi deletada com SUCESSO!!!');
                                hideModal();
                            })];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        error_1 = _a.sent();
                        console.log(error_1);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    }
    var handleSearch = function (query) { return __awaiter(void 0, void 0, void 0, function () {
        var paginatedData;
        return __generator(this, function (_a) {
            paginatedData = {
                currentPage: 1,
                perPage: perPage,
                orderBy: orderBy,
                order: order,
                search: query
            };
            onPageChanged(__assign({ poa: poa.id }, paginatedData));
            return [2 /*return*/];
        });
    }); };
    var sortPoas = function () {
        var poas = [];
        poas = filteredPoas.sort(function (a, b) {
            return sorted
                ? a.descricao.toLowerCase().localeCompare(b.descricao.toLowerCase())
                : b.descricao.toLowerCase().localeCompare(a.descricao.toLowerCase());
        });
        setSorted(!sorted);
        setFilteredPoas(poas);
    };
    var handleSelectPoa = function (evt) {
        var poaId = evt.target.value;
        if (!checkedPoas.includes(poaId)) {
            setCheckedPoas(__spreadArrays(checkedPoas, [poaId]));
        }
        else {
            setCheckedPoas(checkedPoas.filter(function (checkedPoaId) {
                return checkedPoaId !== poaId;
            }));
        }
    };
    var handleSelectAllPoas = function () {
        if ((checkedPoas === null || checkedPoas === void 0 ? void 0 : checkedPoas.length) < (currentPoas === null || currentPoas === void 0 ? void 0 : currentPoas.length)) {
            setCheckedPoas(currentPoas.map(function (_a) {
                var id = _a.id;
                return id;
            }));
        }
        else {
            setCheckedPoas([]);
        }
    };
    var deletePoas = function () { return __awaiter(void 0, void 0, void 0, function () {
        var error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, client["delete"]('/poa/multiples', { data: { ids: checkedPoas } })
                            .then(function (response) {
                            setCheckedPoas([]);
                            alert_1["default"].success('As POAs foram deletadas com SUCESSO!!!');
                            hideModal();
                        })];
                case 1:
                    _a.sent();
                    return [3 /*break*/, 3];
                case 2:
                    error_2 = _a.sent();
                    console.log(error_2);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); };
    return (React.createElement("div", null,
        React.createElement("div", { className: "flex flex-row items-center bg-gradient-to-r from-green-600 to-green-400  border-b-2 border-green-600 justify-between p-6 bg-gray-100" },
            React.createElement("h1", { className: "font-medium text-2xl font-roboto text-white" }, "Processamento do POA")),
        loading ? (React.createElement("div", { className: "flex flex-row items-center justify-center h-56" }, "Loading...")) : (React.createElement("div", { className: "flex flex-col p-6" },
            React.createElement("div", { className: "flex flex-col lg:flex-row lg:items-center lg:justify-items-center py-4 bg-gray-100 rounded-lg" },
                React.createElement("div", { className: "lg:flex lg:flex-wrap lg:w-5/12 px-4" },
                    React.createElement("div", { className: "w-3/12 flex items-center" }, "POA: "),
                    React.createElement("div", { className: "w-9/12" },
                        React.createElement(Select_1.Select, { placeholder: 'Selecione o POA...', selectedValue: selectedPoa, defaultOptions: getPoasDefaultOptions(), options: loadPoas, callback: selectPoa, initialData: {
                                label: 'Entre com as iniciais da UMF...', value: 'Entre com as iniciais da UMF...'
                            } })))),
            React.createElement("div", { className: "flex flex-row items-center justify-between overflow-x-auto mt-2" },
                React.createElement("div", { className: "shadow overflow-y-auto border-b border-gray-200 w-full sm:rounded-lg" },
                    checkedPoas.length > 0 && (React.createElement("div", { className: "py-4" },
                        React.createElement("button", { className: "px-4 py-2 bg-red-600 text-white rounded-md", onClick: deleteMultModal }, "Deletar"))),
                    React.createElement("table", { className: "min-w-full divide-y divide-gray-200" },
                        React.createElement("thead", { className: "bg-gray-50" },
                            React.createElement("tr", null,
                                React.createElement("th", { className: "w-1/12" },
                                    React.createElement("div", { className: "flex justify-center" },
                                        React.createElement("input", { checked: (checkedPoas === null || checkedPoas === void 0 ? void 0 : checkedPoas.length) === (currentPoas === null || currentPoas === void 0 ? void 0 : currentPoas.length), onChange: handleSelectAllPoas, className: "form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer", type: "checkbox", value: "", id: "flexCheckDefault" }))),
                                React.createElement("th", { className: "w-4/12", onClick: function () { return sortPoas(); } },
                                    React.createElement("div", { className: "flex flex-row items-center px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer" },
                                        "Descricao",
                                        sorted
                                            ? (React.createElement(solid_1.ChevronUpIcon, { className: "w-5 h-5" }))
                                            : (React.createElement(solid_1.ChevronDownIcon, { className: "w-5 h-5" })))),
                                React.createElement("th", { scope: "col", className: "w-2/12 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" },
                                    "Situa\u00E7\u00E3o",
                                    sorted
                                        ? (React.createElement(solid_1.ChevronUpIcon, { className: "w-5 h-5" }))
                                        : (React.createElement(solid_1.ChevronDownIcon, { className: "w-5 h-5" }))),
                                React.createElement("th", { scope: "col", className: "w-2/12 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" },
                                    "Data \u00DAltimo Planejamento",
                                    sorted
                                        ? (React.createElement(solid_1.ChevronUpIcon, { className: "w-5 h-5" }))
                                        : (React.createElement(solid_1.ChevronDownIcon, { className: "w-5 h-5" }))),
                                React.createElement("th", { scope: "col", className: "relative w-1/12 px-6 py-3" },
                                    React.createElement("span", { className: "sr-only" }, "Edit")))),
                        React.createElement("tbody", { className: "bg-white divide-y divide-gray-200" }, filteredPoas === null || filteredPoas === void 0 ? void 0 : filteredPoas.map(function (poa) { return (React.createElement("tr", { key: poa.id },
                            React.createElement("td", { className: "flex justify-center" },
                                React.createElement("input", { value: poa === null || poa === void 0 ? void 0 : poa.id, checked: checkedPoas.includes(poa === null || poa === void 0 ? void 0 : poa.id), onChange: handleSelectPoa, id: "poaId", type: "checkbox", className: "form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" })),
                            React.createElement("td", { className: "px-3 py-2 whitespace-nowrap" },
                                React.createElement("div", { className: "flex flex-col items-starter" },
                                    React.createElement("div", { className: "text-sm font-medium text-gray-900" }, poa === null || poa === void 0 ? void 0 : poa.situacao_poa.nome))),
                            React.createElement("td", { className: "px-3 py-2 whitespace-nowrap" },
                                React.createElement("div", { className: "text-sm text-gray-900" }, poa === null || poa === void 0 ? void 0 : poa.data_ultimo_plan.toString())),
                            React.createElement("td", { className: "px-6 py-4 whitespace-nowrap text-right text-sm font-medium flex flex-row items-center" },
                                React.createElement(Link_1.Link, { href: "/poa/update/" + poa.id },
                                    React.createElement(solid_1.PencilIcon, { className: "w-5 h-5 ml-4 -mr-1 text-green-600 hover:text-green-700" })),
                                React.createElement(Link_1.Link, { href: "#", onClick: function () { return deleteSingleModal(poa.id); } },
                                    React.createElement(solid_1.TrashIcon, { className: "w-5 h-5 ml-4 -mr-1 text-red-600 hover:text-red-700" }))))); })))))))));
};
exports["default"] = Index;
