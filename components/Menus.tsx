import {
    BookmarkAltIcon,
    CalendarIcon,
    CogIcon,
    ChartBarIcon,
    CursorClickIcon,
    MenuIcon,
    TemplateIcon,
    PencilIcon,
    RefreshIcon,
    ShieldCheckIcon,
    SupportIcon,
    ViewGridIcon,
    BellIcon,
    TableIcon,
    TagIcon,
    GlobeAltIcon,
    CalculatorIcon
} from '@heroicons/react/outline'
import { DocumentTextIcon } from '@heroicons/react/solid'

export const resources = [
    {
        name: 'UMF',
        description: 'Unidade de Manejo Florestal',
        href: '/umf',
        icon: SupportIcon,
    },
    {
        name: 'UPA',
        description: 'Unidade de Produção Anual',
        href: '/upa',
        icon: BookmarkAltIcon,
    },
    {
        name: 'Equação de Volume',
        description: 'Equações de Volumes',
        href: '/equacao',
        icon: CalculatorIcon,
    },
    {
        name: 'UT',
        description: 'Unidade de Trabalho',
        href: '/ut',
        icon: CalendarIcon,
    },
    {
        name: 'Observações',
        description: 'Observações Padronizadas',
        href: '/obs-arvore',
        faIcon: true,
        icon: DocumentTextIcon,
    },
    {
        name: 'Especies',
        description: 'Espécies Existentes',
        href: '/especie',
        icon: PencilIcon,
    },
    {
        name: 'Categoria de Espécies',
        description: 'Critérios de seleção',
        href: '/categoria-especie',
        icon: TemplateIcon,
    },
    {
        name: 'Grupo Categoria de Espécies',
        description: 'Relaciona Categoria -> Espécie',
        href: '/categoria-especie/grupo',
        icon: CogIcon,
    }

]

export const solutions = [
    {
        name: 'Inventário Florestal',
        description: 'Get a better understanding of where your traffic is coming from.',
        href: '#',
        icon: ChartBarIcon,
    },
    {
        name: 'Manejo Florestal',
        description: 'Speak directly to your customers in a more meaningful way.',
        href: '#',
        icon: CursorClickIcon,
    },
    { name: 'Segurança', description: "Your customers' data will be safe and secure.", href: '#', icon: ShieldCheckIcon },
    {
        name: 'Integração com GIS',
        description: "Connect with third-party tools that you're already using.",
        href: '#',
        icon: ViewGridIcon,
    },
    {
        name: 'Mapeamento',
        description: 'Build strategic funnels that will drive your customers to convert',
        href: '#',
        icon: RefreshIcon,
    },
]

export const planejamento = [
{
    name: 'Cadastro do POA',
    description: 'Planejamento Operacional Anual',
    href: '/poa',
    icon: GlobeAltIcon,
},
{
    name: 'Seleção de Árvores',
    description: 'Seleção de Árvores do POA',
    href: '/process',
    icon: TagIcon,
    },
]

export const estatistica = [
    {
        name: 'Machine Learning',
        description: 'Modelo preditivos baseados em aprendizado de máquina',
        href: '#',
        icon: ChartBarIcon,
    },
    {
        name: 'Rede Neural',
        description: 'Modelos preditivos baseados em Redes Neurais',
        href: '#',
        icon: BellIcon,
    },
    
    ]

export const inventario = [
    {
        name: 'Digitação de Arvores',
        description: 'Realizar cadastramento do invetário obtido em campo',
        href: '/arvore',
        icon: ChartBarIcon,
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
        icon: MenuIcon,
    },
]

export const custodia = [
    {
        name: 'Cadastro de Derrubada',
        description: 'Cadastro de Deburrada',
        href: '#',
        icon: PencilIcon,
    },
    {
        name: 'Cadastro de Toras',
        description: 'Cadastro de Toras',
        href: '#',
        icon: CursorClickIcon,
    },
    {
        name: 'Saída de de Toras',
        description: 'Saída de Toras',
        href: '#',
        icon: TableIcon,
    },
]

export const reports = [
    {
        name: 'Relatório de Espécies',
        // description: 'Cadastro de Deburrada',
        href: '#',
        icon: PencilIcon,
    },
    {
        name: 'Relatório de UTs',
        // description: 'Cadastro de Toras',
        href: '#',
        icon: CursorClickIcon,
    },
    {
        name: 'Relatório de Saída de Toras',
        // description: 'Saída de Toras',
        href: '#',
        icon: TableIcon,
    },
]