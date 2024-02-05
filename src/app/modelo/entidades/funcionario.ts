import { ActualizacaoLaboral } from "./actualizacaoLaboral";

export  class Funcionario {
    /*nif = '';
    nome = '';
    cargo = '';*/
    nip: string;
    codigoDoCandidato: string;
    ultimaActualizacaoLaboral: ActualizacaoLaboral = new ActualizacaoLaboral();
}
