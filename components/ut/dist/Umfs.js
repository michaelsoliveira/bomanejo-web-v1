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
var input_1 = require("../atoms/input");
var solid_1 = require("@heroicons/react/solid");
var alert_1 = require("../../services/alert");
var Modal_1 = require("../Modal");
var AuthContext_1 = require("../../contexts/AuthContext");
var Umfs = function (_a) {
    var currentUmfs = _a.currentUmfs, onPageChanged = _a.onPageChanged, changeItemsPerPage = _a.changeItemsPerPage, orderBy = _a.orderBy, order = _a.order, currentPage = _a.currentPage, perPage = _a.perPage, loading = _a.loading, loadUmfs = _a.loadUmfs;
    var _b = react_1.useState(currentUmfs), filteredUmf = _b[0], setFilteredUmf = _b[1];
    var _c = react_1.useState(), selectedUmf = _c[0], setSelectedUmf = _c[1];
    var _d = react_1.useState(false), uploading = _d[0], setUploading = _d[1];
    var _e = react_1.useState(false), removeSingleModal = _e[0], setOpenSingleModal = _e[1];
    var _f = react_1.useState(false), removeMultipleModal = _f[0], setOpenMultipleModal = _f[1];
    var client = react_1.useContext(AuthContext_1.AuthContext).client;
    var _g = react_1.useState([]), checkedUmfs = _g[0], setCheckedUmfs = _g[1];
    var _h = react_1.useState(false), sorted = _h[0], setSorted = _h[1];
    react_1.useEffect(function () {
        setFilteredUmf(currentUmfs);
    }, [currentUmfs, currentPage]);
    function toogleDeleteModal(id) {
        if (id) {
            var umf = currentUmfs.find(function (umf) { return umf.id === id; });
            setSelectedUmf(umf);
        }
        setOpenSingleModal(true);
    }
    function deleteUmf(id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                try {
                    client["delete"]("/umf/single/" + id)
                        .then(function () {
                        alert_1["default"].success('A UMF foi deletada com SUCESSO!!!');
                        loadUmfs();
                        setOpenSingleModal(false);
                    });
                }
                catch (error) {
                    console.log(error);
                }
                return [2 /*return*/];
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
            onPageChanged(paginatedData);
            return [2 /*return*/];
        });
    }); };
    var sortUmfs = function () {
        var sortedUmfs = [];
        sortedUmfs = filteredUmf.sort(function (a, b) {
            return sorted
                ? a.nome.toLowerCase().localeCompare(b.nome.toLowerCase())
                : b.nome.toLowerCase().localeCompare(a.nome.toLowerCase());
        });
        setSorted(!sorted);
        setFilteredUmf(sortedUmfs);
    };
    var handleSelectUmf = function (evt) {
        var umfId = evt.target.value;
        if (!checkedUmfs.includes(umfId)) {
            setCheckedUmfs(__spreadArrays(checkedUmfs, [umfId]));
        }
        else {
            setCheckedUmfs(checkedUmfs.filter(function (checkedUmfId) {
                return checkedUmfId !== umfId;
            }));
        }
    };
    var handleSelectAllUmfs = function () {
        if ((checkedUmfs === null || checkedUmfs === void 0 ? void 0 : checkedUmfs.length) < (currentUmfs === null || currentUmfs === void 0 ? void 0 : currentUmfs.length)) {
            setCheckedUmfs(currentUmfs.map(function (_a) {
                var id = _a.id;
                return id;
            }));
        }
        else {
            setCheckedUmfs([]);
        }
    };
    var deleteUmfs = function () { return __awaiter(void 0, void 0, void 0, function () {
        var error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, client["delete"]('/umf/multiples', { data: { ids: checkedUmfs } })
                            .then(function (response) {
                            setCheckedUmfs([]);
                            alert_1["default"].success('As UMFs foram deletadas com SUCESSO!!!');
                            loadUmfs();
                            setOpenMultipleModal(false);
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
    }); };
    return (React.createElement("div", null,
        React.createElement("div", { className: "flex flex-row items-center justify-between p-6 bg-gray-100" },
            React.createElement("h1", { className: "font-medium text-2xl font-roboto" }, "Unidade de Manejo Florestal"),
            React.createElement(Link_1.Link, { href: '/umf/add', className: "px-6 py-2 text-white bg-green-700 hover:bg-green-800 rounded-md hover:cursor-pointer" }, "Adicionar")),
        loading ? (React.createElement("div", { className: "flex flex-row items-center justify-center h-56" }, "Loading...")) : (React.createElement("div", { className: "flex flex-col p-6" },
            React.createElement("div", { className: "flex flex-col lg:flex-row lg:items-center lg:justify-items-center py-4 bg-gray-100 rounded-lg" },
                React.createElement("div", { className: "flex flex-row w-2/12 px-2 items-center justify-between" },
                    React.createElement("div", { className: "w-full" },
                        React.createElement("label", { htmlFor: "perPage", className: "px-1 block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400" }, "por P\u00E1gina")),
                    React.createElement("select", { value: perPage, onChange: function (evt) { return changeItemsPerPage(evt.target.value); }, id: "perPage", className: "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" },
                        React.createElement("option", { value: "10" }, "10"),
                        React.createElement("option", { value: "20" }, "20"),
                        React.createElement("option", { value: "50" }, "50"),
                        React.createElement("option", { value: "100" }, "100"))),
                React.createElement("div", { className: "w-60 px-4" }, "Pesquisar UMF:"),
                React.createElement("div", { className: "w-full px-4" },
                    React.createElement(input_1.Input, { label: "Pesquisar UMF", id: "search", name: "search", onChange: function (e) { return handleSearch(e.target.value); }, className: 'transition-colors focus:outline-none focus:ring-2 focus:ring-opacity-50' }))),
            React.createElement("div", { className: "flex flex-row items-center justify-between overflow-x-auto mt-2" },
                React.createElement("div", { className: "shadow overflow-y-auto border-b border-gray-200 w-full sm:rounded-lg" },
                    checkedUmfs.length > 0 && (React.createElement("div", { className: "py-4" },
                        React.createElement("button", { className: "px-4 py-2 bg-red-600 text-white rounded-md", onClick: function () { return setOpenMultipleModal(true); } }, "Deletar"))),
                    React.createElement("table", { className: "min-w-full divide-y divide-gray-200" },
                        React.createElement("thead", { className: "bg-gray-50" },
                            React.createElement("tr", null,
                                React.createElement("th", null,
                                    React.createElement("div", { className: "flex justify-center" },
                                        React.createElement("input", { checked: (checkedUmfs === null || checkedUmfs === void 0 ? void 0 : checkedUmfs.length) === (currentUmfs === null || currentUmfs === void 0 ? void 0 : currentUmfs.length), onChange: handleSelectAllUmfs, className: "form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer", type: "checkbox", value: "", id: "flexCheckDefault" }))),
                                React.createElement("th", { className: "w-3/12", onClick: function () { return sortUmfs(); } },
                                    React.createElement("div", { className: "flex flex-row items-center px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer" },
                                        "Nome",
                                        sorted
                                            ? (React.createElement(solid_1.ChevronUpIcon, { className: "w-5 h-5" }))
                                            : (React.createElement(solid_1.ChevronDownIcon, { className: "w-5 h-5" })))),
                                React.createElement("th", { scope: "col", className: "w-3/12 px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" }, "Munic\u00EDpio"),
                                React.createElement("th", { scope: "col", className: "w-3/12 px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" }, "Endere\u00E7o"),
                                React.createElement("th", { scope: "col", className: "w-1/12 px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" }, "Estado"),
                                React.createElement("th", { scope: "col", className: "relative w-1/12 px-6 py-3" },
                                    React.createElement("span", { className: "sr-only" }, "Edit")))),
                        React.createElement("tbody", { className: "bg-white divide-y divide-gray-200" }, filteredUmf === null || filteredUmf === void 0 ? void 0 : filteredUmf.map(function (umf) {
                            var _a;
                            return (React.createElement("tr", { key: umf.id },
                                React.createElement("td", { className: "flex justify-center" },
                                    React.createElement("input", { value: umf === null || umf === void 0 ? void 0 : umf.id, checked: checkedUmfs.includes(umf === null || umf === void 0 ? void 0 : umf.id), onChange: handleSelectUmf, id: "umfId", type: "checkbox", className: "form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" })),
                                React.createElement("td", { className: "px-3 py-2 whitespace-nowrap" },
                                    React.createElement("div", { className: "flex flex-col items-starter" },
                                        React.createElement("div", { className: "text-sm font-medium text-gray-900" }, umf === null || umf === void 0 ? void 0 : umf.nome))),
                                React.createElement("td", { className: "px-3 py-2 whitespace-nowrap" },
                                    React.createElement("div", { className: "text-sm text-gray-900" }, umf === null || umf === void 0 ? void 0 : umf.municipio)),
                                React.createElement("td", { className: "px-3 py-2 whitespace-nowrap" },
                                    React.createElement("span", { className: "text-sm font-medium text-gray-900" },
                                        React.createElement("div", { className: "text-sm text-gray-500" }, umf === null || umf === void 0 ? void 0 : umf.localizacao))),
                                React.createElement("td", { className: "px-3 py-2 whitespace-nowrap" },
                                    React.createElement("span", { className: "text-sm font-medium text-gray-900" },
                                        React.createElement("div", { className: "text-sm text-gray-500" }, (_a = umf === null || umf === void 0 ? void 0 : umf.estado) === null || _a === void 0 ? void 0 : _a.uf))),
                                React.createElement("td", { className: "px-6 py-4 whitespace-nowrap text-right text-sm font-medium flex flex-row items-center" },
                                    React.createElement(Link_1.Link, { href: "/umf/update/" + umf.id },
                                        React.createElement(solid_1.PencilIcon, { className: "w-5 h-5 ml-4 -mr-1 text-green-600 hover:text-green-700" })),
                                    React.createElement(Link_1.Link, { href: "#", onClick: function () { return toogleDeleteModal(umf.id); } },
                                        React.createElement(solid_1.TrashIcon, { className: "w-5 h-5 ml-4 -mr-1 text-red-600 hover:text-red-700" })))));
                        }))))),
            removeSingleModal &&
                React.createElement(Modal_1["default"], { className: "w-full", styleButton: "bg-red-600 hover:bg-red-700 focus:ring-red-500", title: "Deletar UMF", buttonText: "Deletar", bodyText: "Tem certeza que seja excluir a UMF " + (selectedUmf === null || selectedUmf === void 0 ? void 0 : selectedUmf.nome) + "?", data: selectedUmf, parentFunction: deleteUmf, hideModal: function () { return setOpenSingleModal(false); }, open: removeSingleModal }),
            removeMultipleModal &&
                React.createElement(Modal_1["default"], { className: "w-full", styleButton: "bg-red-600 hover:bg-red-700 focus:ring-red-500", title: "Deletar UMFs", buttonText: "Deletar", bodyText: "Tem certeza que seja excluir as " + (checkedUmfs === null || checkedUmfs === void 0 ? void 0 : checkedUmfs.length) + " UMFs selecionados?", data: checkedUmfs, parentFunction: deleteUmfs, hideModal: function () { return setOpenMultipleModal(false); }, open: removeMultipleModal })))));
};
exports["default"] = Umfs;
