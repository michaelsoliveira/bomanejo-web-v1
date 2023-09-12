"use strict";
exports.__esModule = true;
exports.Carousel = void 0;
var image_1 = require("next/legacy/image");
var react_1 = require("react");
// Data
var images_json_1 = require("./images.json");
var recursiveTimeout_1 = require("./recursiveTimeout");
var AUTOPLAY_INTERVAL = 6000;
exports.Carousel = function Carousel() {
    var maxScrollWidth = react_1.useRef(0);
    var _a = react_1.useState(0), currentIndex = _a[0], setCurrentIndex = _a[1];
    var carousel = react_1.useRef(null);
    var autoplay = react_1.useCallback(function () {
        if (carousel.current !== null &&
            carousel.current.offsetWidth * currentIndex <= maxScrollWidth.current) {
            setCurrentIndex(function (prevState) { return prevState + 1; });
        }
        else {
            setCurrentIndex(0);
        }
    }, [currentIndex]);
    // returns the play and stop methods
    var _b = recursiveTimeout_1["default"](autoplay, AUTOPLAY_INTERVAL), play = _b.play, stop = _b.stop;
    var movePrev = function () {
        if (currentIndex > 0) {
            setCurrentIndex(function (prevState) { return prevState - 1; });
        }
    };
    var moveNext = function () {
        if (carousel.current !== null &&
            carousel.current.offsetWidth * currentIndex <= maxScrollWidth.current) {
            setCurrentIndex(function (prevState) { return prevState + 1; });
        }
    };
    var isDisabled = function (direction) {
        if (direction === 'prev') {
            return currentIndex <= 0;
        }
        if (direction === 'next' && carousel.current !== null) {
            return (carousel.current.offsetWidth * currentIndex >= maxScrollWidth.current);
        }
        return false;
    };
    react_1.useEffect(function () {
        play();
    }, [play]);
    react_1.useEffect(function () {
        if (carousel !== null && carousel.current !== null) {
            carousel.current.scrollLeft = carousel.current.offsetWidth * currentIndex;
        }
    }, [currentIndex]);
    react_1.useEffect(function () {
        maxScrollWidth.current = carousel.current
            ? carousel.current.scrollWidth - carousel.current.offsetWidth
            : 0;
    }, []);
    return (React.createElement("div", { className: "carousel flex flex-row  w-full my-4 mx-auto border border-green-700" },
        React.createElement("div", { className: "relative overflow-hidden" },
            React.createElement("div", { className: "flex justify-between absolute top left w-full h-full" },
                React.createElement("button", { onClick: movePrev, className: "hover:bg-green-900/75 text-white w-10 h-full text-center opacity-75 hover:opacity-100 disabled:opacity-25 disabled:cursor-not-allowed z-10 p-0 m-0 transition-all ease-in-out duration-300", disabled: isDisabled('prev') },
                    React.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", className: "h-12 w-20 -ml-5", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", strokeWidth: 2 },
                        React.createElement("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M15 19l-7-7 7-7" })),
                    React.createElement("span", { className: "sr-only" }, "Prev")),
                React.createElement("button", { onClick: moveNext, className: "hover:bg-green-900/75 text-white w-10 h-full text-center opacity-75 hover:opacity-100 disabled:opacity-25 disabled:cursor-not-allowed z-10 p-0 m-0 transition-all ease-in-out duration-300", disabled: isDisabled('next') },
                    React.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", className: "h-12 w-20 -ml-5", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", strokeWidth: 2 },
                        React.createElement("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M9 5l7 7-7 7" })),
                    React.createElement("span", { className: "sr-only" }, "Next"))),
            React.createElement("div", { ref: carousel, className: "carousel-container relative flex overflow-hidden scroll-smooth snap-x snap-mandatory touch-pan-x z-0" },
                React.createElement("div", { className: "flex", onMouseOver: stop, onMouseLeave: play }, images_json_1["default"].resources.map(function (resource, index) {
                    return (React.createElement("div", { key: index, className: "carousel-item relative w-96 h-96 snap-start" },
                        React.createElement("a", { href: resource.link, className: "aspect-square block bg-origin-padding bg-left-top bg-cover bg-no-repeat z-0" },
                            React.createElement(image_1["default"], { src: resource.imageUrl || '', alt: resource.title, 
                                //layout='fill'
                                width: 400, height: 400, className: "aspect-square hidden" })),
                        React.createElement("a", { href: resource.link, className: "h-full w-full aspect-square block absolute top-0 left-0 transition-opacity duration-300 opacity-0 hover:opacity-70 bg-green-800/75 z-10" },
                            React.createElement("h3", { className: "text-white py-6 px-3 mx-auto text-center text-xl" }, resource.title))));
                }))))));
};
