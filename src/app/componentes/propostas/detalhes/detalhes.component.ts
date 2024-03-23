import { Component, Input, OnInit } from '@angular/core';
import { Area } from 'src/app/modelo/entidades/area';
import { Candidato } from 'src/app/modelo/entidades/candidato';
import { Funcionario } from 'src/app/modelo/entidades/funcionario';
import { Orgao } from 'src/app/modelo/entidades/orgao';
import { Proposta } from 'src/app/modelo/entidades/proposta';
import { CandidatoServico } from 'src/app/servicos/candidatoservico.service';
import { FuncionarioServico } from 'src/app/servicos/funcionarioservico.service';
import { OrgaoServico } from 'src/app/servicos/orgaoservico.service';

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

  private _proposta: Proposta;

  constructor(
    private orgaoServico: OrgaoServico,
    private candidatoServico: CandidatoServico,
    private propostaServico: FuncionarioServico
  ) { }

  ngOnInit(): void {
    this.orgaoServico.listarAreas().subscribe(resultados => { this.areas = resultados; });

    this.orgaoServico.listarOrgaos().subscribe( resultados => { this.orgaos = resultados; }); 

    this.candidatoServico.listarCandidatos().subscribe( resultados => { this.candidatos = resultados; }); 
  }

  get proposta(): Proposta {
    return this._proposta;
  }

  @Input()
  set proposta(proposta: Proposta) {
    this._proposta = proposta;
    // this.area = this.areas ? this.areas.find(o => o.id === proposta.ultimaActualizacaoLaboral.areaId) : null;
    // this.orgao = this.orgaos ? this.orgaos.find(o => o.id === proposta.ultimaActualizacaoLaboral.orgaoId) : null;
    // this.candidato = this.candidatos ? this.candidatos.find(c => c.codigo === proposta.codigoDoCandidato) : null;   
  }

//----- 
}
