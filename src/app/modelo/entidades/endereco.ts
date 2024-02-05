import { Role } from "../enumerados/Role";
import { Animal } from "./animal";
import { Proprietario } from "./prorietario";

export class Endereco {
    id = 0;
    rua?: string = '';
    bairro?: string = '';
    municipio?: string = '';
    proprietarioId?: number = 0;
    // proprietario?: Proprietario = new Proprietario();
}
