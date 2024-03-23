import { EstadoTarefa } from "../enumerados/estadoTarefa";
import { Proposta } from "./proposta";

export class Tarefa {
    id?: number;
    titulo?: string;
    descricao?: string;
    dataEntrega?: Date;
    dataTerminada?: Date;
    estadoTarefa?: EstadoTarefa;
    idProposta?: number;
    // proposta? = new Proposta();
}