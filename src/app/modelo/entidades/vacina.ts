import { Servico } from "./servico";


export class Vacina extends Servico {
    //id = 0;
    nome: string = '';
    periodo: number = 0;
    // tipoVacina: string = '';

    constructor() {
        super();
    }
}
