import { Apresentacao } from "./apresentacao";
import { Banca } from "./banca";
import { Estudante } from "./estudante";
import { Professor } from "./professor";
import { TFC } from "./tfc";
import { TCC } from "./tcc";
import { Usuario } from "./usuario";

export class Anexo {
    id?;
    nomeFicheiro?: string;
    idFicheiro?: string;
    idTFC?: number;
    // tfc? = new TFC();
}