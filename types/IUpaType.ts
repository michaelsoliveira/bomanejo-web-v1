import { EquacaoVolumeType } from "./IEquacaoVolumeType";
import { SpatialRefSysType } from "./IStatialRefSysType";

export type UpaType = {
    id: string;
    descricao: string;
    ano: number;
    tipo: number;
    spatial_ref_sys: SpatialRefSysType;
    equacao_volume: EquacaoVolumeType;
}