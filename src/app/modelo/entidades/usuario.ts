import { Role } from "../enumerados/Role";
import { Proprietario } from "./prorietario";
import { Veterinario } from "./veterinario";

export class Usuario {
    // id?: number = 0;
    NomeUsuario?: string = '';
    senha?: string = '';
    email?: string = '';
    role?: Role = Role.Usuario;
    dataCriacao?: Date = new Date();
    ultimoAcesso?: Date = new Date();
    // proprietario?: Proprietario = new Proprietario();
    // veterinario?: Veterinario = new Veterinario();
}
