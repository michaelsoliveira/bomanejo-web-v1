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
var Navigation_1 = require("./Navigation");
var Footer_1 = require("./Footer");
var react_2 = require("next-auth/react");
var Menus_1 = require("./Menus");
var Loading_1 = require("@/components/Loading");
var LoadingContext_1 = require("contexts/LoadingContext");
var ProjetoContext_1 = require("contexts/ProjetoContext");
var outline_1 = require("@heroicons/react/outline");
var AuthContext_1 = require("contexts/AuthContext");
var outline_2 = require("@heroicons/react/outline");
var router_1 = require("next/router");
var hooks_1 = require("store/hooks");
var script_1 = require("next/script");
var Layout = function (_a) {
    var children = _a.children;
    var _b = react_2.useSession(), session = _b.data, status = _b.status;
    var user = session === null || session === void 0 ? void 0 : session.user;
    var loading = react_1.useContext(LoadingContext_1.LoadingContext).loading;
    var _c = react_1.useContext(ProjetoContext_1.ProjetoContext), projeto = _c.projeto, setProjeto = _c.setProjeto;
    var client = react_1.useContext(AuthContext_1.AuthContext).client;
    var router = router_1.useRouter();
    var poa = hooks_1.useAppSelector(function (state) { return state.poa; });
    var getProjetoAtivo = react_1.useCallback(function () { return __awaiter(void 0, void 0, void 0, function () {
        var response, projeto_1, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    if (!session) return [3 /*break*/, 2];
                    return [4 /*yield*/, client.get("/projeto/active/get")];
                case 1:
                    response = _a.sent();
                    projeto_1 = response.data.projeto;
                    setProjeto(projeto_1 ? projeto_1 : { id: '', nome: 'Nenhum Projeto Cadastrado' });
                    _a.label = 2;
                case 2: return [3 /*break*/, 4];
                case 3:
                    error_1 = _a.sent();
                    console.log(error_1.message);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); }, [session, client, setProjeto]);
    react_1.useEffect(function () {
        getProjetoAtivo();
    }, [getProjetoAtivo]);
    var withProjeto = projeto ?
        [
            {
                name: 'Gerenciar',
                description: 'Gerenciar Informações do Projeto',
                href: "/projeto",
                icon: outline_2.CogIcon
            },
            {
                name: 'Detentor',
                description: 'Gerenciar Detentor do Projeto',
                href: "/projeto/detentor"
            },
            {
                name: 'Usuários',
                description: 'Gerenciar Permissões',
                href: "/projeto/users",
                icon: outline_2.UserGroupIcon
            }
        ]
        : [
            {
                name: 'Geral',
                description: 'Gerenciar Informações do Projeto',
                href: "/projeto",
                icon: outline_2.CogIcon
            }
        ];
    var menuProjeto = {
        name: 'Projeto',
        description: 'Dados Gerais dos Projetos',
        href: '/projeto',
        icon: outline_1.ClipboardListIcon,
        subMenuItems: withProjeto
    };
    var defaultNavigation = [
        { name: 'Dashboard', href: '/', current: false, visible: !session, subMenu: false, subMenuItems: [] },
        { name: 'Soluções', href: '#', current: false, visible: !session, subMenu: true, subMenuItems: Menus_1.solutions },
        { name: 'Cadastro', href: '#', current: false, visible: !!session, subMenu: true, subMenuItems: __spreadArrays([menuProjeto], Menus_1.resources) },
        { name: 'Inventário', href: '#', current: false, visible: !!session, subMenu: true, subMenuItems: Menus_1.inventario },
        { name: 'Planejamento', href: '#', current: false, visible: !!session, subMenu: true, subMenuItems: Menus_1.planejamento },
        { name: 'Análise de Dados', href: '#', current: false, visible: !!session, subMenu: true, subMenuItems: Menus_1.estatistica },
        { name: 'Cadeia de Custódia', href: '#', current: false, visible: !!session, subMenu: true, subMenuItems: Menus_1.custodia },
        { name: 'Relatórios', href: '#', current: false, visible: !!session, subMenu: true, subMenuItems: Menus_1.reports }
    ];
    var userNavigation = [
        { name: "Perfil (" + (user === null || user === void 0 ? void 0 : user.username) + ")", href: '#' },
        { name: 'Alterar Senha', href: '/user/change-password' },
        { name: 'Logout', href: '#', click: function () { return react_2.signOut({ callbackUrl: "/" }); } },
    ];
    var processPath = router.pathname === 'process';
    return (React.createElement(React.Fragment, null,
        React.createElement(script_1["default"], { src: "https://www.googletagmanager.com/gtag/js?id=G-6GKM1MGNL6" }),
        React.createElement(script_1["default"], { id: "google-analytics" }, "\n                    window.dataLayer = window.dataLayer || [];\n                    function gtag(){dataLayer.push(arguments);}\n                    gtag('js', new Date());\n        \n                    gtag('config', 'G-6GKM1MGNL6');\n                "),
        React.createElement("div", { className: "flex flex-col" },
            React.createElement("div", { className: "lg:mb-16" },
                React.createElement(Navigation_1["default"], { defaultNavigation: defaultNavigation, userNavigation: userNavigation })),
            (processPath && !(poa === null || poa === void 0 ? void 0 : poa.id)) && (React.createElement("div", { className: "lg:mt-16" },
                React.createElement("span", { className: "flex items-center bg-blue-500 text-white text-sm font-bold px-4 py-3", role: "alert" },
                    React.createElement("svg", { className: "fill-current w-4 h-4 mr-2", xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 20 20" },
                        React.createElement("path", { d: "M12.432 0c1.34 0 2.01.912 2.01 1.957 0 1.305-1.164 2.512-2.679 2.512-1.269 0-2.009-.75-1.974-1.99C9.789 1.436 10.67 0 12.432 0zM8.309 20c-1.058 0-1.833-.652-1.093-3.524l1.214-5.092c.211-.814.246-1.141 0-1.141-.317 0-1.689.562-2.502 1.117l-.528-.88c2.572-2.186 5.531-3.467 6.801-3.467 1.057 0 1.233 1.273.705 3.23l-1.391 5.352c-.246.945-.141 1.271.106 1.271.317 0 1.357-.392 2.379-1.207l.6.814C12.098 19.02 9.365 20 8.309 20z" })),
                    React.createElement("p", null, "Para realizar o processamento do invent\u00E1rio \u00E9 necess\u00E1rio ativar um POA!")))),
            React.createElement("div", { className: "relative" },
                loading && (React.createElement(Loading_1.Loading, null)),
                children),
            React.createElement("div", null,
                React.createElement(Footer_1["default"], null)))));
};
exports["default"] = Layout;
