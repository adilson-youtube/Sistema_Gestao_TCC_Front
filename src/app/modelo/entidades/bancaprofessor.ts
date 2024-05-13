import { Banca } from "./banca";
import { Estudante } from "./estudante";
import { Professor } from "./professor";
import { TFC } from "./tfc";
import { Usuario } from "./usuario";

export class BancaProfessor {
    id?;
    idBanca?: number;
    idProfessor?: number;
    categoria?: string;
    // professor?: Professor;
    // banca?: Banca;
}