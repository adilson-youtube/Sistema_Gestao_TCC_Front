import { Banca } from "./banca";
import { Estudante } from "./estudante";
import { Professor } from "./professor";
import { Proposta } from "./proposta";
import { TCC } from "./tcc";
import { Usuario } from "./usuario";

export class Apresentacao {
    // Id = 0;
    sala = '';
    data = new Date();
    horaInicio = new Date();
    horaTermino = new Date();
    idBanca = 0;
    idTcc = 0;
    idUsuario = 0;
    // Banca = new Banca();
    // TCC = new TCC();
}