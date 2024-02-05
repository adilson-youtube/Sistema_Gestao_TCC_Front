import { Especie } from "./especie";
import { Marcacao } from "./marcacao";
import { Proprietario } from "./prorietario";

export class Animal {
    // id = 0;
    nome?: string = '';
    sexo?: string = '';
    peso?: number;
    dataNascimento?: Date = new Date();
    especie?: Especie = new Especie();
    proprietario: Proprietario = new Proprietario();
    marcacoes?: Array<Marcacao> = [];
}
