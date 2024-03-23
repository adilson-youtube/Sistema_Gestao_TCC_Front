import { Banca } from "./banca";
import { BancaProfessor } from "./bancaprofessor";
import { Proposta } from "./proposta";
import { Usuario } from "./usuario";

export class Professor extends Usuario {
    // id?;
    nome: string = '';
    bilhete: string = '';
    telefone: string = '';
    // idUsuario = 0;
    // Proposta = new Proposta();
    // Usuario = new Usuario();
    // Bancas = new Array<Banca>();
    // BancasProfessores = new Array<BancaProfessor>();
}