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
var AuthContext_1 = require("contexts/AuthContext");
var LoadingContext_1 = require("contexts/LoadingContext");
var ModalContext_1 = require("contexts/ModalContext");
var ProjetoContext_1 = require("contexts/ProjetoContext");
var react_1 = require("react");
var react_papaparse_1 = require("react-papaparse");
var alert_1 = require("../../services/alert");
var Button_1 = require("../Utils/Button");
var Table_1 = require("../Table");
var ImportModal = react_1.forwardRef(function ChangeActive(_a, ref) {
    var _this = this;
    var loadEspecies = _a.loadEspecies;
    var client = react_1.useContext(AuthContext_1.AuthContext).client;
    var _b = ModalContext_1.useModalContext(), showModal = _b.showModal, hideModal = _b.hideModal, store = _b.store;
    var visible = store.visible;
    var setLoading = react_1.useContext(LoadingContext_1.LoadingContext).setLoading;
    var projeto = react_1.useContext(ProjetoContext_1.ProjetoContext).projeto;
    var CSVReader = react_papaparse_1.useCSVReader().CSVReader;
    var _c = react_1.useState('iso-8859-1'), encoding = _c[0], setEncoding = _c[1];
    var _d = react_1.useState([]), columnData = _d[0], setColumnData = _d[1];
    var _e = react_1.useState([]), rowData = _e[0], setRowData = _e[1];
    var _f = react_1.useState(false), uploading = _f[0], setUploading = _f[1];
    var columns = react_1.useMemo(function () { return columnData; }, [columnData]);
    var _g = react_1.useState([]), duplicates = _g[0], setDuplicates = _g[1];
    var data = react_1.useMemo(function () { return rowData; }, [rowData]);
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
    var handleImportEspecies = function () { return __awaiter(_this, void 0, void 0, function () {
        var e_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    setLoading(true);
                    return [4 /*yield*/, client.post("/especie/import?projetoId=" + (projeto === null || projeto === void 0 ? void 0 : projeto.id), {
                            columns: columns,
                            data: data
                        })
                            .then(function (result) {
                            var data = result.data;
                            setLoading(false);
                            if (!data.error) {
                                alert_1["default"].success(data === null || data === void 0 ? void 0 : data.message);
                                loadEspecies();
                                hideModal();
                            }
                            else {
                                if ((data === null || data === void 0 ? void 0 : data.errorType) && (data === null || data === void 0 ? void 0 : data.errorType) === 'duplicates') {
                                    setDuplicates(data === null || data === void 0 ? void 0 : data.duplicates);
                                }
                                alert_1["default"].warn(data === null || data === void 0 ? void 0 : data.message);
                            }
                        })["catch"](function (error) {
                            console.log('Esse error: ', error.message);
                        })];
                case 1:
                    _a.sent();
                    return [3 /*break*/, 3];
                case 2:
                    e_1 = _a.sent();
                    alert_1["default"].error(e_1.message);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); };
    var onUploadAccepted = function (result) { return __awaiter(_this, void 0, void 0, function () {
        var columns, rows;
        return __generator(this, function (_a) {
            columns = result.data[0].map(function (col, index) {
                var accessor = col.normalize("NFD").replace(/[^0-9a-zA-Z\s]/g, "").split(" ").join("_").toLowerCase();
                return {
                    Header: col,
                    accessor: accessor
                };
            });
            rows = result.data.slice(1).map(function (row) {
                return row.reduce(function (acc, curr, index) {
                    acc[columns[index].accessor] = curr;
                    return acc;
                }, {});
            });
            setColumnData(columns);
            setRowData(rows);
            return [2 /*return*/];
        });
    }); };
    return (React.createElement("div", null,
        React.createElement("div", { className: "flex flex-col lg:flex-row items-center justify-center px-4 py-2 bg-gray-100" },
            React.createElement("div", { className: "flex flex-row justify-center items-center" },
                React.createElement(CSVReader, { config: {
                        encoding: encoding
                    }, onUploadAccepted: onUploadAccepted }, function (_a) {
                    var getRootProps = _a.getRootProps, acceptedFile = _a.acceptedFile, ProgressBar = _a.ProgressBar, getRemoveFileProps = _a.getRemoveFileProps;
                    return (React.createElement(React.Fragment, null,
                        React.createElement("div", { className: "flex flex-col lg:flex-row items-center justify-center" },
                            React.createElement("div", { className: "px-2 w-36" },
                                React.createElement("select", { className: "mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 p-1", value: encoding, onChange: function (e) {
                                        setEncoding(String(e.target.value));
                                    } }, ["iso-8859-1", "utf-8"].map(function (enconding) { return (React.createElement("option", { key: enconding, value: enconding }, enconding)); }))),
                            React.createElement("div", { className: "flex items-center justify-center mt-2 lg:mt-0" },
                                React.createElement("a", __assign({}, getRootProps(), { className: "bg-indigo hover:bg-indigo-dark text-green-700 font-bold px-4 inline-flex align-middle hover:cursor-pointer" }),
                                    React.createElement("svg", { className: "fill-green-700 w-6 h-6", viewBox: "0 0 24 24", xmlns: "http://www.w3.org/2000/svg" },
                                        React.createElement("path", { d: "M0 0h24v24H0z", fill: "none" }),
                                        React.createElement("path", { d: "M9 16h6v-6h4l-7-7-7 7h4zm-4 2h14v2H5z" })),
                                    React.createElement("span", { className: "ml-2" }, uploading ? "Abrindo..." : "Abrir Planilha"))),
                            React.createElement("div", { className: "flex flex-row items-center justify-center px-2 space-x-2" }, acceptedFile && (React.createElement(React.Fragment, null,
                                React.createElement("span", null, acceptedFile.name),
                                React.createElement(Button_1.Button, __assign({}, getRemoveFileProps(), { className: "text-red-700 hover:cursor-pointer justify-center w-24" }),
                                    React.createElement("span", { onClick: function () {
                                            setColumnData([]);
                                            setRowData([]);
                                        } }, "Remove"))))),
                            React.createElement("div", { className: "col-span-4 pt-1" },
                                React.createElement(ProgressBar, { style: styles.progressBarBackgroundColor })))));
                }))),
        React.createElement("div", { className: "mt-6" },
            React.createElement(Table_1["default"], { columns: columns, data: data })),
        React.createElement("span", { className: "hidden", ref: ref, onClick: handleImportEspecies }, "Importar")));
});
exports["default"] = ImportModal;
