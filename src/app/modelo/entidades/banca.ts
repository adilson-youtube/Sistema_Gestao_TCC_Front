import { Apresentacao } from "./apresentacao";
import { BancaProfessor } from "./bancaprofessor";
import { Professor } from "./professor";
import { TFC } from "./tfc";
import { Regulamento } from "./regulamento";
import { Usuario } from "./usuario";

export class Banca {
    id?;
    dataApresentacao?: Date;
    idTFC?: number;
    // hora = new Date();
    // membros = new Array<Professor>();
    bancasProfessores?: Array<BancaProfessor>;
    tfc?: TFC;
    // Apresentacoes = new Array<Apresentacao>();
    // Regulamento= new Regulamento();
}