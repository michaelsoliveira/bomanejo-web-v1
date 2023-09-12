import { EstadoType } from "./IEstadoType";

export type UmfType = {
    id: string;
    nome: string;
    municipio: string;
    localizacao: string;
    estado: EstadoType;
}