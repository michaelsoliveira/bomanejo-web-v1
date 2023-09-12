export type CategoriaEspecieType = {
    id: string;
    nome: string,
    criterio_fuste?: number;
    criterio_dminc?: number;
    criterio_dmaxc?: number;
    criterio_n_min?: number;
    criterio_perc_min?: number;
    criterio_altura?: number;
    criterio_volume?: number;
    preservar: boolean;
}