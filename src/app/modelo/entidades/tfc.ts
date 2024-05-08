import { Estado } from "../enumerados/Estado";
import { EstadoTFC } from "../enumerados/estadoTFC";
import { Area } from "./area";
import { Coordenador } from "./coordenador";
import { Estudante } from "./estudante";
import { Professor } from "./professor";

export class TFC {
    id?;
    titulo?: string = '';
    descricao?: string = '';
    estado?: EstadoTFC = EstadoTFC.Proposta;
    respostaEstudante?: boolean = false;
    respostaProfessor?: boolean = false;
    dataInicio?: Date;
    dataApresentacao?: Date;
    idArea?: number;
    idEstudante?: number;
    idProfessor?: number;
    idCoordenador?: number;
    area? = new Area();
    estudante? = new Estudante();
    professor? = new Professor();
    coordenador? = new Coordenador();
}
