import { Professor } from "./professor";
import { Proposta } from "./proposta";
import { TCC } from "./tcc";
import { Usuario } from "./usuario";

export class Coordenador extends Usuario  {
    // id?;
    nome?: string = '';
    matricula?: string = '';
    bilhete?: string = '';
    telefone?: string = '';
    // idUsuario = 0;
    // Proposta = new Proposta();
    // Usuario = new Usuario();
    // TCC = new TCC();
}