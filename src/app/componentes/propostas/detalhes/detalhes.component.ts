import { Component, Input, OnInit } from '@angular/core';
import { Area } from 'src/app/modelo/entidades/area';
import { Candidato } from 'src/app/modelo/entidades/candidato';
import { Funcionario } from 'src/app/modelo/entidades/funcionario';
import { Orgao } from 'src/app/modelo/entidades/orgao';
import { TFC } from 'src/app/modelo/entidades/tfc';
import { EstadoTFC } from 'src/app/modelo/enumerados/estadoTFC';
import { CandidatoServico } from 'src/app/servicos/candidatoservico.service';
import { FuncionarioServico } from 'src/app/servicos/funcionarioservico.service';
import { OrgaoServico } from 'src/app/servicos/orgaoservico.service';

@Component({
  selector: 'app-detalhes',
  templateUrl: './detalhes.component.html',
  styleUrls: ['./detalhes.component.css']
})
export class DetalhesComponent implements OnInit {

  private _tfc: TFC;

  estadoTFCSelecionado: EstadoTFC;

  estadoTFCs: any[] = [
    { name: 'Proposta', code: 0 },
    { name: 'Reprovado', code: 1 },
    { name: 'Aprovado', code: 2 },
    { name: 'Em Desenvolvimento', code: 3 },
    { name: 'Finalizado', code: 4 },
    { name: 'Defendido', code: 5 }
  ];

  constructor() { }

  ngOnInit(): void { }

  get tfc(): TFC {
    return this._tfc;
  }

  @Input()
  set tfc(tfc: TFC) {
    this._tfc = tfc; 
  }

//----- 
}
