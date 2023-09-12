import { CategoriaEspecieType } from "./ICategoriaEspecieType";

export type EspecieType = {
    id: string;
    nome: string;
    nomeOrgao: string;
    nomeCientifico: string;
    categoria?: CategoriaEspecieType
}