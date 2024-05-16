import { Apresentacao } from "./apresentacao";
import { BancaProfessor } from "./bancaprofessor";
import { Professor } from "./professor";
import { TFC } from "./tfc";
import { Regulamento } from "./regulamento";
import { Usuario } from "./usuario";
import { Correcao } from "./correcao";

export class Banca {
    id?;
    dataApresentacao?: Date;
    idTFC?: number;
    // hora = new Date();
    // membros = new Array<Professor>();
    bancasProfessores?: Array<BancaProfessor>;
    correcoes?: Array<Correcao>;
    tfc?: TFC;
    // Apresentacoes = new Array<Apresentacao>();
    // Regulamento= new Regulamento();
}