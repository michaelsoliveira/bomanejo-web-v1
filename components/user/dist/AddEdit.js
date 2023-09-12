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
exports.AddEdit = void 0;
var formik_1 = require("formik");
var react_1 = require("react");
var hooks_1 = require("../../store/hooks");
var userSlice_1 = require("../../store/userSlice");
var Yup = require("yup");
require("react-toastify/dist/ReactToastify.css");
var alert_1 = require("../../services/alert");
var react_2 = require("next-auth/react");
var router_1 = require("next/router");
var AuthContext_1 = require("contexts/AuthContext");
var Select_1 = require("../Select");
var RadioGroup_1 = require("../form/RadioGroup");
var Option_1 = require("../form/Option");
var FocusError_1 = require("../form/FocusError");
var ModalContext_1 = require("contexts/ModalContext");
exports.AddEdit = react_1.forwardRef(function AddEdit(_a, ref) {
    var _this = this;
    var styles = _a.styles, userId = _a.userId, sendForm = _a.sendForm, redirect = _a.redirect, projetoId = _a.projetoId, roles = _a.roles;
    var dispatch = hooks_1.useAppDispatch();
    var router = router_1.useRouter();
    var isAddMode = !userId;
    var client = react_1.useContext(AuthContext_1.AuthContext).client;
    var _b = react_1.useState(), selectedUser = _b[0], setSelectedUser = _b[1];
    var _c = react_1.useState([]), selectedRoles = _c[0], setSelectedRoles = _c[1];
    var _d = react_1.useState(0), option = _d[0], setOption = _d[1];
    var session = react_2.useSession().data;
    var _e = react_1.useState(), users = _e[0], setUsers = _e[1];
    var hideModal = ModalContext_1.useModalContext().hideModal;
    function onSelect(index) {
        setOption(index);
    }
    var loadUsers = react_1.useCallback(function () { return __awaiter(_this, void 0, void 0, function () {
        var data;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!session) return [3 /*break*/, 2];
                    return [4 /*yield*/, client.get('/users/search')];
                case 1:
                    data = (_a.sent()).data;
                    setUsers(data);
                    _a.label = 2;
                case 2: return [2 /*return*/];
            }
        });
    }); }, [session, client]);
    react_1.useEffect(function () {
        var isLoaded = false;
        if (!isLoaded)
            loadUsers();
        return function () {
            isLoaded = true;
        };
    }, [loadUsers]);
    var loadRolesOptions = function (inputValue, callback) { return __awaiter(_this, void 0, void 0, function () {
        var response, json;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, client.get("/role/search?nome=" + inputValue)];
                case 1:
                    response = _a.sent();
                    json = response.data;
                    callback(json === null || json === void 0 ? void 0 : json.map(function (role) { return ({
                        value: role.id,
                        label: role.name
                    }); }));
                    return [2 /*return*/];
            }
        });
    }); };
    var loadUsersOptions = function (inputValue, callback) { return __awaiter(_this, void 0, void 0, function () {
        var response, json;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, client.get("/users/search?nome=" + inputValue)];
                case 1:
                    response = _a.sent();
                    json = response.data;
                    callback(json === null || json === void 0 ? void 0 : json.map(function (user) { return ({
                        value: user.id,
                        label: user.username
                    }); }));
                    return [2 /*return*/];
            }
        });
    }); };
    function getUsersDefaultOptions() {
        return users === null || users === void 0 ? void 0 : users.map(function (user) {
            return {
                label: user.username,
                value: user.id
            };
        });
    }
    function getRolesDefaultOptions() {
        return roles === null || roles === void 0 ? void 0 : roles.map(function (role) {
            return {
                label: role.name,
                value: role.id
            };
        });
    }
    var validationSchema = Yup.object().shape({
        isAddMode: Yup.boolean(),
        projeto: Yup.string()
            .when('id_projeto', {
            is: function (id_projeto) {
                if (id_projeto === '')
                    return false;
            },
            then: Yup.string()
                .required('Campo nome do projeto é obrigatório')
                .min(6, 'O campo deve ter no mínimo 6 caracteres')
        }),
        username: Yup.string()
            .when('option', {
            is: function (option) { return option === 0; },
            then: Yup.string().test("len", "O nome de usuário tem que ter entre 3 e 40 caracteres.", function (val) {
                return val &&
                    val.toString().length >= 3 &&
                    val.toString().length <= 40;
            })
                .required("Campo obrigatório!")
        }),
        email: Yup.string()
            .when('option', {
            is: function (option) { return option === 0; },
            then: Yup.string()
                .email("Este não é um email válido.")
                .required("Campo obrigatório!")
        }),
        password: Yup.string()
            .when('option', {
            is: function (option) { return option === 0; },
            then: Yup.string()
                .when('isAddMode', {
                is: true,
                then: Yup.string().required('Senha é obrigatória').min(6, 'A senha deve possuir no mínimo 6 caracteres')
            })
        }),
        confirmPassword: Yup.string()
            .when('option', {
            is: function (option) { return option === 0; },
            then: Yup.string()
                .when('password', function (password, schema) {
                if (password || isAddMode)
                    return schema.required('A confirmação de senha é obrigatória');
            })
                .oneOf([Yup.ref('password')], 'As senhas informadas não coincidem')
        }),
        id_user: Yup.string()
            .when('option', {
            is: function (option) { return option === 1; },
            then: Yup.string()
                .when('isAddMode', {
                is: true,
                then: Yup.string().required('É necessário selecionar um usuário')
            })
        })
    });
    function handleRegister(data) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!isAddMode) return [3 /*break*/, 2];
                        return [4 /*yield*/, dispatch(userSlice_1.create(data))
                                .unwrap()
                                .then(function () { return __awaiter(_this, void 0, void 0, function () {
                                var email, password, res;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            if (!redirect) return [3 /*break*/, 2];
                                            email = data.email, password = data.password;
                                            return [4 /*yield*/, react_2.signIn('credentials', {
                                                    redirect: false,
                                                    email: email,
                                                    password: password
                                                }).then(function (response) {
                                                    if (response.ok) {
                                                        alert_1["default"].success('Login realizado com sucesso');
                                                        hideModal();
                                                        router.push('/');
                                                    }
                                                    else {
                                                        alert_1["default"].warn('Email ou senha inválidos, verifique os dados e tente novamente!');
                                                    }
                                                })["catch"](function (e) {
                                                    console.log(e);
                                                })];
                                        case 1:
                                            res = _a.sent();
                                            return [3 /*break*/, 3];
                                        case 2:
                                            alert_1["default"].success('Usuário cadastrado com SUCESSO!');
                                            sendForm();
                                            hideModal();
                                            _a.label = 3;
                                        case 3: return [2 /*return*/];
                                    }
                                });
                            }); })["catch"](function (error) {
                                console.log(error.message);
                                alert_1["default"].warn("Error: " + error.message);
                            })];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 2: return [4 /*yield*/, client.put("/users/" + userId, data)
                            .then(function (response) {
                            var _a = response.data, error = _a.error, user = _a.user, message = _a.message;
                            if (error) {
                                alert_1["default"].error(message);
                            }
                            else {
                                alert_1["default"].success(message);
                                sendForm();
                                hideModal();
                            }
                        })];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4: return [2 /*return*/];
                }
            });
        });
    }
    return (react_1["default"].createElement("div", null,
        react_1["default"].createElement(formik_1.Formik, { innerRef: ref, initialValues: {
                username: '',
                email: '',
                password: '',
                confirmPassword: '',
                provider: '',
                projeto: '',
                id_provider: '',
                isAddMode: isAddMode,
                id_user: '',
                id_projeto: '',
                roles: {},
                option: 0
            }, validationSchema: validationSchema, onSubmit: function (values, _a) {
                var setSubmitting = _a.setSubmitting, setFieldValue = _a.setFieldValue;
                handleRegister(values);
            } }, function (_a) {
            var errors = _a.errors, touched = _a.touched, isSubmitting = _a.isSubmitting, setFieldValue = _a.setFieldValue, setFieldTouched = _a.setFieldTouched, setTouched = _a.setTouched;
            // eslint-disable-next-line react-hooks/rules-of-hooks
            var loadUser = react_1.useCallback(function () { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!!isAddMode) return [3 /*break*/, 2];
                            return [4 /*yield*/, client.get("/users/" + projetoId + "/" + userId)
                                    .then(function (_a) {
                                    var _b;
                                    var data = _a.data;
                                    if (((_b = data === null || data === void 0 ? void 0 : data.roles) === null || _b === void 0 ? void 0 : _b.length) > 0) {
                                        data === null || data === void 0 ? void 0 : data.roles.map(function (role) {
                                            setSelectedRoles(function (old) { return __spreadArrays(old, [{
                                                    label: role.name,
                                                    value: role.id
                                                }]); });
                                        });
                                        setFieldValue('roles', data === null || data === void 0 ? void 0 : data.roles);
                                    }
                                    var fields = ['username', 'email'];
                                    setFieldValue('id_user', data === null || data === void 0 ? void 0 : data.id);
                                    fields.forEach(function (field) { return setFieldValue(field, data[field], false); });
                                })];
                        case 1:
                            _a.sent();
                            _a.label = 2;
                        case 2: return [2 /*return*/];
                    }
                });
            }); }, [setFieldValue]);
            // eslint-disable-next-line react-hooks/rules-of-hooks
            react_1.useEffect(function () {
                setFieldValue('id_projeto', projetoId);
                loadUser();
            }, [loadUser, setFieldValue]);
            return (react_1["default"].createElement("div", { className: "flex flex-col justify-center w-full" },
                react_1["default"].createElement("div", { className: "relative h-full mx-0" },
                    react_1["default"].createElement("div", { className: "relative pt-3 px-4 w-full" },
                        react_1["default"].createElement(formik_1.Form, null,
                            session && isAddMode && (react_1["default"].createElement("div", { className: "mx-auto px-5 py-4" },
                                react_1["default"].createElement(RadioGroup_1["default"], null, ["Cadastrar", "Selecionar"].map(function (el, index) { return (react_1["default"].createElement(Option_1["default"], { key: index, index: index, selectedIndex: option, onSelect: function (index) {
                                        setTouched({}, false);
                                        setFieldValue('option', index);
                                        onSelect(index);
                                    } }, el)); })))),
                            (option === 0) ? (react_1["default"].createElement("div", { className: session ? 'lg:grid lg:grid-cols-2 lg:gap-4' : 'flex flex-col' },
                                !projetoId && (react_1["default"].createElement("div", null,
                                    react_1["default"].createElement("label", { className: styles.label, htmlFor: "projeto" }, "Projeto"),
                                    react_1["default"].createElement(formik_1.Field, { className: styles.field, id: "projeto", name: "projeto", placeholder: "Nome do Projeto" }),
                                    react_1["default"].createElement(formik_1.ErrorMessage, { className: 'text-sm text-red-500 mt-1', name: "email", component: "div" }))),
                                react_1["default"].createElement("div", null,
                                    react_1["default"].createElement("label", { className: styles.label, htmlFor: "username" }, "Nome"),
                                    react_1["default"].createElement(formik_1.Field, { type: "text", className: styles.field, id: "username", name: "username", placeholder: "Michael" }),
                                    react_1["default"].createElement(formik_1.ErrorMessage, { className: 'text-sm text-red-500 mt-1', name: "username", component: "div" })),
                                react_1["default"].createElement("div", null,
                                    react_1["default"].createElement("label", { className: styles.label, htmlFor: "emailRegister" }, "Email"),
                                    react_1["default"].createElement(formik_1.Field, { className: styles.field, id: "emailRegister", name: "email", placeholder: "john@acme.com", type: "email" }),
                                    react_1["default"].createElement(formik_1.ErrorMessage, { className: 'text-sm text-red-500 mt-1', name: "email", component: "div" })),
                                isAddMode && (react_1["default"].createElement(react_1["default"].Fragment, null,
                                    react_1["default"].createElement("div", null,
                                        react_1["default"].createElement("label", { className: styles.label, htmlFor: "password" }, "Senha"),
                                        react_1["default"].createElement(formik_1.Field, { type: "password", className: styles.field, id: "passwordRegister", name: "password", placeholder: "******" }),
                                        react_1["default"].createElement(formik_1.ErrorMessage, { className: 'text-sm text-red-500 mt-1', name: "password", component: "div" })),
                                    react_1["default"].createElement("div", null,
                                        react_1["default"].createElement("label", { className: styles.label, htmlFor: "password" }, "Confirmar a Senha"),
                                        react_1["default"].createElement(formik_1.Field, { type: "password", className: styles.field, id: "confirmPassword", name: "confirmPassword", placeholder: "******" }),
                                        react_1["default"].createElement(formik_1.ErrorMessage, { className: 'text-sm text-red-500 mt-1', name: "confirmPassword", component: "div" })))))) :
                                (react_1["default"].createElement("div", null,
                                    react_1["default"].createElement("div", { className: 'py-4' },
                                        react_1["default"].createElement(formik_1.Field, { name: "id_user" }, function () { return (react_1["default"].createElement(Select_1.Select, { placeholder: 'Entre com as iniciais...', selectedValue: selectedUser, defaultOptions: getUsersDefaultOptions(), options: loadUsersOptions, label: "Pesquisar Usu\u00E1rio", callback: function (value) {
                                                setFieldValue('id_user', value === null || value === void 0 ? void 0 : value.value);
                                                setSelectedUser(value);
                                            } })); }),
                                        react_1["default"].createElement(formik_1.ErrorMessage, { className: 'text-sm text-red-500 mt-1', name: "id_user", component: "div" })))),
                            session &&
                                (react_1["default"].createElement("div", { className: 'w-full ' },
                                    react_1["default"].createElement("div", { className: 'py-4' },
                                        react_1["default"].createElement(formik_1.Field, { name: "roles_id" }, function () { return (react_1["default"].createElement(Select_1.Select, { isMulti: true, selectedValue: selectedRoles, defaultOptions: getRolesDefaultOptions(), options: loadRolesOptions, label: "Grupo de Usu\u00E1rio", 
                                            // options={selectedRoles}
                                            callback: function (data) {
                                                setSelectedRoles(data);
                                                setFieldValue('roles', data);
                                            } })); }),
                                        react_1["default"].createElement(formik_1.ErrorMessage, { className: 'text-sm text-red-500 mt-1', name: "roles", component: "div" })))),
                            react_1["default"].createElement(FocusError_1["default"], null))))));
        })));
});
