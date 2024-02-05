
import { TipoPagamento } from "../enumerados/tipopagamento";
import { Marcacao } from "./marcacao";

export abstract class Servico {
    // id = 0;
    data: Date = new Date();
    preco: number = 0;
    tipoServico: string = "";
    tipoPagamento: TipoPagamento = TipoPagamento.Cash;
    marcacoes: Array<Marcacao> = [];
}
