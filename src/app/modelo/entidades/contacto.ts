import { Area } from './area';
import { Detalhes } from './detalhes';
import { Funcionario } from './funcionario';
export class Contacto {
    id = 0;
    area: Area = new Area();
    detalhes: Detalhes = new Detalhes();
    funcionario: Funcionario = new Funcionario();
}
