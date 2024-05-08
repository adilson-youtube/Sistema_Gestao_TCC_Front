import { Apresentacao } from "./apresentacao";
import { BancaProfessor } from "./bancaprofessor";
import { Professor } from "./professor";
import { TFC } from "./tfc";
import { Regulamento } from "./regulamento";
import { Usuario } from "./usuario";

export class Banca {
    // Id = 0;
    data = new Date();
    hora = new Date();
    membros = new Array<Professor>();
    // BancasProfessores = new Array<BancaProfessor>();
    // Apresentacoes = new Array<Apresentacao>();
    // Regulamento= new Regulamento();
}