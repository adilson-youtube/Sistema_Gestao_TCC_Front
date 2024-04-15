import { Component, Input, OnInit } from '@angular/core';
import { Area } from 'src/app/modelo/entidades/area';
import { Candidato } from 'src/app/modelo/entidades/candidato';
import { Funcionario } from 'src/app/modelo/entidades/funcionario';
import { Orgao } from 'src/app/modelo/entidades/orgao';
import { Proposta } from 'src/app/modelo/entidades/proposta';
import { EstadoProposta } from 'src/app/modelo/enumerados/estadoProposta';
import { CandidatoServico } from 'src/app/servicos/candidatoservico.service';
import { FuncionarioServico } from 'src/app/servicos/funcionarioservico.service';
import { OrgaoServico } from 'src/app/servicos/orgaoservico.service';

@Component({
  selector: 'app-detalhes',
  templateUrl: './detalhes.component.html',
  styleUrls: ['./detalhes.component.css']
})
export class DetalhesComponent implements OnInit {

  private _proposta: Proposta;

  estadoPropostaSelecionado: EstadoProposta;

  estadoPropostas: any[] = [
    { name: 'Proposta', code: 0 },
    { name: 'Reprovado', code: 1 },
    { name: 'Aprovado', code: 2 },
    { name: 'Em Desenvolvimento', code: 3 },
    { name: 'Finalizado', code: 4 },
    { name: 'Defendido', code: 5 }
  ];

  constructor() { }

  ngOnInit(): void { }

  get proposta(): Proposta {
    return this._proposta;
  }

  @Input()
  set proposta(proposta: Proposta) {
    this._proposta = proposta; 
  }

//----- 
}
