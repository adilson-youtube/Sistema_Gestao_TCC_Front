import { Role } from "../enumerados/Role";
import { Animal } from "./animal";
import { Endereco } from "./endereco";
import { Usuario } from "./usuario";

export class Proprietario {
    id?: number = 0;
    nome?: string = '';
    telefone?: string = '';
    genero?: string = '';
    dataNascimento?: Date = new Date();
    endereco?: Endereco = new Endereco();
    usuario?: Usuario = new Usuario();
    animais?: Array<Animal> = [];
}
