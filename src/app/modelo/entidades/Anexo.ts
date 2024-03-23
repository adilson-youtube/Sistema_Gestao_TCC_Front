import { Apresentacao } from "./apresentacao";
import { Banca } from "./banca";
import { Estudante } from "./estudante";
import { Professor } from "./professor";
import { Proposta } from "./proposta";
import { TCC } from "./tcc";
import { Usuario } from "./usuario";

export class Anexo {
    // Id = 0;
    titulo? = '';
    ficheiro? = '';
    estado? = 1;
    idProposta? = 0;
    dataInicio? = new Date();
    dataApresentacao? = 0;
    idUsuario? = 0;
    // TCC = new TCC();
}