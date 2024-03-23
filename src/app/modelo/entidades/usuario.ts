import { Role } from "../enumerados/Role";
import { Estudante } from "./estudante";
import { Professor } from "./professor";

export class Usuario {
    id?;
    nomeUsuario?: string;
    email?: string;
    senha?: string;
    role?: Role = Role.Estudante;
    // dataCriacao?: Date = new Date();
    // ultimoAcesso?: Date = new Date();
    // Estudante = new Estudante();
    // Professor = new Professor();
    // proprietario?: Proprietario = new Proprietario();
    // veterinario?: Veterinario = new Veterinario();
}
