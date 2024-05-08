import { Anexo } from "./Anexo";
import { Apresentacao } from "./apresentacao";
import { Banca } from "./banca";
import { Estudante } from "./estudante";
import { Professor } from "./professor";
import { TFC } from "./tfc";
import { Usuario } from "./usuario";

export class TCC {
    id?;
    tema? = '';
    resumo? = '';
    estado? = 1;
    idTFC? = 0;
    dataInicio? = new Date();
    dataApresentacao? = new Date();
    idUsuario? = 0;
    anexos? = new Array<Anexo>();
    // proposta? = new TFC();
    apresentacoes? = new Array<Apresentacao>();
}