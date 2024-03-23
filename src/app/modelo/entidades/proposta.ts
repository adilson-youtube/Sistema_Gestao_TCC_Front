import { Estado } from "../enumerados/Estado";
import { EstadoProposta } from "../enumerados/estadoProposta";
import { Area } from "./area";
import { Estudante } from "./estudante";
import { Professor } from "./professor";
import { TCC } from "./tcc";

export class Proposta {
    id?;
    titulo?: string = '';
    descricao?: string = '';
    estado?: EstadoProposta = 1;
    respostaEstudante?: boolean = false;
    respostaProfessor?: boolean = false;
    idArea?: number;
    idEstudante?: number;
    idProfessor?: number;
    area? = new Area();
    estudante? = new Estudante();
    professor? = new Professor();
    TCC? = new TCC();
}
