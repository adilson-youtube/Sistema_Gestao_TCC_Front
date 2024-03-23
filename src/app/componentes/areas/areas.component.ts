import { Table } from 'primeng/table';
import { Component, Input, OnInit } from '@angular/core';

import { Area } from 'src/app/modelo/entidades/area';
import { Orgao } from 'src/app/modelo/entidades/orgao';
import { Servico } from 'src/app/servicos/servico.service';
import { _countGroupLabelsBeforeOption } from '@angular/material/core';
import { AreaService } from 'src/app/servicos/area.service';
import { Subscription } from 'rxjs';
import { Traducao } from 'src/app/modelo/traducoes/traducao';
import { ConfirmationService } from 'primeng/api';

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
  // orgaos: Array<Orgao>;

  private _orgao: any;


  @Input()
  showMenu: boolean = true;
  @Input()
  showHeader: boolean = true;

  showlogin: boolean = false;
  showAllMenu: boolean = false;
  showregister: boolean = false;
  
  deviceXs: boolean;
  deviceSm: boolean;
  deviceMd: boolean;
  deviceLg: boolean;
  mediaSub: Subscription;
  translation = new Traducao;
  
  
  constructor(
    private areaServico: AreaService,
    private confirmationService: ConfirmationService
  ) { }

  ngOnInit(): void {
    // this.servico.listarOrgaos().subscribe(resultados => { this.orgaos = resultados; });

    this.areaServico.listarAreas().subscribe(resultados => { 
      this.areas = resultados; 
      resultados.forEach(a => {
        console.log(a.descricao); 
      });
    });
  }

  get cabecario(): string {
    const texto = this.area?.id ? 'Adiconar Área' : 'Editar Área';
    return texto;
  }

  modal(area: Area): void {
    this.area = area;
    this.exibir = true;
    this.validar = false;
    // this.orgao = this.findOrgao(area.orgaoId);
  }

  cancelar(): void {
    this.exibir = false;
    this.validar = false;
    this.area = new Area();
  }

  salvar(): void {
    this.validar = true;

    if (this.area.id>=1) {
      this.areaServico.actualizarArea(this.area.id, this.area).subscribe(resultado => {
        this.cancelar();
      }); 
    } else {
      this.areaServico.salvarArea(this.area).subscribe(resultado => {
        this.areas.unshift(this.area);
        this.cancelar();
      }); 

    }

    // if (this.area?.descricao) {
    //   this.areaServico.salvarArea(this.area).subscribe(editararea => {
    //     this.areas.unshift(this.area);
    //     this.cancelar();
    //   });
    // }

  }

  eliminarArea(idArea: number) {
    this.confirmationService.confirm({
      message: "Deseja Eliminar a Area?",
      accept: () => {
        console.log("Area Eliminada com Sucesso!");
        this.areas = this.areas.filter(t => t.id != idArea)
        // const t = this.areas.findIndex(t => t.id === idArea);
        // this.areas = this.areas.splice(t,1);
        this.areaServico.eliminarArea(idArea).subscribe();
      }
    });
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

  /* findOrgao(id: number): string  {
    const orgao = this.orgaos ? this.orgaos.find(o => o.id === id) : null;
    return orgao ? (orgao.denominacao +" ("+orgao.sigla+")") : 'Não Definida';
  } */

}
