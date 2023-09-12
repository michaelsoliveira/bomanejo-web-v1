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
/* eslint-disable @next/next/no-img-element */
/* This example requires Tailwind CSS v2.0+ */
var react_1 = require("react");
var react_2 = require("@headlessui/react");
var Link_1 = require("./Link");
var Logo_1 = require("./Logo");
var react_3 = require("next-auth/react");
var outline_1 = require("@heroicons/react/outline");
var solid_1 = require("@heroicons/react/solid");
var router_1 = require("next/router");
var classnames_1 = require("classnames");
var ProjetoContext_1 = require("contexts/ProjetoContext");
var ModalContext_1 = require("contexts/ModalContext");
var ChangeActive_1 = require("./projeto/ChangeActive");
var styles_1 = require("./Utils/styles");
function Navigation(_a) {
    var _this = this;
    var defaultNavigation = _a.defaultNavigation, userNavigation = _a.userNavigation;
    var session = react_3.useSession().data;
    var _b = ModalContext_1.useModalContext(), showModal = _b.showModal, hideModal = _b.hideModal;
    var formRef = react_1.createRef();
    var projeto = react_1.useContext(ProjetoContext_1.ProjetoContext).projeto;
    var _c = react_1.useState(false), menuOpened = _c[0], setMenuOpened = _c[1];
    // eslint-disable-next-line react/display-name
    var CustomMenuButton = react_1.forwardRef(function (_a, ref) {
        var children = _a.children;
        return (React.createElement("button", { onClick: function () { return setMenuOpened(!menuOpened); }, ref: ref }, children));
    });
    var router = router_1.useRouter();
    var _d = react_1.useState(defaultNavigation), navigation = _d[0], setNavigation = _d[1];
    var _e = react_1.useState(false), sticky = _e[0], setSticky = _e[1];
    var changeProjetoAtivo = function () { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            formRef.current.handleSubmit();
            return [2 /*return*/];
        });
    }); };
    var changeProjetoModal = function () {
        showModal({ title: 'Alterar Projeto Ativo', onConfirm: changeProjetoAtivo, styleButton: styles_1.styles.greenButton, confirmBtn: 'Ativar Projeto', content: React.createElement(ChangeActive_1.ChangeActive, { ref: formRef }) });
    };
    var handleScroll = function () {
        if (scrollY > 72) {
            setSticky(true);
        }
        else if (scrollY < 72) {
            setSticky(false);
        }
    };
    react_1.useEffect(function () {
        addEventListener('scroll', handleScroll);
        return function () {
            removeEventListener('scroll', handleScroll);
        };
    }, []);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    var changeCurrentParent = react_1.useCallback(function (key, href) {
        var changeCurrentNav = defaultNavigation.map(function (nav, index) {
            if (key !== index) {
                return __assign(__assign({}, nav), { current: false });
            }
            else {
                return __assign(__assign({}, nav), { current: true });
            }
        });
        setNavigation(changeCurrentNav);
        //if (href) router.push(href)
    }, [defaultNavigation]);
    var checkCurrentNavigation = react_1.useCallback(function () {
        defaultNavigation === null || defaultNavigation === void 0 ? void 0 : defaultNavigation.map(function (nav, indexParent) {
            var _a;
            if (nav === null || nav === void 0 ? void 0 : nav.subMenuItems) {
                if (router.pathname === nav.href) {
                    return changeCurrentParent(indexParent);
                }
                (_a = nav === null || nav === void 0 ? void 0 : nav.subMenuItems) === null || _a === void 0 ? void 0 : _a.map(function (subMenu, indexSub) {
                    var _a;
                    if (router.pathname === subMenu.href) {
                        return changeCurrentParent(indexParent);
                    }
                    (_a = subMenu.subMenuItems) === null || _a === void 0 ? void 0 : _a.map(function (subsubMenu, indexSubsub) {
                        if (router.pathname === subsubMenu.href) {
                            return changeCurrentParent(indexParent);
                        }
                    });
                });
            }
        });
    }, [changeCurrentParent, defaultNavigation, router.pathname]);
    var loadNavigation = react_1.useCallback(function () { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            if (session) {
                checkCurrentNavigation();
            }
            return [2 /*return*/];
        });
    }); }, [checkCurrentNavigation, session]);
    react_1.useEffect(function () {
        var isLoaded = false;
        if (!isLoaded)
            loadNavigation();
        return function () {
            isLoaded = true;
        };
    }, [loadNavigation]);
    return (React.createElement(react_2.Disclosure, { as: "nav", className: classnames_1["default"]("lg:absolute items-center w-full opacity-100 z-40") }, function (_a) {
        var _b, _c, _d, _e, _f, _g;
        var open = _a.open;
        return (React.createElement(React.Fragment, null,
            React.createElement("div", { className: classnames_1["default"]("px-4 sm:px-6 lg:px-8 bg-gray-50 shadow z-40", sticky ? 'lg:fixed w-full opacity-100 transition transition-ease duration-500 translate-y-0' : '') },
                React.createElement("div", { className: "flex items-center justify-between h-16" },
                    React.createElement("div", { className: classnames_1["default"]("flex items-center justify-between max-w-full w-full") },
                        React.createElement("div", { className: "flex-shrink-0 lg:-mr-16" }, open ? (React.createElement(react_2.Disclosure.Button, { as: Link_1.Link, href: "/" },
                            React.createElement(Logo_1["default"], { width: 'w-10', height: 'h-10' }))) : (React.createElement(Link_1.Link, { href: "/" },
                            React.createElement(Logo_1["default"], { width: 'w-10', height: 'h-10' })))),
                        React.createElement("div", { className: "hidden md:block" },
                            React.createElement("div", { className: "ml-10 flex items-baseline space-x-4" }, navigation === null || navigation === void 0 ? void 0 : navigation.map(function (item, key) { return (item.visible && (!item.subMenu ?
                                (React.createElement("a", { key: key, href: item.subMenu.href, onClick: function (evt) {
                                        evt.preventDefault();
                                        changeCurrentParent(key, item.href);
                                        open = !open;
                                    }, className: classnames_1["default"](item.current
                                        ? 'border-b-2 border-green-700 text-gray-700 bg-gray-100'
                                        : 'text-gray-700 hover:border-b-2 hover:border-green-700 hover:text-green-800 transition duration-500 ease-in-out hover:bg-gray-200 transform hover:-translate-y-1 hover:scale-105', 'px-6 py-2 text-sm font-medium hover:bg-gray-100 in-line flex'), "aria-current": item.current ? 'page' : undefined }, item.name)) :
                                (React.createElement(react_2.Popover, { onClick: function (evt) {
                                        evt.preventDefault();
                                        changeCurrentParent(key);
                                    }, as: "div", className: classnames_1["default"]((item === null || item === void 0 ? void 0 : item.current) && 'border-b-2 border-green-700 text-gray-700 bg-gray-100', "relative inline-block text-left"), key: key }, function (_a) {
                                    var _b;
                                    var open = _a.open, close = _a.close;
                                    return (React.createElement(React.Fragment, null,
                                        React.createElement(react_2.Popover.Button, { className: classnames_1["default"](!(item === null || item === void 0 ? void 0 : item.current) && 'hover:border-b-2 hover:border-green-700 hover:text-green-800', "inline-flex justify-center w-full px-4 py-2 text-sm font-medium text-gray-700  transition duration-500 ease-in-out hover:bg-gray-200 transform hover:-translate-y-1 hover:scale-105") },
                                            item.name,
                                            React.createElement(solid_1.ChevronDownIcon, { className: classnames_1["default"](open ? 'text-green-700 rotate-180 transform' : 'text-gray-400', 'w-5 h-5 ml-2 -mr-1'), "aria-hidden": "true" })),
                                        React.createElement(react_2.Transition, { as: react_1.Fragment, show: open, enter: "transition ease-out duration-100", enterFrom: "transform opacity-0 scale-95", enterTo: "transform opacity-100 scale-100", leave: "transition ease-in duration-75", leaveFrom: "transform opacity-100 scale-100", leaveTo: "transform opacity-0 scale-95" },
                                            React.createElement(react_2.Popover.Panel, { className: classnames_1["default"]("z-30 absolute w-72 mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none") }, (_b = item.subMenuItems) === null || _b === void 0 ? void 0 : _b.map(function (subMenu, key) {
                                                return (!subMenu.subMenuItems ?
                                                    (React.createElement("div", { key: key, className: 'inline-flex px-2 py-2 w-full rounded-md text-sm text-gray-700 ' },
                                                        React.createElement(react_2.Popover.Button, { as: Link_1.Link, href: subMenu === null || subMenu === void 0 ? void 0 : subMenu.href, className: classnames_1["default"](router.pathname === (subMenu === null || subMenu === void 0 ? void 0 : subMenu.href) && 'bg-gray-100', 'group flex rounded-md text-start items-center w-full px-2 py-2 text-sm transition duration-500 ease-in-out hover:bg-gray-100') },
                                                            (subMenu === null || subMenu === void 0 ? void 0 : subMenu.icon) && (React.createElement(subMenu.icon, { className: "flex-shrink-0 h-6 w-6 text-green-700", "aria-hidden": "true" })),
                                                            React.createElement("div", { className: "ml-4", "aria-hidden": "true" },
                                                                React.createElement("p", { className: "font-medium text-gray-900" }, subMenu.name),
                                                                (subMenu === null || subMenu === void 0 ? void 0 : subMenu.description) && (React.createElement("p", { className: "text-sm text-gray-500" }, subMenu === null || subMenu === void 0 ? void 0 : subMenu.description)))))) :
                                                    (React.createElement("div", { key: key },
                                                        React.createElement(react_2.Popover, null, function (_a) {
                                                            var _b;
                                                            var menuOpen = _a.open, menuClose = _a.close;
                                                            return (React.createElement(React.Fragment, null,
                                                                React.createElement("div", { className: 'px-2 py-2 w-full text-start' },
                                                                    React.createElement(react_2.Popover.Button, { className: classnames_1["default"](!subMenu.icon ? 'text-sm px-14' : '', "inline-flex w-full rounded-md px-2 py-2 text-sm text-gray-700 transition duration-500 ease-in-out hover:bg-gray-100") },
                                                                        (subMenu === null || subMenu === void 0 ? void 0 : subMenu.icon) && (React.createElement(subMenu.icon, { className: "flex-shrink-0 h-6 w-6 text-green-700", "aria-hidden": "true" })),
                                                                        React.createElement("div", { className: "ml-4", "aria-hidden": "true" },
                                                                            React.createElement("p", { className: "text-base font-medium text-gray-900" }, subMenu.name)),
                                                                        React.createElement("div", { className: 'flex absolute right-0 mr-6' },
                                                                            React.createElement(solid_1.ChevronRightIcon, { className: classnames_1["default"](menuOpen ? 'text-green-700 rotate-180 transform' : 'text-gray-400', 'w-5 h-5 ml-2 -mr-1 transition-all'), "aria-hidden": "true" })))),
                                                                React.createElement(react_2.Transition, { show: menuOpen, enter: "transition duration-100 ease-out", enterFrom: "transform scale-95 opacity-0", enterTo: "transform scale-100 opacity-100", leave: "transition duration-75 ease-out", leaveFrom: "transform scale-100 opacity-100", leaveTo: "transform scale-95 opacity-0" }),
                                                                React.createElement(react_2.Popover.Panel, { className: classnames_1["default"]("z-30 absolute -mr-8 -mt-12 w-72 -right-60 origin-left bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none") }, (_b = subMenu.subMenuItems) === null || _b === void 0 ? void 0 : _b.map(function (subsubMenu, subKey) { return (React.createElement("div", { key: subKey, className: 'inline-flex px-2 py-2 w-full rounded-md text-sm text-gray-700' },
                                                                    React.createElement(react_2.Popover.Button, { as: Link_1.Link, href: subsubMenu === null || subsubMenu === void 0 ? void 0 : subsubMenu.href, onClick: close, className: classnames_1["default"](!(subsubMenu === null || subsubMenu === void 0 ? void 0 : subsubMenu.icon) && 'pl-8', router.pathname === (subsubMenu === null || subsubMenu === void 0 ? void 0 : subsubMenu.href) && 'bg-gray-100', 'group flex rounded-md text-start items-center w-full px-2 py-2 text-sm transition duration-500 ease-in-out hover:bg-gray-100') },
                                                                        (subsubMenu === null || subsubMenu === void 0 ? void 0 : subsubMenu.icon) && (React.createElement(subsubMenu.icon, { className: "flex-shrink-0 h-6 w-6 text-green-700", "aria-hidden": "true" })),
                                                                        React.createElement("div", { className: "ml-4", "aria-hidden": "true" },
                                                                            React.createElement("p", { className: "text-sm font-medium text-gray-900" }, subsubMenu.name),
                                                                            (subsubMenu === null || subsubMenu === void 0 ? void 0 : subsubMenu.description) && (React.createElement("p", { className: "mt-1 text-sm text-gray-500" }, subsubMenu === null || subsubMenu === void 0 ? void 0 : subsubMenu.description)))))); }))));
                                                        }))));
                                            })))));
                                })))); }))),
                        React.createElement("div", { className: 'hidden lg:flex lg:flex-row' }, !session && (React.createElement("div", { className: "px-2 lg:space-x-2" },
                            React.createElement(Link_1.Link, { href: "/login", className: "bg-green-700 shadow text-sm px-6 py-3 \n                    text-white rounded-lg hover:text-white transition duration-500 ease-in-out hover:bg-green-600\n                    transform hover:-translate-y-1 hover:scale-105" }, "Fazer login"),
                            React.createElement(Link_1.Link, { href: "/signup", className: "bg-gray-100 shadow text-sm px-6 py-3\n                    text-green-700 rounded-lg hover:text-green-600 transition duration-500 ease-in-out hover:bg-gray-200\n                    transform hover:-translate-y-1 hover:scale-105" }, "Cadastre-se"))))),
                    session && (React.createElement("div", { className: "hidden md:block" },
                        React.createElement("div", { className: "ml-4 flex items-center md:ml-6" },
                            React.createElement("button", { type: "button", className: "bg-gray-200 p-1 rounded-full text-gray-400 hover:text-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-green-800 focus:ring-white", onClick: changeProjetoModal },
                                React.createElement("span", { className: "sr-only" }, "View notifications"),
                                React.createElement("svg", { className: 'fill-gray-800', xmlns: "http://www.w3.org/2000/svg", width: "24", height: "24", viewBox: "0 0 24 24" },
                                    React.createElement("path", { d: "M9 12l-4.463 4.969-4.537-4.969h3c0-4.97 4.03-9 9-9 2.395 0 4.565.942 6.179 2.468l-2.004 2.231c-1.081-1.05-2.553-1.699-4.175-1.699-3.309 0-6 2.691-6 6h3zm10.463-4.969l-4.463 4.969h3c0 3.309-2.691 6-6 6-1.623 0-3.094-.65-4.175-1.699l-2.004 2.231c1.613 1.526 3.784 2.468 6.179 2.468 4.97 0 9-4.03 9-9h3l-4.537-4.969z" }))),
                            React.createElement(react_2.Menu, { as: "div", className: "ml-3 relative" },
                                React.createElement("div", null,
                                    React.createElement(react_2.Menu.Button, { className: "max-w-xs bg-gray-700 rounded-full flex items-center text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-green-700 focus:ring-white" },
                                        React.createElement("span", { className: "sr-only" }, "Open user menu"),
                                        React.createElement("img", { className: "h-8 w-10 rounded-full", src: session && ((_b = session.user) === null || _b === void 0 ? void 0 : _b.image) !== null ? ((_c = session.user) === null || _c === void 0 ? void 0 : _c.image) || 'https://img.icons8.com/office/80/000000/administrator-male--v1.png' : '', alt: "" }))),
                                React.createElement(react_2.Transition, { as: react_1.Fragment, enter: "transition ease-out duration-100", enterFrom: "transform opacity-0 scale-95", enterTo: "transform opacity-100 scale-100", leave: "transition ease-in duration-75", leaveFrom: "transform opacity-100 scale-100", leaveTo: "transform opacity-0 scale-95" },
                                    React.createElement(react_2.Menu.Items, { className: "origin-top-right absolute z-20 right-0 mt-2 w-48 shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none" }, userNavigation.map(function (item, key) { return (React.createElement(react_2.Menu.Item, { key: key }, function (_a) {
                                        var active = _a.active;
                                        return (React.createElement(react_2.Disclosure.Button, { as: 'a', href: item.href, className: classnames_1["default"](active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700'), onClick: item.click, "aria-hidden": "true" }, item.name));
                                    })); }))))))),
                    React.createElement("div", { className: "-mr-2 flex md:hidden" },
                        React.createElement(react_2.Disclosure.Button, { className: "bg-gray-200 inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-green-700 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-green-700 focus:ring-white" },
                            React.createElement("span", { className: "sr-only" }, "Open main menu"),
                            open ? (React.createElement(outline_1.XIcon, { className: "block h-6 w-6", "aria-hidden": "true" })) : (React.createElement(outline_1.MenuIcon, { className: "block h-6 w-6", "aria-hidden": "true" })))))),
            React.createElement(react_2.Disclosure.Panel, { className: "md:hidden" },
                React.createElement("div", { className: "px-2 pt-2 pb-3 space-y-1 sm:px-3" }, navigation.map(function (item, key) { return (item.visible &&
                    (!item.subMenu ?
                        (React.createElement(react_2.Disclosure.Button, { key: key, as: "a", href: item.href, className: classnames_1["default"](item.current ? 'bg-green-700 text-white' : 'text-gray-700 hover:bg-green-700 hover:text-white', 'block px-3 py-2 rounded-md text-sm font-medium transition-all'), "aria-current": item.current ? 'page' : undefined }, item.name)) :
                        (React.createElement(react_2.Popover, { as: "div", className: "w-full", key: key }, function (_a) {
                            var _b;
                            var open = _a.open;
                            return (React.createElement(React.Fragment, null,
                                React.createElement("div", null,
                                    React.createElement(react_2.Popover.Button, { className: "inline-flex w-full rounded-md px-3 py-2 font-medium text-gray-700 hover:text-white transition duration-500 ease-in-out hover:bg-green-700" },
                                        item.name,
                                        open ? (React.createElement(solid_1.ChevronUpIcon, { className: classnames_1["default"](open ? 'text-gray-400' : 'text-gray-400', 'w-5 h-5 ml-4 -mr-1'), "aria-hidden": "true" })) : (React.createElement(solid_1.ChevronDownIcon, { className: classnames_1["default"](open ? 'text-gray-400' : 'text-gray-400', 'w-5 h-5 ml-4 -mr-1'), "aria-hidden": "true" })))),
                                React.createElement(react_2.Transition, { as: react_1.Fragment, enter: "transition ease-out duration-100", enterFrom: "transform opacity-0 scale-95", enterTo: "transform opacity-100 scale-100", leave: "transition ease-in duration-75", leaveFrom: "transform opacity-100 scale-100", leaveTo: "transform opacity-0 scale-95" },
                                    React.createElement(react_2.Popover.Panel, { className: "z-30 relative lg:right-0 w-full mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" }, (_b = item.subMenuItems) === null || _b === void 0 ? void 0 : _b.map(function (subMenu, subkey) { return (React.createElement("div", { className: 'px-2 py-2', key: subkey, "aria-hidden": "true" }, !subMenu.subMenuItems ? (React.createElement(react_2.Disclosure.Button, { as: Link_1.Link, href: subMenu.href, className: classnames_1["default"]('hover:bg-gray-100', 'group flex rounded-md items-center w-full px-2 py-2 text-sm'), "aria-hidden": "true" },
                                        (subMenu === null || subMenu === void 0 ? void 0 : subMenu.icon) && (React.createElement(subMenu.icon, { className: "flex-shrink-0 h-6 w-6 text-green-700", "aria-hidden": "true" })),
                                        React.createElement("div", { className: "ml-4" },
                                            React.createElement("p", { className: "text-base font-medium text-gray-900" }, subMenu.name),
                                            (subMenu === null || subMenu === void 0 ? void 0 : subMenu.description) && (React.createElement("p", { className: "mt-1 text-sm text-gray-500" }, subMenu === null || subMenu === void 0 ? void 0 : subMenu.description))))) : (React.createElement(react_2.Popover, { as: "div", className: "w-full", key: subkey }, function (_a) {
                                        var _b;
                                        var open = _a.open;
                                        return (React.createElement(React.Fragment, null,
                                            React.createElement("div", null,
                                                React.createElement(react_2.Popover.Button, { className: "inline-flex w-full rounded-md px-2 py-2 font-medium text-gray-700 hover:text-white transition duration-500 ease-in-out hover:bg-gray-200" },
                                                    (subMenu === null || subMenu === void 0 ? void 0 : subMenu.icon) && (React.createElement(subMenu.icon, { className: "flex-shrink-0 h-6 w-6 text-green-700", "aria-hidden": "true" })),
                                                    React.createElement("div", { className: "ml-4" },
                                                        React.createElement("span", { className: "text-base font-medium text-gray-900" }, subMenu.name)),
                                                    open ? (React.createElement(solid_1.ChevronUpIcon, { className: classnames_1["default"](open ? 'text-gray-400' : 'text-gray-400', 'w-5 h-5 ml-4 -mr-1'), "aria-hidden": "true" })) : (React.createElement(solid_1.ChevronDownIcon, { className: classnames_1["default"](open ? 'text-gray-400' : 'text-gray-400', 'w-5 h-5 ml-4 -mr-1'), "aria-hidden": "true" })))),
                                            React.createElement(react_2.Transition, { as: react_1.Fragment, enter: "transition ease-out duration-100", enterFrom: "transform opacity-0 scale-95", enterTo: "transform opacity-100 scale-100", leave: "transition ease-in duration-75", leaveFrom: "transform opacity-100 scale-100", leaveTo: "transform opacity-0 scale-95" },
                                                React.createElement(react_2.Popover.Panel, { className: "z-30 relative lg:right-0 w-full mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" }, (_b = subMenu.subMenuItems) === null || _b === void 0 ? void 0 : _b.map(function (subsubMenu, subsubKey) { return (React.createElement(react_2.Disclosure.Button, { as: Link_1.Link, key: subsubKey, href: subsubMenu.href, className: classnames_1["default"](!(subsubMenu === null || subsubMenu === void 0 ? void 0 : subsubMenu.icon) && 'pl-10', 'hover:bg-gray-100 pl-4', 'group flex rounded-md items-center w-full px-2 py-2 text-sm'), "aria-hidden": "true" },
                                                    (subsubMenu === null || subsubMenu === void 0 ? void 0 : subsubMenu.icon) && (React.createElement(subsubMenu.icon, { className: "flex-shrink-0 h-6 w-6 text-green-700", "aria-hidden": "true" })),
                                                    React.createElement("div", { className: "ml-4" },
                                                        React.createElement("p", { className: "text-base font-medium text-gray-900" }, subsubMenu.name),
                                                        (subsubMenu === null || subsubMenu === void 0 ? void 0 : subsubMenu.description) && (React.createElement("p", { className: "mt-1 text-sm text-gray-500" }, subsubMenu === null || subsubMenu === void 0 ? void 0 : subsubMenu.description))))); })))));
                                    })))); })))));
                        })))); })),
                session ? (React.createElement("div", { className: "pt-4 pb-3 border-t border-gray-700" },
                    React.createElement("div", { className: "flex items-center px-5" },
                        React.createElement("div", { className: "flex-shrink-0" }, session && ((_d = session.user) === null || _d === void 0 ? void 0 : _d.image) ? (React.createElement("img", { className: "h-10 w-10 rounded-full", src: (_e = session.user) === null || _e === void 0 ? void 0 : _e.image, alt: "" })) : (React.createElement("div", null, "ImG"))),
                        React.createElement("div", { className: "ml-3" },
                            React.createElement("div", { className: "text-base font-medium leading-none text-gray-600" }, session && ((_f = session.user) === null || _f === void 0 ? void 0 : _f.name)),
                            React.createElement("div", { className: "text-sm font-medium leading-none text-gray-400" }, session && ((_g = session.user) === null || _g === void 0 ? void 0 : _g.email))),
                        React.createElement("button", { type: "button", className: "ml-auto bg-gray-300 flex-shrink-0 p-1 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white", onClick: changeProjetoModal },
                            React.createElement("span", { className: "sr-only" }, "View notifications"),
                            React.createElement("svg", { className: 'fill-gray-800', xmlns: "http://www.w3.org/2000/svg", width: "24", height: "24", viewBox: "0 0 24 24" },
                                React.createElement("path", { d: "M9 12l-4.463 4.969-4.537-4.969h3c0-4.97 4.03-9 9-9 2.395 0 4.565.942 6.179 2.468l-2.004 2.231c-1.081-1.05-2.553-1.699-4.175-1.699-3.309 0-6 2.691-6 6h3zm10.463-4.969l-4.463 4.969h3c0 3.309-2.691 6-6 6-1.623 0-3.094-.65-4.175-1.699l-2.004 2.231c1.613 1.526 3.784 2.468 6.179 2.468 4.97 0 9-4.03 9-9h3l-4.537-4.969z" })))),
                    React.createElement("div", { className: "mt-3 px-2 space-y-1", "aria-hidden": "true" }, userNavigation.map(function (item, key) { return (React.createElement(react_2.Disclosure.Button, { key: key, as: Link_1.Link, href: item.href, className: "block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-white hover:bg-green-700", onClick: item.click, "aria-hidden": "true" }, item.name)); })))) : (React.createElement("div", { className: "px-3 pb-2 -mt-1" },
                    React.createElement(Link_1.Link, { href: "/login", className: "block px-2 py-2 rounded-md text-base text-gray-700 hover:text-white hover:bg-green-700 hover:transition-all" }, "Login"))))));
    }));
}
exports["default"] = Navigation;
