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
var AuthContext_1 = require("../../contexts/AuthContext");
var ModalContext_1 = require("contexts/ModalContext");
var LoadingContext_1 = require("contexts/LoadingContext");
var create_csv_1 = require("services/create-csv");
var hooks_1 = require("store/hooks");
var Select_1 = require("../Select");
var ProjetoContext_1 = require("contexts/ProjetoContext");
var umfSlice_1 = require("../../store/umfSlice");
var upaSlice_1 = require("../../store/upaSlice");
var alert_1 = require("../../services/alert");
var react_papaparse_1 = require("react-papaparse");
var Table_1 = require("../Table");
var Button_1 = require("../Utils/Button");
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
var Index = function () {
    var _a = react_1.useState(false), uploading = _a[0], setUploading = _a[1];
    var client = react_1.useContext(AuthContext_1.AuthContext).client;
    var _b = ModalContext_1.useModalContext(), showModal = _b.showModal, hideModal = _b.hideModal, store = _b.store;
    var visible = store.visible;
    var setLoading = react_1.useContext(LoadingContext_1.LoadingContext).setLoading;
    var _c = react_1.useState(), umfs = _c[0], setUmfs = _c[1];
    var _d = react_1.useState(), upas = _d[0], setUpas = _d[1];
    var umf = hooks_1.useAppSelector(function (state) { return state.umf; });
    var upa = hooks_1.useAppSelector(function (state) { return state.upa; });
    var ut = hooks_1.useAppSelector(function (state) { return state.ut; });
    var _e = react_1.useState(), selectedUmf = _e[0], setSelectedUmf = _e[1];
    var _f = react_1.useState(), selectedUpa = _f[0], setSelectedUpa = _f[1];
    var _g = react_1.useState(), selectedUt = _g[0], setSelectedUt = _g[1];
    var projeto = react_1.useContext(ProjetoContext_1.ProjetoContext).projeto;
    var _h = react_1.useState([]), columnData = _h[0], setColumnData = _h[1];
    var _j = react_1.useState([]), rowData = _j[0], setRowData = _j[1];
    var _k = react_1.useState('iso-8859-1'), encoding = _k[0], setEncoding = _k[1];
    var CSVReader = react_papaparse_1.useCSVReader().CSVReader;
    var dispatch = hooks_1.useAppDispatch();
    var columns = react_1.useMemo(function () { return columnData; }, [columnData]);
    var data = react_1.useMemo(function () { return rowData; }, [rowData]);
    var styleDelBtn = 'bg-red-600 hover:bg-red-700 focus:ring-red-500';
    var loadUpas = function (inputValue, callback) { return __awaiter(void 0, void 0, void 0, function () {
        var response, data;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, client.get("/upa/search/q?descricao=" + inputValue)];
                case 1:
                    response = _a.sent();
                    data = response.data;
                    callback(data === null || data === void 0 ? void 0 : data.map(function (upa) { return ({
                        value: upa.id,
                        label: upa.descricao
                    }); }));
                    return [2 /*return*/];
            }
        });
    }); };
    var loadUmfs = function (inputValue, callback) { return __awaiter(void 0, void 0, void 0, function () {
        var response, data;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, client.get("/umf/search/q?nome=" + inputValue)];
                case 1:
                    response = _a.sent();
                    data = response.data;
                    callback(data === null || data === void 0 ? void 0 : data.map(function (umf) { return ({
                        value: umf.id,
                        label: umf.nome
                    }); }));
                    return [2 /*return*/];
            }
        });
    }); };
    var defaultUmfsOptions = react_1.useCallback(function () { return __awaiter(void 0, void 0, void 0, function () {
        var response, umfs, compareUmf;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, client.get("/umf/find-by-projeto/" + (projeto === null || projeto === void 0 ? void 0 : projeto.id) + "?orderBy=nome&order=asc")];
                case 1:
                    response = _a.sent();
                    umfs = response.data.umfs;
                    setUmfs(umfs);
                    compareUmf = umfs ? umfs.find(function (u) { return u.id === umf.id; }) : null;
                    if (compareUmf) {
                        setSelectedUmf({
                            value: umf === null || umf === void 0 ? void 0 : umf.id,
                            label: umf === null || umf === void 0 ? void 0 : umf.nome
                        });
                    }
                    if (umfs.length === 0) {
                        setSelectedUmf({
                            value: '0',
                            label: 'Nenhuma UMF Cadastrada'
                        });
                    }
                    return [2 /*return*/];
            }
        });
    }); }, [client, projeto === null || projeto === void 0 ? void 0 : projeto.id, umf.id, umf === null || umf === void 0 ? void 0 : umf.nome]);
    var defaultUpasOptions = react_1.useCallback(function () { return __awaiter(void 0, void 0, void 0, function () {
        var response, upas, compareUpa;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, client.get("/upa?orderBy=descricao&order=asc&umf=" + (umf === null || umf === void 0 ? void 0 : umf.id))];
                case 1:
                    response = _a.sent();
                    upas = response.data.upas;
                    setUpas(upas);
                    if (upas.length === 0) {
                        setSelectedUpa({
                            value: '0',
                            label: 'Nenhuma UPA Cadastrada'
                        });
                    }
                    compareUpa = upas ? upas.find(function (u) { return u.id === upa.id; }) : null;
                    if (compareUpa) {
                        setSelectedUpa({
                            value: upa === null || upa === void 0 ? void 0 : upa.id,
                            label: upa === null || upa === void 0 ? void 0 : upa.descricao
                        });
                    }
                    return [2 /*return*/];
            }
        });
    }); }, [client, umf === null || umf === void 0 ? void 0 : umf.id, upa === null || upa === void 0 ? void 0 : upa.descricao, upa.id]);
    var selectUmf = function (umf) { return __awaiter(void 0, void 0, void 0, function () {
        var response, upas;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    dispatch(umfSlice_1.setUmf({
                        id: umf.value,
                        nome: umf.label
                    }));
                    setSelectedUmf(umf);
                    return [4 /*yield*/, client.get("/upa?orderBy=descricao&order=asc&umf=" + umf.value)];
                case 1:
                    response = _a.sent();
                    upas = response.data.upas;
                    setUpas(upas);
                    return [2 /*return*/];
            }
        });
    }); };
    var selectUpa = function (upa) { return __awaiter(void 0, void 0, void 0, function () {
        var upaSelected;
        return __generator(this, function (_a) {
            upaSelected = upas.find(function (u) { return u.id === upa.value; });
            dispatch(upaSlice_1.setUpa({
                id: upaSelected.id,
                descricao: upaSelected.descricao,
                tipo: Number.parseInt(upaSelected.tipo)
            }));
            setSelectedUpa(upa);
            return [2 /*return*/];
        });
    }); };
    function getUmfsDefaultOptions() {
        return umfs === null || umfs === void 0 ? void 0 : umfs.map(function (umf) {
            return {
                label: umf.nome,
                value: umf.id
            };
        });
    }
    function getUpasDefaultOptions() {
        return upas === null || upas === void 0 ? void 0 : upas.map(function (upa) {
            return {
                label: upa.descricao,
                value: upa.id
            };
        });
    }
    var deleteArvore = react_1.useCallback(function (id) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            try {
            }
            catch (error) {
                console.log(error);
            }
            return [2 /*return*/];
        });
    }); }, []);
    var deleteSingleModal = react_1.useCallback(function (id) {
        showModal({ title: 'Deletar Árvore', onConfirm: function () { deleteArvore(id); }, styleButton: styleDelBtn, iconType: 'warn', confirmBtn: 'Deletar', content: "Tem certeza que deseja excluir a \u00C1rvore de n\u00FAmero?" });
    }, [deleteArvore, showModal]);
    var deleteMultModal = function () { return showModal({ title: 'Deletar Árvores', onConfirm: deleteArvores, styleButton: styleDelBtn, iconType: 'warn', confirmBtn: 'Deletar', content: 'Tem certeza que deseja excluir Todas as Árvores Selecionadas?' }); };
    react_1.useEffect(function () {
        defaultUmfsOptions();
        defaultUpasOptions();
    }, [defaultUmfsOptions, defaultUpasOptions]);
    var deleteArvores = function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            setLoading(true);
            try {
                setLoading(false);
            }
            catch (error) {
                console.log(error);
            }
            return [2 /*return*/];
        });
    }); };
    var handleImportTemplate = function () { return __awaiter(void 0, void 0, void 0, function () {
        var data;
        return __generator(this, function (_a) {
            data = upa.tipo === 0 ? [
                { ut: 1, numero_arvore: 1, especie: 'Abiu', dap: 10, altura: 20.0, qf: 1, ponto_gps: 1, latitude: 2.565, longitude: 0.56, obs: '', comentario: '' },
                { ut: 1, numero_arvore: 2, especie: 'Abiu', dap: 15, altura: 17.3, qf: 1, ponto_gps: 2, latitude: 7.544, longitude: 1.24, obs: '', comentario: '' },
                { ut: 1, numero_arvore: 3, especie: 'Especie Teste', dap: 13.5, altura: 15.4, qf: 1, ponto_gps: 3, latitude: 14.224, longitude: 4.67, obs: '', comentario: '' },
            ] : [
                { ut: 1, faixa: 1, numero_arvore: 1, especie: 'Abiu', dap: 10, altura: 20.0, qf: 1, orient_x: 'D', coord_x: 7.5, coord_y: 10, obs: '', comentario: '' },
                { ut: 1, faixa: 1, numero_arvore: 2, especie: 'Abiu', dap: 15, altura: 17.3, qf: 1, orient_x: 'D', coord_x: 12.5, coord_y: 10, obs: '', comentario: '' },
                { ut: 1, faixa: 1, numero_arvore: 3, especie: 'Especie Teste', dap: 13.5, altura: 15.4, qf: 1, orient_x: 'D', coord_x: 22.4, coord_y: 10, obs: '', comentario: '' },
            ];
            create_csv_1.CsvDataService.exportToCsv(upa.tipo === 0 ? 'template_inventario_gps' : 'template_inventario_xy', data);
            return [2 /*return*/];
        });
    }); };
    var handleImportInventario = function () { return __awaiter(void 0, void 0, void 0, function () {
        var e_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    setLoading(true);
                    return [4 /*yield*/, client.post("/arvore/import-inventario?upaId=" + (upa === null || upa === void 0 ? void 0 : upa.id), {
                            columns: columnData,
                            data: rowData
                        })
                            .then(function (result) {
                            var data = result.data;
                            setLoading(false);
                            alert_1["default"].success(data === null || data === void 0 ? void 0 : data.message);
                            console.log(data === null || data === void 0 ? void 0 : data.message);
                        })];
                case 1:
                    _a.sent();
                    return [3 /*break*/, 3];
                case 2:
                    e_1 = _a.sent();
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); };
    var handleFocusBack = function () {
        setUploading(false);
        window.removeEventListener('focus', handleFocusBack);
    };
    var onUploadAccepted = function (result) {
        var columns = result.data[0].map(function (col, index) {
            var accessor = col.split(" ").join("_").toLowerCase();
            if (accessor === 'ut' || accessor === 'especie') {
                return {
                    Header: col,
                    accessor: col.split(" ").join("_").toLowerCase(),
                    Filter: Table_1.SelectColumnFilter
                };
            }
            else {
                return {
                    Header: col,
                    accessor: accessor
                };
            }
        });
        var rows = result.data.slice(1).map(function (row) {
            return row.reduce(function (acc, curr, index) {
                acc[columns[index].accessor] = curr;
                return acc;
            }, {});
        });
        setColumnData(columns);
        setRowData(rows);
    };
    return (React.createElement("div", null,
        React.createElement("div", { className: "flex flex-row items-center justify-between p-6 bg-gray-100" },
            React.createElement("div", null),
            React.createElement(CSVReader, { config: {
                    encoding: encoding
                }, onUploadAccepted: onUploadAccepted }, function (_a) {
                var getRootProps = _a.getRootProps, acceptedFile = _a.acceptedFile, ProgressBar = _a.ProgressBar, getRemoveFileProps = _a.getRemoveFileProps;
                return (React.createElement(React.Fragment, null,
                    React.createElement("div", { className: "lg:grid lg:grid-cols-4" },
                        React.createElement("div", { className: "px-2 w-36" },
                            React.createElement("select", { className: "mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 p-1", value: encoding, onChange: function (e) {
                                    setEncoding(String(e.target.value));
                                } }, ["iso-8859-1", "utf-8"].map(function (pageSize) { return (React.createElement("option", { key: pageSize, value: pageSize }, pageSize)); }))),
                        React.createElement("div", { className: "" },
                            React.createElement("a", __assign({}, getRootProps(), { className: "bg-indigo hover:bg-indigo-dark text-green-700 font-bold px-4 inline-flex align-middle hover:cursor-pointer" }),
                                React.createElement("svg", { className: "fill-green-700 w-6 h-6", viewBox: "0 0 24 24", xmlns: "http://www.w3.org/2000/svg" },
                                    React.createElement("path", { d: "M0 0h24v24H0z", fill: "none" }),
                                    React.createElement("path", { d: "M9 16h6v-6h4l-7-7-7 7h4zm-4 2h14v2H5z" })),
                                React.createElement("span", { className: "ml-2" }, uploading ? "Abrindo..." : "Abrir Planilha"))),
                        React.createElement("div", { className: "lg:grid lg:grid-cols-2 lg:gap-2" }, acceptedFile && (React.createElement(React.Fragment, null,
                            React.createElement("div", { className: "inline-block align-baseline" }, acceptedFile.name),
                            React.createElement(Button_1.Button, __assign({}, getRemoveFileProps(), { className: "text-red-700 hover:cursor-pointer justify-center w-24" }), "Remove")))),
                        React.createElement("div", { className: "col-span-4 pt-1" },
                            React.createElement(ProgressBar, { style: styles.progressBarBackgroundColor })))));
            }),
            React.createElement("div", null,
                React.createElement("a", { onClick: handleImportTemplate, className: "bg-indigo hover:bg-indigo-dark text-green-700 font-bold py-2 px-4 w-full inline-flex items-center hover:cursor-pointer" },
                    React.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", strokeWidth: "1.5", stroke: "currentColor", className: "w-6 h-6" },
                        React.createElement("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m.75 12l3 3m0 0l3-3m-3 3v-6m-1.5-9H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" })),
                    React.createElement("span", { className: "ml-2" }, "Modelo"))),
            React.createElement("a", { onClick: handleImportInventario, className: "px-6 py-2 text-white bg-green-700 hover:bg-green-800 rounded-md hover:cursor-pointer" }, "Importar")),
        React.createElement("div", { className: "flex flex-col p-6" },
            React.createElement("div", { className: "pb-2" },
                React.createElement("h1", { className: "text-xl font-semibold" }, "Importa\u00E7\u00E3o do Invent\u00E1rio")),
            React.createElement("div", { className: "flex flex-col lg:flex-row lg:items-center lg:justify-items-center py-4 bg-gray-100 rounded-lg" },
                React.createElement("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4 w-full lg:w-3/5 px-4" },
                    React.createElement("div", null,
                        React.createElement(Select_1.Select, { initialData: {
                                label: 'Selecione UMF...',
                                value: ''
                            }, selectedValue: selectedUmf, defaultOptions: getUmfsDefaultOptions(), options: loadUmfs, label: "UMF:", callback: selectUmf })),
                    React.createElement("div", null,
                        React.createElement(Select_1.Select, { initialData: {
                                label: 'Selecione UPA...',
                                value: ''
                            }, selectedValue: selectedUpa, defaultOptions: getUpasDefaultOptions(), options: loadUpas, label: "UPA:", callback: function (e) { selectUpa(e); } })))),
            React.createElement("div", { className: "mt-6" },
                React.createElement(Table_1["default"], { columns: columns, data: data })))));
};
exports["default"] = Index;
