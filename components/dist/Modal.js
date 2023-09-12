"use strict";
exports.__esModule = true;
var react_1 = require("react");
var react_2 = require("@headlessui/react");
var outline_1 = require("@heroicons/react/outline");
var classNames_1 = require("./Utils/classNames");
var ModalContext_1 = require("contexts/ModalContext");
function Modal(props) {
    var _a = ModalContext_1.useModalContext(), store = _a.store, hideModal = _a.hideModal;
    var styleButton = store.styleButton, className = store.className, title = store.title, size = store.size, visible = store.visible, confirmBtn = store.confirmBtn, onConfirm = store.onConfirm, iconType = store.iconType, content = store.content, type = store.type, hookForm = store.hookForm, _b = store.options, options = _b === void 0 ? true : _b;
    var KEY_NAME_ESC = 'Escape';
    var children = props.children;
    var onKeyDown = react_1.useCallback(function (event) {
        if (event.key === KEY_NAME_ESC && visible) {
            hideModal();
        }
    }, [hideModal, visible]);
    react_1.useEffect(function () {
        document.addEventListener('keydown', onKeyDown, false);
        return function () {
            document.removeEventListener('keydown', onKeyDown, false);
        };
    }, [hideModal, onKeyDown]);
    var cancelButtonRef = react_1.useRef(null);
    return (React.createElement(react_2.Transition.Root, { show: visible || false, as: react_1.Fragment },
        React.createElement(react_2.Dialog, { as: "div", className: classNames_1["default"]("fixed z-40 inset-0 overflow-y-auto text-sm", className), initialFocus: cancelButtonRef, onClose: hideModal },
            React.createElement("div", { className: "flex items-center justify-center min-h-screen pt-4 px-4 text-center sm:block sm:p-0 w-full" },
                React.createElement(react_2.Transition.Child, { as: react_1.Fragment, enter: "ease-out duration-300", enterFrom: "opacity-0", enterTo: "opacity-100", leave: "ease-in duration-200", leaveFrom: "opacity-100", leaveTo: "opacity-0" },
                    React.createElement(react_2.Dialog.Overlay, { className: "fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" })),
                React.createElement("span", { className: "hidden sm:inline-block sm:align-middle sm:h-screen", "aria-hidden": "true" }, "\u200B"),
                React.createElement(react_2.Transition.Child, { as: react_1.Fragment, enter: "ease-out duration-300", enterFrom: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95", enterTo: "opacity-100 translate-y-0 sm:scale-100", leave: "ease-in duration-200", leaveFrom: "opacity-100 translate-y-0 sm:scale-100", leaveTo: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95" },
                    React.createElement("div", { className: classNames_1["default"]('w-full inline-block align-bottom bg-white rounded-lg text-left shadow-xl transform transition-all sm:my-8 sm:align-middle', size ? size : 'sm:max-w-md') },
                        React.createElement("div", null,
                            React.createElement("div", { className: "bg-white px-4 rounded-full" },
                                React.createElement("div", { className: "sm:flex sm:items-center py-2 space-x-2" },
                                    (iconType === 'warn') && (React.createElement("div", { className: "mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10" },
                                        React.createElement(outline_1.ExclamationIcon, { className: "h-6 w-6 text-red-600", "aria-hidden": "true" }))),
                                    React.createElement("div", { className: "relative pt-1 w-full" },
                                        React.createElement("div", { className: ' flex flex-row justify-between items-center' },
                                            React.createElement(react_2.Dialog.Title, { as: "h3", className: "text-lg leading-6 font-medium text-gray-900" }, title),
                                            (type && type === 'submit') && (React.createElement("div", { className: classNames_1["default"]('absolute -right-1 hover:cursor-pointer', !title && 'top-1'), onClick: hideModal },
                                                React.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", strokeWidth: "1.5", stroke: "currentColor", className: "w-6 h-6" },
                                                    React.createElement("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M6 18L18 6M6 6l12 12" }))))),
                                        React.createElement("div", { className: "my-3 w-full" }, children ? children : content)))),
                            options && (React.createElement("div", { className: "bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse rounded-b-full" },
                                React.createElement("button", { type: type === "submit" ? 'submit' : 'button', className: classNames_1["default"]('w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 text-base font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm', styleButton), onClick: onConfirm, form: hookForm ? hookForm : '' }, confirmBtn),
                                React.createElement("button", { ref: cancelButtonRef, type: "button", className: "mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm", onClick: hideModal }, "Cancelar"))))))))));
}
exports["default"] = Modal;
