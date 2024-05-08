import { Professor } from "./professor";
import { TFC } from "./tfc";
import { TCC } from "./tcc";
import { Usuario } from "./usuario";

export class Coordenador extends Usuario  {
    // id?;
    nome?: string = '';
    matricula?: string = '';
    bilhete?: string = '';
    telefone?: string = '';
    // idUsuario = 0;
    // TFC = new TFC();
    // Usuario = new Usuario();
    // TCC = new TCC();
}