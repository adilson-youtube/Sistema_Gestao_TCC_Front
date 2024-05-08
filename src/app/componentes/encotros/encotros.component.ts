import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ConfirmationService, PrimeIcons } from 'primeng/api';
import { Table } from 'primeng/table';
import { Subscription } from 'rxjs';
import { Encontro } from 'src/app/modelo/entidades/encontro';
import { Traducao } from 'src/app/modelo/traducoes/traducao';
import { EncontroService } from 'src/app/servicos/encontro.service';
import { AuthenticationService } from 'src/app/servicos/authentication.service';
import { TFCService } from 'src/app/servicos/tfc.service';
import { Estudante } from 'src/app/modelo/entidades/estudante';
import { TFC } from 'src/app/modelo/entidades/tfc';

@Component({
  selector: 'app-encotros',
  templateUrl: './encotros.component.html',
  styleUrls: ['./encotros.component.css']
})
export class EncotrosComponent implements OnInit, OnDestroy {

  exibir = false;
  exibirDetalhes = false;
  exibirDetalhesEncontro = false;
  validar: boolean;
  encontro = new Encontro();
  encontros: Array<Encontro>;
  estudanteSelecionado: Estudante = new Estudante();
  estudantes: Array<Estudante>;
  tfc = new TFC();
  tfcs: Array<TFC>;
  
  userInfo: any;

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
  tokenDescodificado = '';

  events: any[];

  meioLocalSelecionado: string;

  meiosLocal: any[] = [
    { name: 'Via WhatApp', code: 'Via WhatApp' },
    { name: 'Via Zoom', code: 'Via Zoom', },
    { name: 'Presencial', code: 'Presencial' }
  ];
  
  
  constructor(
    private encontroServico: EncontroService,
    private confirmationService: ConfirmationService,
    private tfcServico: TFCService,
    private authenticationService: AuthenticationService
  ) { }

  ngOnInit(): void {
    
      //   this.events = [
      //     {status: 'Ordered', date: '15/10/2020 10:30', icon: PrimeIcons.SHOPPING_CART, color: '#9C27B0', image: 'game-controller.jpg'},
      //     {status: 'Processing', date: '15/10/2020 14:00', icon: PrimeIcons.COG, color: '#673AB7'},
      //     {status: 'Shipped', date: '15/10/2020 16:15', icon: PrimeIcons.ENVELOPE, color: '#FF9800'},
      //     {status: 'Delivered', date: '16/10/2020 10:00', icon: PrimeIcons.CHECK, color: '#607D8B'}
      // ];
      
      this.estudantes = new Array<Estudante>();

      this.getInfoUser();
  
      if(this.isRole("Estudante")) {
        const id = Number(this.userInfo.id);
        this.tfcServico.TFCEstudante(id).subscribe( resultados => { 
          this.encontros = resultados;
          console.log("TFCs: "+JSON.stringify(this.encontros));
        });
      }
  
      if(this.isRole("Professor")) {
        const id = Number(this.userInfo.id);
        this.tfcServico.TFCProfessor(id).subscribe( resultados => { 
          this.tfcs = resultados; 
          console.log("TFCs: "+JSON.stringify(this.tfcs));
          this.tfcs.forEach(tfc => {
            this.estudantes.push(tfc.estudante);
          });
        });
      }

    this.encontroServico.listarEncontros().subscribe(resultados => {
      this.encontros = resultados; 
    });
  }

  ngOnDestroy(): void {
      this.estudantes = null;
  }

  get cabecario(): string {
    const texto = this.encontro?.id ? 'Adiconar Encontro' : 'Editar Encontro';
    return texto;
  }

  get detalhesCabecario(): string {
    const texto = 'Detalhes do Encontro';
    return texto;
  }

  modal(encontro: Encontro): void {
    this.encontro = encontro;
    this.exibir = true;
    this.validar = false;
    // this.orgao = this.findOrgao(encontro.orgaoId);
  }

  modalDetalhes(encontro: Encontro): void {
    this.encontro = encontro;
    console.log("Encontro Selecionado: "+JSON.stringify(encontro));
    this.exibirDetalhes = true;
    // this.exibirDetalhesEncontro = true;
  }

  cancelar(): void {
    this.exibir = false;
    this.validar = false;
    this.exibirDetalhes = false;
    // this.exibirDetalhesEncontro = false;
    this.encontro = new Encontro();
  }

  salvar(): void {
    this.validar = true;


    if (this.encontro.id>=1) {
      this.encontroServico.actualizarEncontro(this.encontro.id, this.encontro).subscribe(resultado => {
        this.cancelar();
      }); 
    } else {
      // if (this.encontro.) {
        
      // }
      this.tfcServico.TFCEstudante(this.estudanteSelecionado.id).subscribe( tfc => {
        // this.encontro.tfc = tfc.shift();
        // this.encontro.idTFC = this.encontro.tfc.id;
        this.encontro.idTFC = tfc.shift().id;
        if (!this.meioLocalSelecionado?.includes("Presencial")) {
          this.encontro.local = this.meioLocalSelecionado;
        }
        this.encontroServico.salvarEncontro(this.encontro).subscribe(resultado => {
          this.encontros.unshift(resultado);
          this.cancelar();
        }); 
      });

    }

    // if (this.encontro?.descricao) {
    //   this.encontroServico.salvarEncontro(this.encontro).subscribe(editarencontro => {
    //     this.encontros.unshift(this.encontro);
    //     this.cancelar();
    //   });
    // }

  }

  eliminarEncontro(idEncontro: number) {
    this.confirmationService.confirm({
      message: "Deseja Eliminar a Encontro?",
      accept: () => {
        console.log("Encontro Eliminada com Sucesso!");
        this.encontros = this.encontros.filter(t => t.id != idEncontro)
        // const t = this.encontros.findIndex(t => t.id === idEncontro);
        // this.encontros = this.encontros.splice(t,1);
        this.encontroServico.eliminarEncontro(idEncontro).subscribe();
      }
    });
  }

  isRole(role: string): boolean {
    return this.authenticationService.isRole(role);
  }

  getInfoUser() {
    this.userInfo = this.authenticationService.getDecodedToken();
  }

  limpar(tabela: Table) {
    tabela.clear();
  }


}
