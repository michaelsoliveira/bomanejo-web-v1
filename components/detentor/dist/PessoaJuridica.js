"use strict";
exports.__esModule = true;
var FormInput_1 = require("../formInput");
var PessoaJuridica = function (_a) {
    var register = _a.register, errors = _a.errors;
    return (React.createElement("div", { className: "grid grid-cols-6 gap-4" },
        React.createElement("div", { className: "col-span-6 md:col-span-3" },
            React.createElement(FormInput_1.FormInput, { name: "pessoaJuridica.razao_social", label: "Raz\u00E3o Social", register: register, errors: errors, rules: { required: 'O campo razão social é obrigatório' }, id: "nome", className: "pb-4" })),
        React.createElement("div", { className: "col-span-6 md:col-span-3" },
            React.createElement(FormInput_1.FormInput, { name: "pessoaJuridica.nome_fantasia", label: "Nome Fantasia", register: register, errors: errors, id: "nome", className: "pb-4" })),
        React.createElement("div", { className: "col-span-3 md:col-span-2" },
            React.createElement(FormInput_1.FormInput, { name: "pessoaJuridica.cpnj", label: "CNPJ", register: register, errors: errors, id: "cpnj", className: "pb-4" })),
        React.createElement("div", { className: "col-span-3 md:col-span-2" },
            React.createElement(FormInput_1.FormInput, { name: "pessoaJuridica.inscricao_estadual", label: "Inscri\u00E7\u00E3o Estadual", register: register, errors: errors, id: "inscricao_estadual", className: "pb-4" })),
        React.createElement("div", { className: "col-span-3 md:col-span-2" },
            React.createElement(FormInput_1.FormInput, { name: "pessoaJuridica.inscricao_federal", label: "Inscri\u00E7\u00E3o Federal", register: register, errors: errors, id: "inscricao_federal", className: "pb-4" }))));
};
exports["default"] = PessoaJuridica;
