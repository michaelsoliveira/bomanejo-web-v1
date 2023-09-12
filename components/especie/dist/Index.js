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
var AuthContext_1 = require("../../contexts/AuthContext");
var ModalContext_1 = require("contexts/ModalContext");
var LoadingContext_1 = require("contexts/LoadingContext");
var create_csv_1 = require("services/create-csv");
var ProjetoContext_1 = require("contexts/ProjetoContext");
var react_papaparse_1 = require("react-papaparse");
var ImportModal_1 = require("./ImportModal");
var styles_1 = require("../Utils/styles");
var Index = function (_a) {
    var currentEspecies = _a.currentEspecies, onPageChanged = _a.onPageChanged, orderBy = _a.orderBy, order = _a.order, changeItemsPerPage = _a.changeItemsPerPage, currentPage = _a.currentPage, perPage = _a.perPage, loadEspecies = _a.loadEspecies;
    var _b = react_1.useState(currentEspecies), filteredEspecies = _b[0], setFilteredEspecies = _b[1];
    var _c = react_1.useState(), selectedEspecie = _c[0], setSelectedEspecie = _c[1];
    var _d = react_1.useState(""), searchInput = _d[0], setSearchInput = _d[1];
    var _e = react_1.useState(false), uploading = _e[0], setUploading = _e[1];
    var client = react_1.useContext(AuthContext_1.AuthContext).client;
    var fileRef = react_1.useRef(null);
    var _f = react_1.useState(false), sorted = _f[0], setSorted = _f[1];
    var _g = react_1.useState([]), checkedEspecies = _g[0], setCheckedEspecies = _g[1];
    var _h = ModalContext_1.useModalContext(), showModal = _h.showModal, hideModal = _h.hideModal, store = _h.store;
    var visible = store.visible;
    var setLoading = react_1.useContext(LoadingContext_1.LoadingContext).setLoading;
    var projeto = react_1.useContext(ProjetoContext_1.ProjetoContext).projeto;
    var CSVReader = react_papaparse_1.useCSVReader().CSVReader;
    var _j = react_1.useState('iso-8859-1'), encoding = _j[0], setEncoding = _j[1];
    var submitImport = react_1.useRef(null);
    var styles = {
        csvReader: {
            display: 'flex',
            flexDirection: 'row',
            marginBottom: 10
        },
        progressBarBackgroundColor: {
            backgroundColor: 'green'
        }
    };
    var styleDelBtn = 'bg-red-600 hover:bg-red-700 focus:ring-red-500';
    var especieById = react_1.useCallback(function (id) {
        return currentEspecies.find(function (especie) { return especie.id === id; });
    }, [currentEspecies]);
    var callBackImport = function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            submitImport.current.click();
            return [2 /*return*/];
        });
    }); };
    var importModal = function () {
        showModal({
            title: 'Importar Espécies',
            size: 'max-w-4xl',
            type: 'submit', hookForm: 'hook-form', styleButton: styles_1.styles.greenButton, confirmBtn: 'Importar Espécies',
            onConfirm: callBackImport,
            content: React.createElement("div", null,
                React.createElement(ImportModal_1["default"], { loadEspecies: loadEspecies, ref: submitImport }))
        });
    };
    var deleteEspecie = react_1.useCallback(function (id) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            try {
                client["delete"]("/especie/single/" + id)
                    .then(function (response) {
                    var _a = response.data, error = _a.error, message = _a.message;
                    if (!error) {
                        alert_1["default"].success(message);
                        loadEspecies();
                        hideModal();
                    }
                });
            }
            catch (error) {
                console.log(error);
            }
            return [2 /*return*/];
        });
    }); }, [client, hideModal, loadEspecies]);
    var deleteSingleModal = react_1.useCallback(function (id) {
        var especie = especieById(id);
        showModal({ title: 'Deletar Espécie', onConfirm: function () { deleteEspecie(id); }, styleButton: styleDelBtn, iconType: 'warn', confirmBtn: 'Deletar', content: "Tem certeza que deseja excluir a Esp\u00E9cie " + (especie === null || especie === void 0 ? void 0 : especie.nome) + "?" });
    }, [especieById, showModal, deleteEspecie]);
    var deleteMultModal = function () { return showModal({ title: 'Deletar Espécies', onConfirm: deleteEspecies, styleButton: styleDelBtn, iconType: 'warn', confirmBtn: 'Deletar', content: 'Tem certeza que deseja excluir Todas as Espécies Selecionadas?' }); };
    react_1.useEffect(function () {
        setFilteredEspecies(currentEspecies);
    }, [currentEspecies]);
    var deleteEspecies = function () { return __awaiter(void 0, void 0, void 0, function () {
        var error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    setLoading(true);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, client["delete"]('/especie/multiples', { data: { ids: checkedEspecies } })
                            .then(function () {
                            setCheckedEspecies([]);
                            alert_1["default"].success('As espécies foram deletadas com SUCESSO!!!');
                            loadEspecies();
                            hideModal();
                        })];
                case 2:
                    _a.sent();
                    setLoading(false);
                    return [3 /*break*/, 4];
                case 3:
                    error_1 = _a.sent();
                    console.log(error_1);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); };
    var handleImportTemplate = function () { return __awaiter(void 0, void 0, void 0, function () {
        var data;
        return __generator(this, function (_a) {
            data = [
                { nome: 'Teste1', nome_vulgar: 'Teste1', nome_cientifico: 'Teste1' },
                { nome: 'Teste2', nome_vulgar: 'Teste2', nome_cientifico: 'Teste2' },
                { nome: 'Teste3', nome_vulgar: 'Teste3', nome_cientifico: 'Teste3' }
            ];
            create_csv_1.CsvDataService.exportToCsv('template_especie', data);
            return [2 /*return*/];
        });
    }); };
    var handleFocusBack = function () {
        setUploading(false);
        window.removeEventListener('focus', handleFocusBack);
    };
    var handleSearch = function (evt) { return __awaiter(void 0, void 0, void 0, function () {
        var paginatedData;
        return __generator(this, function (_a) {
            paginatedData = {
                currentPage: 1,
                perPage: perPage,
                orderBy: orderBy,
                order: order,
                search: evt.target.value
            };
            setSearchInput(evt.target.value);
            onPageChanged(paginatedData);
            return [2 /*return*/];
        });
    }); };
    var sortEspecies = function (sortBy) {
        var sortedBy = sortBy.split(".");
        var nElements = sortedBy.length;
        var sortedEspecies = [];
        sortedEspecies = filteredEspecies.sort(function (a, b) {
            return sorted
                ? nElements > 1
                    ? a[sortedBy[0]][sortedBy[1]].toLowerCase().localeCompare(b[sortedBy[0]][sortedBy[1]].toLowerCase())
                    : a[sortBy].toLowerCase().localeCompare(b[sortBy].toLowerCase())
                : nElements > 1
                    ? b[sortedBy[0]][sortedBy[1]].toLowerCase().localeCompare(a[sortedBy[0]][sortedBy[1]].toLowerCase())
                    : b[sortBy].toLowerCase().localeCompare(a[sortBy].toLowerCase());
        });
        setSorted(!sorted);
        setFilteredEspecies(sortedEspecies);
    };
    var handleSelectEspecie = function (evt) {
        var especieId = evt.target.value;
        if (!checkedEspecies.includes(especieId)) {
            setCheckedEspecies(__spreadArrays(checkedEspecies, [especieId]));
        }
        else {
            setCheckedEspecies(checkedEspecies.filter(function (checkedEspecieId) {
                return checkedEspecieId !== especieId;
            }));
        }
    };
    var handleSelectAllEspecies = function () {
        if (checkedEspecies.length < currentEspecies.length) {
            setCheckedEspecies(currentEspecies.map(function (_a) {
                var id = _a.id;
                return id;
            }));
        }
        else {
            setCheckedEspecies([]);
        }
    };
    return (React.createElement("div", null,
        React.createElement("div", { className: "flex flex-col lg:flex-row items-center justify-between p-6 bg-gray-100" },
            React.createElement("h1", { className: "font-medium text-2xl font-roboto" }, "Esp\u00E9cies"),
            React.createElement("div", { className: "flex flex-row justify-center items-center" },
                React.createElement("div", null,
                    React.createElement("a", { onClick: handleImportTemplate, className: "bg-indigo hover:bg-indigo-dark text-green-700 font-bold py-2 px-4 w-full inline-flex items-center hover:cursor-pointer" },
                        React.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", strokeWidth: "1.5", stroke: "currentColor", className: "w-6 h-6" },
                            React.createElement("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m.75 12l3 3m0 0l3-3m-3 3v-6m-1.5-9H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" })),
                        React.createElement("span", { className: "ml-2" }, "Modelo"))),
                React.createElement("div", { className: "px-4" },
                    React.createElement("a", { onClick: importModal, className: "px-6 py-2 text-white bg-green-700 hover:bg-green-800 rounded-md hover:cursor-pointer" }, "Importar")),
                React.createElement("div", null,
                    React.createElement(Link_1.Link, { href: '/especie/add', className: "px-6 py-2 text-white bg-green-700 hover:bg-green-800 rounded-md hover:cursor-pointer" }, "Adicionar")))),
        React.createElement("div", { className: "flex flex-col p-6" },
            React.createElement("div", { className: "flex flex-col lg:flex-row lg:items-center lg:justify-items-center py-4 bg-gray-100 rounded-lg" },
                React.createElement("div", { className: "flex flex-row w-2/12 px-2 items-center justify-between" },
                    React.createElement("div", { className: "w-full" },
                        React.createElement("label", { htmlFor: "perPage", className: "px-1 block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400" }, "por P\u00E1gina")),
                    React.createElement("select", { value: perPage, onChange: changeItemsPerPage, id: "perPage", className: "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" },
                        React.createElement("option", { value: "10" }, "10"),
                        React.createElement("option", { value: "20" }, "20"),
                        React.createElement("option", { value: "50" }, "50"),
                        React.createElement("option", { value: "100" }, "100"))),
                React.createElement("div", { className: "w-60 px-4" }, "Pesquisar Esp\u00E9cie:"),
                React.createElement("div", { className: "w-full px-4" },
                    React.createElement(input_1.Input, { label: "Pesquisar Esp\u00E9cie", id: "search", name: "search", value: searchInput, onChange: handleSearch, autoFocus: true, className: 'transition-colors focus:outline-none focus:ring-2 focus:ring-opacity-50' }))),
            React.createElement("div", { className: "flex flex-row items-center justify-between overflow-x-auto mt-2" },
                React.createElement("div", { className: "shadow overflow-y-auto border-b border-gray-200 w-full sm:rounded-lg" },
                    (checkedEspecies === null || checkedEspecies === void 0 ? void 0 : checkedEspecies.length) > 0 && (React.createElement("div", { className: "py-4" },
                        React.createElement("button", { className: "px-4 py-2 bg-red-600 text-white rounded-md", onClick: deleteMultModal }, "Deletar"))),
                    React.createElement("table", { className: "min-w-full divide-y divide-gray-200" },
                        React.createElement("thead", { className: "bg-gray-50 w-full" },
                            React.createElement("tr", null,
                                React.createElement("th", null,
                                    React.createElement("div", { className: "flex justify-center" },
                                        React.createElement("input", { checked: (checkedEspecies === null || checkedEspecies === void 0 ? void 0 : checkedEspecies.length) === (currentEspecies === null || currentEspecies === void 0 ? void 0 : currentEspecies.length), onChange: handleSelectAllEspecies, className: "form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer", type: "checkbox", value: "", id: "flexCheckDefault" }))),
                                React.createElement("th", { scope: "col", className: "justify-between items-center px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer", onClick: function () { return sortEspecies('nome'); } },
                                    React.createElement("div", { className: "flex flex-row w-full justify-between" },
                                        "Nome",
                                        sorted
                                            ? (React.createElement(solid_1.ChevronUpIcon, { className: "w-5 h-5" }))
                                            : (React.createElement(solid_1.ChevronDownIcon, { className: "w-5 h-5" })))),
                                React.createElement("th", { scope: "row", className: "justify-between px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer", onClick: function () { return sortEspecies('nome_orgao'); } },
                                    React.createElement("div", { className: "flex flex-row w-full justify-between" },
                                        "Nome Vulgar",
                                        sorted
                                            ? (React.createElement(solid_1.ChevronUpIcon, { className: "w-5 h-5" }))
                                            : (React.createElement(solid_1.ChevronDownIcon, { className: "w-5 h-5" })))),
                                React.createElement("th", { scope: "col", className: "px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer", onClick: function () { return sortEspecies('nome_cientifico'); } },
                                    React.createElement("div", { className: "flex flex-row w-full justify-between" },
                                        "Nome Cient\u00EDfico",
                                        sorted
                                            ? (React.createElement(solid_1.ChevronUpIcon, { className: "w-5 h-5" }))
                                            : (React.createElement(solid_1.ChevronDownIcon, { className: "w-5 h-5" })))),
                                React.createElement("th", { scope: "col", className: "flex flex-row items-center w-auto px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer", onClick: function () { return sortEspecies('categoria_especie.nome'); } },
                                    React.createElement("div", { className: "flex flex-row w-full justify-between" },
                                        "Categoria",
                                        sorted
                                            ? (React.createElement(solid_1.ChevronUpIcon, { className: "w-5 h-5" }))
                                            : (React.createElement(solid_1.ChevronDownIcon, { className: "w-5 h-5" })))),
                                React.createElement("th", { scope: "col", className: "relative w-1/12 px-6 py-3" },
                                    React.createElement("span", { className: "sr-only" }, "Edit")))),
                        React.createElement("tbody", { className: "bg-white divide-y divide-gray-200" }, currentEspecies === null || currentEspecies === void 0 ? void 0 : currentEspecies.map(function (especie) {
                            var _a, _b;
                            return (React.createElement("tr", { key: especie.id },
                                React.createElement("td", { className: "flex justify-center" },
                                    React.createElement("input", { value: especie === null || especie === void 0 ? void 0 : especie.id, checked: checkedEspecies.includes(especie === null || especie === void 0 ? void 0 : especie.id), onChange: handleSelectEspecie, id: "especieId", type: "checkbox", className: "form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" })),
                                React.createElement("td", { className: "px-3 py-2 whitespace-nowrap" },
                                    React.createElement("div", { className: "flex flex-col items-starter" },
                                        React.createElement("div", { className: "text-sm font-medium text-gray-900" }, especie === null || especie === void 0 ? void 0 : especie.nome))),
                                React.createElement("td", { className: "px-3 py-2 whitespace-nowrap" },
                                    React.createElement("div", { className: "text-sm text-gray-900" }, especie.nome_orgao)),
                                React.createElement("td", { className: "px-3 py-2 whitespace-nowrap" },
                                    React.createElement("span", { className: "text-sm font-medium text-gray-900" },
                                        React.createElement("div", { className: "text-sm text-gray-500" }, especie.nome_cientifico))),
                                React.createElement("td", { className: "px-3 py-2 whitespace-nowrap" },
                                    React.createElement("span", { className: "text-sm font-medium text-gray-900" },
                                        React.createElement("div", { className: "text-sm text-gray-500" }, (_b = (_a = especie === null || especie === void 0 ? void 0 : especie.categoria_especie[0]) === null || _a === void 0 ? void 0 : _a.categoria) === null || _b === void 0 ? void 0 : _b.nome))),
                                React.createElement("td", { className: "px-6 py-4 whitespace-nowrap text-right text-sm font-medium flex flex-row items-center" },
                                    React.createElement(Link_1.Link, { href: "/especie/update/" + especie.id },
                                        React.createElement(solid_1.PencilIcon, { className: "w-5 h-5 ml-4 -mr-1 text-green-600 hover:text-green-700" })),
                                    React.createElement(Link_1.Link, { href: "#", onClick: function () { return deleteSingleModal(especie.id); } },
                                        React.createElement(solid_1.TrashIcon, { className: "w-5 h-5 ml-4 -mr-1 text-red-600 hover:text-red-700" })))));
                        }))))))));
};
exports["default"] = Index;
