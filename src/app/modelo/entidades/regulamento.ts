import { Apresentacao } from "./apresentacao";
import { Banca } from "./banca";
import { BancaProfessor } from "./bancaprofessor";
import { Professor } from "./professor";
import { TFC } from "./tfc";
import { Usuario } from "./usuario";

export class Regulamento {
    id?;
    titulo = '';
    data = new Date();
    simestre = 0;
    estado = 0;
    // Bancas = new Array<Banca>();
}