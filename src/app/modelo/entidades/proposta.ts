import { Estado } from "../enumerados/Estado";
import { EstadoProposta } from "../enumerados/estadoProposta";
import { Area } from "./area";
import { Coordenador } from "./coordenador";
import { Estudante } from "./estudante";
import { Professor } from "./professor";
import { TCC } from "./tcc";

export class Proposta {
    id?;
    titulo?: string = '';
    descricao?: string = '';
    estado?: EstadoProposta = EstadoProposta.Proposta;
    respostaEstudante?: boolean = false;
    respostaProfessor?: boolean = false;
    idArea?: number;
    idEstudante?: number;
    idProfessor?: number;
    idCoordenador?: number;
    area? = new Area();
    estudante? = new Estudante();
    professor? = new Professor();
    coordenador? = new Coordenador();
    TCC? = new TCC();
}
