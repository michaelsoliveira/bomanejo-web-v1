"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
exports.Pagination = void 0;
var classnames_1 = require("classnames");
var router_1 = require("next/router");
exports.Pagination = function Pagination(_a) {
    var perPage = _a.perPage, totalItems = _a.totalItems, orderBy = _a.orderBy, order = _a.order, currentPage = _a.currentPage, onPageChanged = _a.onPageChanged, pageNeighbours = _a.pageNeighbours;
    // const [currentPage, setCurrentPage] = useState(1)
    var lastItem = currentPage * perPage;
    var firstItem = lastItem - perPage;
    var router = router_1.useRouter();
    var totalPages = Math.ceil(totalItems / perPage);
    pageNeighbours = typeof pageNeighbours === 'number'
        ? Math.max(0, Math.min(pageNeighbours, 2))
        : 0;
    var gotoPage = function (page) {
        var currentPage = Math.max(0, Math.min(page, totalPages));
        var paginationData = {
            name: router.pathname,
            currentPage: currentPage,
            orderBy: orderBy,
            order: order,
            totalPages: totalPages,
            perPage: perPage,
            totalItems: totalItems
        };
        onPageChanged(paginationData);
    };
    var handleClick = function (page) {
        gotoPage(page);
    };
    var handleMoveLeft = function () {
        var goTo = currentPage - (pageNeighbours * 3) - 1;
        gotoPage(goTo > 0 ? goTo : 1);
    };
    var handleMoveRight = function () {
        gotoPage(currentPage + (pageNeighbours * 3) + 1);
    };
    var LEFT_PAGE = 'LEFT';
    var RIGHT_PAGE = 'RIGHT';
    /**
     * Helper method for creating a range of numbers
     * range(1, 5) => [1, 2, 3, 4, 5]
     */
    var range = function (from, to, step) {
        if (step === void 0) { step = 1; }
        var i = from;
        var range = [];
        while (i <= to) {
            range.push(i);
            i += step;
        }
        return range;
    };
    var fetchPageNumbers = function () {
        /**
         * totalNumbers: the total page numbers to show on the control
         * totalBlocks: totalNumbers + 2 to cover for the left(<) and right(>) controls
         */
        var totalNumbers = (pageNeighbours * 2) + 3;
        var totalBlocks = totalNumbers + 2;
        if (totalPages > totalBlocks) {
            var startPage = Math.max(1, currentPage - pageNeighbours);
            var endPage = Math.min(totalPages - 1, currentPage + pageNeighbours);
            var pages_1 = range(startPage, endPage);
            /**
             * hasLeftSpill: has hidden pages to the left
             * hasRightSpill: has hidden pages to the right
             * spillOffset: number of hidden pages either to the left or to the right
             */
            var hasLeftSpill = startPage > 2;
            var hasRightSpill = (totalPages - endPage) > 1;
            var spillOffset = totalNumbers - (pages_1.length + 1);
            switch (true) {
                // handle: (1) < {5 6} [7] {8 9} (10)
                case (hasLeftSpill && !hasRightSpill): {
                    var extraPages = range(startPage - spillOffset, startPage - 1);
                    pages_1 = __spreadArrays([LEFT_PAGE], extraPages, pages_1);
                    break;
                }
                // handle: (1) {2 3} [4] {5 6} > (10)
                case (!hasLeftSpill && hasRightSpill): {
                    var extraPages = range(endPage + 1, endPage + spillOffset);
                    pages_1 = __spreadArrays(pages_1, extraPages, [RIGHT_PAGE]);
                    break;
                }
                // handle: (1) < {4 5} [6] {7 8} > (10)
                case (hasLeftSpill && hasRightSpill):
                default: {
                    pages_1 = __spreadArrays([LEFT_PAGE], pages_1, [RIGHT_PAGE]);
                    break;
                }
            }
            return __spreadArrays(pages_1, [totalPages]);
        }
        return range(1, totalPages);
    };
    var pages = fetchPageNumbers();
    return (React.createElement("div", { className: "bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6" },
        React.createElement("div", { className: "flex-1 flex justify-between sm:hidden" },
            React.createElement("a", { href: "#", onClick: function (evt) {
                    evt.preventDefault();
                    if (currentPage > 1)
                        gotoPage(currentPage - 1);
                }, className: "relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50" }, "Anterior"),
            React.createElement("a", { href: "#", onClick: function (evt) {
                    evt.preventDefault();
                    if (currentPage < totalPages)
                        gotoPage(currentPage + 1);
                }, className: "ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50" }, "Pr\u00F3xima")),
        React.createElement("div", { className: "hidden sm:flex-1 sm:flex sm:items-center sm:justify-between" },
            React.createElement("div", null,
                React.createElement("p", { className: "text-sm text-gray-700" },
                    "Exibindo de\u00A0",
                    React.createElement("span", { className: "font-medium" }, firstItem),
                    "\u00A0a\u00A0",
                    React.createElement("span", { className: "font-medium" }, lastItem),
                    "\u00A0de\u00A0",
                    React.createElement("span", { className: "font-medium" }, totalItems),
                    "\u00A0resultados")),
            React.createElement("div", null,
                React.createElement("nav", { className: "relative z-0 inline-flex rounded-md shadow-sm -space-x-px", "aria-label": "Pagination" },
                    React.createElement("a", { href: "#", onClick: function (event) {
                            event.preventDefault();
                            if (currentPage > 1)
                                gotoPage(currentPage - 1);
                        }, className: classnames_1["default"]("relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50", currentPage === 1 && "cursor-default") },
                        React.createElement("span", { className: "sr-only" }, "Previous"),
                        React.createElement("svg", { className: "h-5 w-5", xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 20 20", fill: "currentColor", "aria-hidden": "true" },
                            React.createElement("path", { fillRule: "evenodd", d: "M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z", clipRule: "evenodd" }))),
                    pages.map(function (page) {
                        if (page === 'LEFT')
                            return (React.createElement("a", { href: "#", key: page, className: classnames_1["default"]("bg-white border-gray-300 text-gray-500 hover:bg-gray-50", "hidden md:inline-flex relative items-center px-4 py-2 border text-sm font-medium"), onClick: function (evt) {
                                    evt.preventDefault();
                                    handleMoveLeft();
                                } },
                                React.createElement("span", { className: "sr-only" }, "Previous"),
                                React.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", className: "h-5 w-5", viewBox: "0 0 20 20", fill: "currentColor" },
                                    React.createElement("path", { fillRule: "evenodd", d: "M15.707 15.707a1 1 0 01-1.414 0l-5-5a1 1 0 010-1.414l5-5a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 010 1.414zm-6 0a1 1 0 01-1.414 0l-5-5a1 1 0 010-1.414l5-5a1 1 0 011.414 1.414L5.414 10l4.293 4.293a1 1 0 010 1.414z", clipRule: "evenodd" }))));
                        if (page === 'RIGHT')
                            return (React.createElement("a", { href: "#", key: page, className: classnames_1["default"]("bg-white border-gray-300 text-gray-500 hover:bg-gray-50", "hidden md:inline-flex relative items-center px-4 py-2 border text-sm font-medium"), onClick: function (evt) {
                                    evt.preventDefault();
                                    handleMoveRight();
                                } },
                                React.createElement("span", { className: "sr-only" }, "Next"),
                                React.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", className: "h-5 w-5", viewBox: "0 0 20 20", fill: "currentColor" },
                                    React.createElement("path", { fillRule: "evenodd", d: "M10.293 15.707a1 1 0 010-1.414L14.586 10l-4.293-4.293a1 1 0 111.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z", clipRule: "evenodd" }),
                                    React.createElement("path", { fillRule: "evenodd", d: "M4.293 15.707a1 1 0 010-1.414L8.586 10 4.293 5.707a1 1 0 011.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z", clipRule: "evenodd" }))));
                        return (React.createElement("a", { href: "#", key: page, className: classnames_1["default"]((currentPage === page)
                                ? "z-10 bg-indigo-50 border-indigo-500 text-indigo-600 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
                                : "bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium"), onClick: function (evt) {
                                evt.preventDefault();
                                handleClick(page);
                            } }, page));
                    }),
                    React.createElement("a", { href: "#", onClick: function (event) {
                            event.preventDefault();
                            if (currentPage < totalPages)
                                gotoPage(currentPage + 1);
                        }, className: "relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50" },
                        React.createElement("span", { className: "sr-only" }, "Next"),
                        React.createElement("svg", { className: "h-5 w-5", xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 20 20", fill: "currentColor", "aria-hidden": "true" },
                            React.createElement("path", { fillRule: "evenodd", d: "M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z", clipRule: "evenodd" }))))))));
};
