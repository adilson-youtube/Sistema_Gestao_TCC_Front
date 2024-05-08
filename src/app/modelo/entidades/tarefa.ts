import { EstadoTarefa } from "../enumerados/estadoTarefa";
import { TFC } from "./tfc";

export class Tarefa {
    id?: number;
    titulo?: string;
    descricao?: string;
    dataEntrega?: Date;
    dataTerminada?: Date;
    estadoTarefa?: EstadoTarefa;
    idFicheiroResposta?: string;
    idFicheiroCorrecao?: string;
    comentarioCorrecao?: string;
    // anexo?: any;
    idTFC?: number;
    // proposta? = new TFC();
}