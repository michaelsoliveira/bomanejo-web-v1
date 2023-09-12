"use strict";
exports.__esModule = true;
exports.reports = exports.custodia = exports.inventario = exports.estatistica = exports.planejamento = exports.solutions = exports.resources = void 0;
var outline_1 = require("@heroicons/react/outline");
var solid_1 = require("@heroicons/react/solid");
exports.resources = [
    {
        name: 'UMF',
        description: 'Unidade de Manejo Florestal',
        href: '/umf',
        icon: outline_1.SupportIcon
    },
    {
        name: 'UPA',
        description: 'Unidade de Produção Anual',
        href: '/upa',
        icon: outline_1.BookmarkAltIcon
    },
    {
        name: 'Equação de Volume',
        description: 'Equações de Volumes',
        href: '/equacao',
        icon: outline_1.CalculatorIcon
    },
    {
        name: 'UT',
        description: 'Unidade de Trabalho',
        href: '/ut',
        icon: outline_1.CalendarIcon
    },
    {
        name: 'Observações',
        description: 'Observações Padronizadas',
        href: '/obs-arvore',
        faIcon: true,
        icon: solid_1.DocumentTextIcon
    },
    {
        name: 'Especies',
        description: 'Espécies Existentes',
        href: '/especie',
        icon: outline_1.PencilIcon
    },
    {
        name: 'Categoria de Espécies',
        description: 'Critérios de seleção',
        href: '/categoria-especie',
        icon: outline_1.TemplateIcon
    },
    {
        name: 'Grupo Categoria de Espécies',
        description: 'Relaciona Categoria -> Espécie',
        href: '/categoria-especie/grupo',
        icon: outline_1.CogIcon
    }
];
exports.solutions = [
    {
        name: 'Inventário Florestal',
        description: 'Get a better understanding of where your traffic is coming from.',
        href: '#',
        icon: outline_1.ChartBarIcon
    },
    {
        name: 'Manejo Florestal',
        description: 'Speak directly to your customers in a more meaningful way.',
        href: '#',
        icon: outline_1.CursorClickIcon
    },
    { name: 'Segurança', description: "Your customers' data will be safe and secure.", href: '#', icon: outline_1.ShieldCheckIcon },
    {
        name: 'Integração com GIS',
        description: "Connect with third-party tools that you're already using.",
        href: '#',
        icon: outline_1.ViewGridIcon
    },
    {
        name: 'Mapeamento',
        description: 'Build strategic funnels that will drive your customers to convert',
        href: '#',
        icon: outline_1.RefreshIcon
    },
];
exports.planejamento = [
    {
        name: 'Cadastro do POA',
        description: 'Planejamento Operacional Anual',
        href: '/poa',
        icon: outline_1.GlobeAltIcon
    },
    {
        name: 'Seleção de Árvores',
        description: 'Seleção de Árvores do POA',
        href: '/process',
        icon: outline_1.TagIcon
    },
];
exports.estatistica = [
    {
        name: 'Machine Learning',
        description: 'Modelo preditivos baseados em aprendizado de máquina',
        href: '#',
        icon: outline_1.ChartBarIcon
    },
    {
        name: 'Rede Neural',
        description: 'Modelos preditivos baseados em Redes Neurais',
        href: '#',
        icon: outline_1.BellIcon
    },
];
exports.inventario = [
    {
        name: 'Digitação de Arvores',
        description: 'Realizar cadastramento do invetário obtido em campo',
        href: '/arvore',
        icon: outline_1.ChartBarIcon
    },
    //{
    //    name: 'Linkar GPS',
    //    description: 'Linka as posições do GPS com as árvores',
    //    href: '#',
    //    icon: MapIcon
    //},
    {
        name: 'Importar Inventário',
        description: 'Realizar importação de inventário a partir de um dataset',
        href: '/inventario',
        icon: outline_1.MenuIcon
    },
];
exports.custodia = [
    {
        name: 'Cadastro de Derrubada',
        description: 'Cadastro de Deburrada',
        href: '#',
        icon: outline_1.PencilIcon
    },
    {
        name: 'Cadastro de Toras',
        description: 'Cadastro de Toras',
        href: '#',
        icon: outline_1.CursorClickIcon
    },
    {
        name: 'Saída de de Toras',
        description: 'Saída de Toras',
        href: '#',
        icon: outline_1.TableIcon
    },
];
exports.reports = [
    {
        name: 'Relatório de Espécies',
        // description: 'Cadastro de Deburrada',
        href: '#',
        icon: outline_1.PencilIcon
    },
    {
        name: 'Relatório de UTs',
        // description: 'Cadastro de Toras',
        href: '#',
        icon: outline_1.CursorClickIcon
    },
    {
        name: 'Relatório de Saída de Toras',
        // description: 'Saída de Toras',
        href: '#',
        icon: outline_1.TableIcon
    },
];
