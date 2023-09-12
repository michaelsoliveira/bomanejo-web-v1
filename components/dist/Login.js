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
var router_1 = require("next/router");
var react_hook_form_1 = require("react-hook-form");
var yup_1 = require("@hookform/resolvers/yup");
var Yup = require("yup");
var solid_1 = require("@heroicons/react/solid");
var alert_1 = require("../services/alert");
var react_1 = require("next-auth/react");
var fa_1 = require("react-icons/fa");
var ModalContext_1 = require("contexts/ModalContext");
var react_2 = require("react");
// import { userService } from 'services';
exports["default"] = Login;
function Login(_a) {
    var csrfToken = _a.csrfToken;
    var hideModal = ModalContext_1.useModalContext().hideModal;
    var session = react_1.useSession().data;
    var router = router_1.useRouter();
    // form validation rules 
    var validationSchema = Yup.object().shape({
        email: Yup.string().required('Email is required'),
        password: Yup.string().required('Password is required')
    });
    var formOptions = { resolver: yup_1.yupResolver(validationSchema) };
    // get functions to build form with useForm() hook
    var _b = react_hook_form_1.useForm(formOptions), register = _b.register, handleSubmit = _b.handleSubmit, setError = _b.setError, formState = _b.formState, setFocus = _b.setFocus;
    function signInProvider(provider) {
        // event?.preventDefault()
        return react_1.signIn(provider, {
            redirect: false,
            callbackUrl: "" + window.location.origin
        });
    }
    react_2.useEffect(function () {
        setFocus('email');
    }, [setFocus]);
    function onSubmit(_a) {
        var email = _a.email, password = _a.password, csrfToken = _a.csrfToken;
        return __awaiter(this, void 0, void 0, function () {
            var res, error_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, react_1.signIn('credentials', {
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
                        res = _b.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        error_1 = _b.sent();
                        console.log(error_1);
                        alert_1["default"].error(error_1);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    }
    return (React.createElement("div", null,
        React.createElement("form", { onSubmit: handleSubmit(onSubmit), className: "mt-4 space-y-6", method: 'POST' },
            React.createElement("input", { type: "hidden", name: "csrfToken", value: csrfToken }),
            React.createElement("input", { type: "hidden", name: "remember", defaultValue: "true" }),
            React.createElement("div", { className: "rounded-md flex flex-col" },
                React.createElement("div", { className: "relative" },
                    React.createElement("input", __assign({ autoFocus: true }, register('email'), { id: "emailLogin", name: "email", type: "email", className: "peer h-10 w-full border-b border-gray-300 text-gray-900 placeholder-transparent focus:outline-none focus:border-green-600", placeholder: "michaelsoliveira@gmail.com" })),
                    React.createElement("label", { htmlFor: "email", className: "absolute left-0 -top-3.5 text-gray-600 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm" }, "Email")),
                React.createElement("div", { className: "mt-10 relative" },
                    React.createElement("input", __assign({}, register('password'), { id: "passwordLogin", name: "password", type: "password", className: "peer h-10 w-full border-b border-gray-300 text-gray-900 placeholder-transparent focus:outline-none focus:border-green-600", placeholder: "michaelsoliveira@gmail.com" })),
                    React.createElement("label", { htmlFor: "password", className: "absolute left-0 -top-3.5 text-gray-600 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm" }, "Senha"))),
            React.createElement("div", { className: "flex items-center justify-between" },
                React.createElement("div", { className: "flex items-center" },
                    React.createElement("input", { id: "remember-me", name: "remember-me", type: "checkbox", className: "h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded" }),
                    React.createElement("label", { htmlFor: "remember-me", className: "ml-2 block text-sm text-gray-900" }, "Remember me")),
                React.createElement("div", { className: "text-sm" },
                    React.createElement("a", { href: "#", className: "font-medium text-green-600 hover:text-green-500" }, "Esqueceu sua senha?"))),
            React.createElement("div", { className: 'mx-auto flex flex-row items-center justify-center py-2' },
                React.createElement("button", { disabled: formState.isSubmitting, type: "submit", className: "group relative w-3/4 py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500" },
                    React.createElement("span", { className: "absolute left-0 inset-y-0 flex items-center pl-3" },
                        React.createElement(solid_1.LockClosedIcon, { className: "h-5 w-5 text-green-500 group-hover:text-green-400", "aria-hidden": "true" })),
                    "Sign in"))),
        React.createElement("div", { className: "flex flex-col justify-between items-center w-full" },
            React.createElement("div", { className: "mt-4 flex items-center justify-between" },
                React.createElement("span", { className: "border-b w-1/5 lg:w-4/6" }),
                React.createElement("a", { href: "#", className: "text-xs text-center text-gray-500 uppercase w-96" }, "or login with social"),
                React.createElement("span", { className: "border-b w-1/5 lg:w-4/6" })),
            React.createElement("div", { className: 'flex flex-col justify-center items-center max-w-full w-full' },
                React.createElement("a", { href: "#", onClick: function () { return signInProvider('google'); }, className: "flex items-center justify-center mt-3 mb-2 text-white rounded-lg shadow-md hover:bg-gray-100 w-5/6" },
                    React.createElement("div", { className: "px-2 py-3" },
                        React.createElement("svg", { className: "h-6 w-6", viewBox: "0 0 40 40" },
                            React.createElement("path", { d: "M36.3425 16.7358H35V16.6667H20V23.3333H29.4192C28.045 27.2142 24.3525 30 20 30C14.4775 30 10 25.5225 10 20C10 14.4775 14.4775 9.99999 20 9.99999C22.5492 9.99999 24.8683 10.9617 26.6342 12.5325L31.3483 7.81833C28.3717 5.04416 24.39 3.33333 20 3.33333C10.7958 3.33333 3.33335 10.7958 3.33335 20C3.33335 29.2042 10.7958 36.6667 20 36.6667C29.2042 36.6667 36.6667 29.2042 36.6667 20C36.6667 18.8825 36.5517 17.7917 36.3425 16.7358Z", fill: "#FFC107" }),
                            React.createElement("path", { d: "M5.25497 12.2425L10.7308 16.2583C12.2125 12.59 15.8008 9.99999 20 9.99999C22.5491 9.99999 24.8683 10.9617 26.6341 12.5325L31.3483 7.81833C28.3716 5.04416 24.39 3.33333 20 3.33333C13.5983 3.33333 8.04663 6.94749 5.25497 12.2425Z", fill: "#FF3D00" }),
                            React.createElement("path", { d: "M20 36.6667C24.305 36.6667 28.2167 35.0192 31.1742 32.34L26.0159 27.975C24.3425 29.2425 22.2625 30 20 30C15.665 30 11.9842 27.2359 10.5975 23.3784L5.16254 27.5659C7.92087 32.9634 13.5225 36.6667 20 36.6667Z", fill: "#4CAF50" }),
                            React.createElement("path", { d: "M36.3425 16.7358H35V16.6667H20V23.3333H29.4192C28.7592 25.1975 27.56 26.805 26.0133 27.9758C26.0142 27.975 26.015 27.975 26.0158 27.9742L31.1742 32.3392C30.8092 32.6708 36.6667 28.3333 36.6667 20C36.6667 18.8825 36.5517 17.7917 36.3425 16.7358Z", fill: "#1976D2" }))),
                    React.createElement("h1", { className: "px-4 py-2 w-5/6 text-center text-gray-600 font-medium" }, "Sign in with Google"))),
            React.createElement("button", { onClick: function () { return signInProvider('facebook'); }, className: "flex items-center justify-center mb-2 text-indigo-700 hover:text-indigo-600 rounded-lg shadow-md hover:bg-gray-100 w-5/6" },
                React.createElement(fa_1.FaFacebookF, { className: "fa fa-facebook mr-2" }),
                React.createElement("h1", { className: "px-4 py-2 w-5/6 text-center text-gray-600 font-medium" }, "Sign in with Facebook")),
            React.createElement("button", { onClick: function () { return signInProvider('github'); }, className: "flex items-center justify-center mb-2 text-gray-700 hover:text-gray-800 rounded-lg shadow-md hover:bg-gray-100 w-5/6" },
                React.createElement(fa_1.FaGithub, { className: "fa fa-facebook mr-2" }),
                React.createElement("h1", { className: "px-4 py-2 w-5/6 text-center text-gray-600 font-medium" }, "Sign in with Github")))));
}
