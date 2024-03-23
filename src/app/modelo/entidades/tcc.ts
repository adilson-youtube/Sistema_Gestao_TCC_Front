import { Anexo } from "./Anexo";
import { Apresentacao } from "./apresentacao";
import { Banca } from "./banca";
import { Estudante } from "./estudante";
import { Professor } from "./professor";
import { Proposta } from "./proposta";
import { Usuario } from "./usuario";

export class TCC {
    id?;
    tema? = '';
    resumo? = '';
    estado? = 1;
    idProposta? = 0;
    dataInicio? = new Date();
    dataApresentacao? = new Date();
    idUsuario? = 0;
    anexos? = new Array<Anexo>();
    // proposta? = new Proposta();
    apresentacoes? = new Array<Apresentacao>();
}