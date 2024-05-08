import { Component, Input, OnInit } from '@angular/core';
import { MediaObserver, MediaChange } from '@angular/flex-layout';
import { Router } from '@angular/router';
import { DeviceDetectorService } from 'ngx-device-detector';
import { ConfirmationService, MessageService, PrimeNGConfig } from 'primeng/api';
import { Table } from 'primeng/table';
import { Subscription } from 'rxjs';
import { Area } from 'src/app/modelo/entidades/area';

import { Professor } from 'src/app/modelo/entidades/professor';
import { TFC } from 'src/app/modelo/entidades/tfc';
import { Estado } from 'src/app/modelo/enumerados/Estado';
import { EstadoTFC } from 'src/app/modelo/enumerados/estadoTFC';
import { Traducao } from 'src/app/modelo/traducoes/traducao';
import { AreaService } from 'src/app/servicos/area.service';
import { AuthenticationService } from 'src/app/servicos/authentication.service';

import { CoordenadorService } from 'src/app/servicos/coordenador.service';
import { EstudanteService } from 'src/app/servicos/estudante.service';

import { ProfessorService } from 'src/app/servicos/professor.service';
import { TFCService } from 'src/app/servicos/tfc.service';

@Component({
  selector: 'app-tfcs',
  templateUrl: './tfcs.component.html',
  styleUrls: ['./tfcs.component.css'],
  providers:[ConfirmationService, MessageService],
})
export class TFCsComponent implements OnInit {

  nova = true;
  exibir = false;
  validar: boolean;
  parametro: string;
  areas: Array<Area>;
  //dadosDeUso: DadosDeUso;
  exibirDetalhes = false;
  tfc = new TFC();
  tfcs: Array<TFC>;
  professores: Array<Professor>;

  estadoTFCSelecionado: EstadoTFC;

  estadoTFCs: any[] = [
    { name: 'Proposta', code: 0 },
    { name: 'Reprovado', code: 1 },
    { name: 'Aprovado', code: 2 },
    { name: 'Em Desenvolvimento', code: 3 },
    { name: 'Finalizado', code: 4 },
    { name: 'Defendido', code: 5 }
  ];
  
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
  
  constructor(
    private router: Router,
    //private servico: Servico,
    private config: PrimeNGConfig,
    public mediaObserver: MediaObserver,
    private deviceService: DeviceDetectorService,
    // private funcionarioServico: FuncionarioServico,
    //private confirmationService: ConfirmationService,
    private authenticationService: AuthenticationService,
    private propfessorServico: ProfessorService,
    private coordenadorServico: CoordenadorService,
    private areaService: AreaService,
    private estudanteService: EstudanteService,
    private tfcServico: TFCService,
    private confirmationService: ConfirmationService, 
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.parametro = this.router.url.substring(1, 12);

    const deviceInfo = this.deviceService.getDeviceInfo();

    // this.propfessorServico.listarProfessores().subscribe( resultados => { 
    //   this.professores = resultados; 
    // }); 

    if(this.isRole("Estudante")) {
      this.tfcServico.ListarTFCsDisponiveisParaEstudante().subscribe( resultados => { 
        this.tfcs = resultados; 
        console.log("TFCs: "+JSON.stringify(this.tfcs));
      });
    }

    if(this.isRole("Professor")) {
      this.tfcServico.ListarTFCsDisponiveisParaProfessor().subscribe( resultados => { 
        this.tfcs = resultados; 
        console.log("TFCs: "+JSON.stringify(this.tfcs));
      });
    }

    if(this.isRole("Coordenador")) {
      this.tfcServico.listarTFCs().subscribe( resultados => { 
        this.tfcs = resultados;
        console.log("TFCs: "+JSON.stringify(this.tfcs));
      });
    }


    // this.tfcServico.listarTFCs().subscribe( resultados => { 
    //   this.tfcs = resultados; 
    //   console.log("TFCs: "+JSON.stringify(this.tfcs));
    // });

    
    /*this.dadosDeUso = new DadosDeUso();
    this.dadosDeUso.os = deviceInfo.os;
    this.dadosDeUso.browser = deviceInfo.browser;
    this.dadosDeUso.type = this.deviceService.isMobile ? ''Telefone :
    (this.deviceService.isTablet ? 'Tablet' : 'Desktop');
    this.dadosDeUso.userAgent = deviceInfo.userAgent;
    this.servico.salvarDadosDeUso(this.dadosDeUso);*/

    this.authenticationService.showMenuEmitter.subscribe( show => this.showAllMenu = show );
    this.authenticationService.showRegisterEmitter.subscribe( register => this.showregister = register );
    this.authenticationService.showLoginEmitter.subscribe( login => this.showlogin = login );
    
    this.mediaSub = this.mediaObserver.media$.subscribe(
      (result: MediaChange) => {
        console.log(result.mqAlias);
        this.deviceXs = result.mqAlias === 'xs' ? true : false;
        this.deviceSm = result.mqAlias === 'sm' ? true : false;
        this.deviceMd = result.mqAlias === 'md' ? true : false;
        this.deviceLg = result.mqAlias === 'lg' ? true : false;
    });

    this.config.setTranslation(this.translation.translation);

  }
  

  get cabecario(): string {
    return 'Editar TFC';
  }


  modal(tfc?: TFC): void {
    // this.tfcServico.procurarTFCPorCodigo(tfc.codigoDoCandidato).subscribe( resultado => { this.tfc = resultado; }); 
    this.tfc = tfc;
    this.exibir = true;
    this.validar = false;
  }

  cancelar(): void {
    this.exibir = false;
    this.validar = false;
    this.tfc = new TFC();
  }

  salvar(): void {
    this.validar = true;

    if (this.tfc?.id>=1) {
      if (this.isRole("Coordenador")) {
        // this.tfc.respostaEstudante = true;
        this.tfc.idCoordenador = Number(this.authenticationService.getDecodedToken().id);
        // this.tfc.estado = this.estadoTFCSelecionado;
        console.log("Id do Coordenador: "+this.tfc.idCoordenador);
        this.coordenadorServico.procurarCoordenadorPorId(this.tfc.idCoordenador).subscribe((coordenador)=> {
          this.tfc.coordenador = coordenador;
          // tfc.estado = EstadoTFC.Aprovado;
        })
      }
      this.tfcServico.actualizarTFC(this.tfc.id, this.tfc).subscribe(resultado => {
        this.tfc = resultado;
        this.notificacaoMsg("success", "TFC", "O estado Tema foi aceite com Sucesso!");
        this.cancelar();
      }); 
    } else {
      this.tfcServico.salvarTFC(this.tfc).subscribe(resultado => {
        this.tfcs.unshift(this.tfc);
        this.cancelar();
      }); 

    }

    // if (this.tfc) {
    //   this.tfcServico.salvarTFC(this.tfc).subscribe(resultado => {
    //     this.tfcs.unshift(this.tfc);
    //     this.cancelar();
    //   }); 
    // }

  }

  alterarEstado(tfc: TFC) {
    this.tfc = tfc;
    console.log("Os Dados da TFC: "+JSON.stringify(this.tfc));
    this.confirmationService.confirm({
      message: "Deseja Aceitar o Tema?",
      accept: () => {
        console.log("Tema Aceita com Sucesso!");
        console.log("Os Dados da TFC: "+JSON.stringify(this.tfc));
        if (tfc) {
          if (this.isRole("Estudante")) {
            this.tfc.respostaEstudante = true;
            this.tfc.idEstudante = Number(this.authenticationService.getDecodedToken().id);
            this.estudanteService.procurarEstudantePorId(this.tfc.idEstudante).subscribe((estudante)=> {
              this.tfc.estudante = estudante;
            })
          } else if (this.isRole("Professor")) {
            this.tfc.respostaProfessor = true;
            this.tfc.idProfessor = Number(this.authenticationService.getDecodedToken().id);
            this.propfessorServico.procurarProfessorPorId(this.tfc.idProfessor).subscribe((professor)=> {
              this.tfc.professor = professor;
            })
          }
          if (this.isRole("Coordenador")) {
            // this.tfc.respostaEstudante = true;
            this.tfc.idCoordenador = Number(this.authenticationService.getDecodedToken().id);
            this.tfc.estado = this.estadoTFCSelecionado;
            this.coordenadorServico.procurarCoordenadorPorId(this.tfc.idCoordenador).subscribe((coordenador)=> {
              this.tfc.coordenador = coordenador;
              // tfc.estado = EstadoTFC.Aprovado;
            })
          }
          if (tfc.respostaEstudante==true && tfc.respostaProfessor==true) {
            tfc.estado = EstadoTFC.Aprovado;
          }
          console.log("O estado foi alterado: "+JSON.stringify(this.tfc));
          this.salvar();
          this.notificacaoMsg("success", "Alteração de Estado", "O estado Tema foi aceite com Sucesso!");
        }
      },
      reject: () => {
        this.notificacaoMsg("error", "Alteração de Estado", "O estado do Tema não foi alterado!");
        if (tfc) {
          if (this.isRole("Estudante")) {
            this.tfc.respostaEstudante = true;
            this.tfc.idEstudante = Number(this.authenticationService.getDecodedToken().id);
          } else if (this.isRole("Professor")) {
            this.tfc.respostaProfessor = true;
            this.tfc.idProfessor = Number(this.authenticationService.getDecodedToken().id);
          }
          if (tfc.respostaEstudante==true && tfc.respostaProfessor==true) {
            tfc.estado = EstadoTFC.Aprovado;
          }
          console.log("O estado foi alterado: "+JSON.stringify(this.tfc));
          this.salvar();
          this.notificacaoMsg("success", "Alteração de Estado", "O estado Tema foi aceite com Sucesso!");
        }
        console.log("Os Dados da TFC Após Ser Rejeitada: "+JSON.stringify(this.tfc));
      }
    });
  }

  isRole(role: string): boolean {
    return this.authenticationService.isRole(role);
  }

  temTarefa(idTarefa: number): boolean {
    // this.tfc
    return idTarefa>=1 ? true : false;
  }

  limpar(tabela: Table) {
    tabela.clear();
  }

  modalDetalhes(tfc: TFC): void {
    this.tfc = tfc;
    this.exibirDetalhes = true;
  }

  findEstadoTFC(estadoTFC: EstadoTFC): string  {
    switch (estadoTFC) {
      case 0:
        return "Proposta"
        break;
      case 1:
        return "Reprovado";
        break;
      
      case 2:
        return "Aprovado";
        break;
      case 3:
        return "Em Desenvolvimento";
        break;
      case 4:
        return "Finalizado";
        break;
      case 5:
        return "Defendido";
        break;
    
      default:
        return "Proposta";
        break;
    }
  }

  notificacaoMsg(tipoNotificacao?: string, cabecario?: string, msg?: string) {
    this.messageService.add({severity: tipoNotificacao, summary:cabecario, detail: msg});
  }

  verTarefas(id: number) {
    console.log("Enviou id "+id);
    this.router.navigateByUrl("/listarActividades", {state: {id}});
    // this.router.navigate(["/listarActividades",  {id: id}]);
  }

  reportTFCs() {
    this.tfcServico.reportTFCs().subscribe(
      response => {
        const blob = new Blob([response], { type: 'application/pdf' }); // Defina o tipo MIME correto
        const url = window.URL.createObjectURL(blob);
        window.open(url);
      },
      error => {
        console.error('Error downloading file:', error);
      }
    );
  }

  // findArea(id: number): string  {
  //   const area = this.areas ? this.areas.find(o => o.id === id) : null;
  //   return area ? area.descricao : 'Não Definida';
  // }

  // findProfessor(id: number): string  {
  //   const professor = this.professores ? this.professores.find(o => o.id === id) : null;
  //   return professor ? professor.nome : 'Não Definida';
  // }

//----- 
}

