import { Component, Input, OnInit } from '@angular/core';

import { Area } from 'src/app/modelo/entidades/area';
import { Orgao } from 'src/app/modelo/entidades/orgao';
import { Candidato } from 'src/app/modelo/entidades/candidato';
import { Funcionario } from 'src/app/modelo/entidades/funcionario';
import { OrgaoServico } from 'src/app/servicos/orgaoservico.service';
import { CandidatoServico } from 'src/app/servicos/candidatoservico.service';
import { FuncionarioServico } from 'src/app/servicos/funcionarioservico.service';


@Component({
  selector: 'app-detalhes',
  templateUrl: './detalhes.component.html',
  styleUrls: ['./detalhes.component.css']
})
export class DetalhesComponent implements OnInit {

  area = new Area();
  areas: Array<Area>;
  orgao = new Orgao();
  orgaos: Array<Orgao>; 
  candidato = new Candidato;
  candidatos: Array<Candidato>;

  private _funcionario: Funcionario;

  constructor(
    private orgaoServico: OrgaoServico,
    private candidatoServico: CandidatoServico,
    private funcionarioServico: FuncionarioServico
  ) { }

  ngOnInit(): void {
    this.orgaoServico.listarAreas().subscribe(resultados => { this.areas = resultados; });

    this.orgaoServico.listarOrgaos().subscribe( resultados => { this.orgaos = resultados; }); 

    this.candidatoServico.listarCandidatos().subscribe( resultados => { this.candidatos = resultados; }); 
  }

  get funcionario(): Funcionario {
    return this._funcionario;
  }

  @Input()
  set funcionario(funcionario: Funcionario) {
    this._funcionario = funcionario;
    this.area = this.areas ? this.areas.find(o => o.id === funcionario.ultimaActualizacaoLaboral.areaId) : null;
    this.orgao = this.orgaos ? this.orgaos.find(o => o.id === funcionario.ultimaActualizacaoLaboral.orgaoId) : null;
    this.candidato = this.candidatos ? this.candidatos.find(c => c.codigo === funcionario.codigoDoCandidato) : null;   
  }

//----- 
}
