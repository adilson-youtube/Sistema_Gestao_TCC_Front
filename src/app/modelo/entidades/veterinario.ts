import { Role } from "../enumerados/Role";
import { Marcacao } from "./marcacao";
import { Usuario } from "./usuario";

export class Veterinario {
    // id = 0;
    nome: string = '';
    genero: string = '';
    especialidade: string = '';
    usuario?: Usuario = new Usuario();
    marcacoes: Array<Marcacao> = [];
}
