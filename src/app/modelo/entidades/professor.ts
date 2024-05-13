import { Banca } from "./banca";
import { BancaProfessor } from "./bancaprofessor";
import { TFC } from "./tfc";
import { Usuario } from "./usuario";

export class Professor extends Usuario {
    // id?;
    nome: string = '';
    bilhete: string = '';
    telefone: string = '';
    // idUsuario = 0;
    // TFC = new TFC();
    // Usuario = new Usuario();
    // Bancas = new Array<Banca>();
    bancasProfessores = new Array<BancaProfessor>();
}