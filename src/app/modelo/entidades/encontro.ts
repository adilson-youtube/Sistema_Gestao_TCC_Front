import { TFC } from "./tfc";

export class Encontro {
    id?: number;
    data?: Date;
    local?: string = '';
    motivo?: string = '';
    confirmacaoEstudante?: boolean = false;
    confirmacaoProfessor?: boolean = false;
    idTFC?: number;
    // tfc? = new TFC();
}
