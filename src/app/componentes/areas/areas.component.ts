import { Table } from 'primeng/table';
import { Component, OnInit } from '@angular/core';

import { Area } from 'src/app/modelo/entidades/area';
import { Orgao } from 'src/app/modelo/entidades/orgao';
import { Servico } from 'src/app/servicos/servico.service';
import { _countGroupLabelsBeforeOption } from '@angular/material/core';

@Component({
  selector: 'app-areas',
  templateUrl: './areas.component.html',
  styleUrls: ['./areas.component.css']
})
export class AreasComponent implements OnInit {

  exibir = false;
  validar: boolean;
  area = new Area();
  areas: Array<Area>;
  orgaos: Array<Orgao>;

  private _orgao: any;
  
  constructor(
    private servico: Servico
  ) { }

  ngOnInit(): void {
    this.servico.listarOrgaos().subscribe(resultados => { this.orgaos = resultados; });

    this.servico.listarAreas().subscribe(resultados => { this.areas = resultados;  });
  }

  get cabecario(): string {
    return 'Editar Contactos - Área';
  }

  modal(area: Area): void {
    this.area = area;
    this.exibir = true;
    this.validar = false;
    this.orgao = this.findOrgao(area.orgaoId);
  }

  cancelar(): void {
    this.exibir = false;
    this.validar = false;
    this.area = new Area();
  }

  salvar(): void {
    this.validar = true;

    if (this.area.denominacao && this.area.orgaoId) {
      this.servico.salvarArea(this.area).subscribe(editararea => {
        this.cancelar();
      });
    }

  }

  limpar(tabela: Table) {
    tabela.clear();
  }

  get orgao(): any {
    return this._orgao;
  }

  set orgao(orgao: any) {
     this._orgao = orgao;
     //this.area.orgaoId = orgao.id;
  }

  findOrgao(id: number): string  {
    const orgao = this.orgaos ? this.orgaos.find(o => o.id === id) : null;
    return orgao ? (orgao.denominacao +" ("+orgao.sigla+")") : 'Não Definida';
  }

}
