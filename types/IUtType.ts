import { UpaType } from "./IUpaType";

export interface UtType {
    id: string;
    numero_ut: number;
    area_util: number;
    area_total: number;
    quantidade_faixas: number;
    largura_faixas: number;
    latitude: number;
    longitude: number;
    comprimento_faixas: number;
    upa: UpaType;
}