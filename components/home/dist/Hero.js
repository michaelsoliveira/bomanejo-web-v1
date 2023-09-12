"use strict";
exports.__esModule = true;
var Hero = function (_a) {
    var session = _a.session;
    return (React.createElement("div", { className: "container mx-auto px-6 py-8" },
        React.createElement("div", null,
            React.createElement("h1", { className: "flex flex-col text-4xl tracking-tight font-bold text-gray-900 sm:text-2xl md:text-6xl lg:text-3xl xl:text-3xl" },
                React.createElement("span", { className: "block text-green-800 xl:inline" }, "BOManejo Web"),
                ' ',
                React.createElement("span", { className: "block text-xl text-gray-600 xl:inline" }, "Invent\u00E1rio Florestal Sustent\u00E1vel")),
            React.createElement("p", { className: "font-roboto mt-3 text-justify text-base text-gray-800 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-lg lg:mx-0 mb-4" }, "O setor florestal brasileiro precisa \u2013 e demanda \u2013 de softwares que agilizem e aprimorem o processo de planejamento florestal, auxiliando na sele\u00E7\u00E3o de \u00E1rvores de corte com base em crit\u00E9rios claros, proporcionando melhor controle sobre a produ\u00E7\u00E3o de madeira e possibilitando o manejo florestal sustent\u00E1vel.")),
        !session && (React.createElement("div", { className: "mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start" },
            React.createElement("div", { className: "" },
                React.createElement("a", { href: "#", className: "w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-green-600 hover:bg-green-700 md:py-4 md:text-lg md:px-10" }, "Iniciar")),
            React.createElement("div", { className: "mt-3 sm:mt-0 sm:ml-3" },
                React.createElement("a", { href: "#", className: "w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-lg text-green-700 bg-green-100 hover:bg-green-200 md:py-4 md:text-lg md:px-10", onClick: function () { } }, "Tutorial"))))));
};
exports["default"] = Hero;
