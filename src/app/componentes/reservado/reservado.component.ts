import { Component, Input, OnInit } from '@angular/core';
import { MediaObserver, MediaChange } from '@angular/flex-layout';
import { Router } from '@angular/router';
import { DeviceDetectorService } from 'ngx-device-detector';
import { ConfirmationService, MessageService, PrimeNGConfig } from 'primeng/api';
import { Table } from 'primeng/table';
import { Subscription } from 'rxjs';
import { Area } from 'src/app/modelo/entidades/area';
import { Funcionario } from 'src/app/modelo/entidades/funcionario';
import { Professor } from 'src/app/modelo/entidades/professor';
import { Proposta } from 'src/app/modelo/entidades/proposta';
import { Estado } from 'src/app/modelo/enumerados/Estado';
import { EstadoProposta } from 'src/app/modelo/enumerados/estadoProposta';
import { Traducao } from 'src/app/modelo/traducoes/traducao';
import { AreaService } from 'src/app/servicos/area.service';
import { AuthenticationService } from 'src/app/servicos/authentication.service';
import { CandidatoServico } from 'src/app/servicos/candidatoservico.service';
import { EstudanteService } from 'src/app/servicos/estudante.service';
import { OrgaoServico } from 'src/app/servicos/orgaoservico.service';
import { ProfessorService } from 'src/app/servicos/professor.service';
import { PropostaService } from 'src/app/servicos/proposta.service';

@Component({
  selector: 'app-reservado',
  templateUrl: './reservado.component.html',
  styleUrls: ['./reservado.component.css']
})
export class ReservadoComponent implements OnInit {

  nova = true;
  exibir = false;
  validar: boolean;
  parametro: string;
  areas: Array<Area>;
  exibirDetalhes = false;
  proposta = new Proposta();
  funcionario = new Funcionario;
  propostas: Array<Proposta>;
  professores: Array<Professor>;

  estadoPropostaSelecionado: EstadoProposta;

  estadoPropostas: any[] = [
    { name: 'Pendente', code: 0 },
    { name: 'Activo', code: 1 },
    { name: 'Inativo', code: 2 },
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
    private orgaoServico: OrgaoServico,
    public mediaObserver: MediaObserver,
    private candidatoServico: CandidatoServico,
    private deviceService: DeviceDetectorService,
    // private funcionarioServico: FuncionarioServico,
    //private confirmationService: ConfirmationService,
    private authenticationService: AuthenticationService,
    private propfessorServico: ProfessorService,
    private areaService: AreaService,
    private estudanteService: EstudanteService,
    private propostaServico: PropostaService,
    private confirmationService: ConfirmationService, 
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.parametro = this.router.url.substring(1, 12);

    const deviceInfo = this.deviceService.getDeviceInfo();

    // this.propfessorServico.listarProfessores().subscribe( resultados => { 
    //   this.professores = resultados; 
    // }); 

    this.getInfoUser();

    if(this.isRole("Estudante")) {
      const id = Number(this.userInfo.id);
      this.propostaServico.PropostaEstudante(id).subscribe( resultados => { 
        this.propostas = resultados; 
        console.log("Propostas: "+JSON.stringify(this.propostas));
      });
    }

    if(this.isRole("Professor")) {
      const id = Number(this.userInfo.id);
      this.propostaServico.PropostaProfessor(id).subscribe( resultados => { 
        this.propostas = resultados; 
        console.log("Propostas: "+JSON.stringify(this.propostas));
      });
    }

    // this.propostaServico.listarPropostas().subscribe( resultados => { 
    //   this.propostas = resultados; 
    //   console.log("Propostas: "+JSON.stringify(this.propostas));
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
    return 'Editar Proposta';
  }


  modal(proposta?: Proposta): void {
    // this.propostaServico.procurarPropostaPorCodigo(proposta.codigoDoCandidato).subscribe( resultado => { this.proposta = resultado; }); 
    this.proposta = proposta;
    this.exibir = true;
    this.validar = false;
  }

  cancelar(): void {
    this.exibir = false;
    this.validar = false;
    this.proposta = new Proposta();
  }

  salvar(): void {
    this.validar = true;

    if (this.proposta?.id>=1) {
      this.propostaServico.actualizarProposta(this.proposta.id, this.proposta).subscribe(resultado => {
        this.cancelar();
      }); 
    } else {
      this.propostaServico.salvarProposta(this.proposta).subscribe(resultado => {
        this.propostas.unshift(this.proposta);
        this.cancelar();
      }); 

    }

    // if (this.proposta) {
    //   this.propostaServico.salvarProposta(this.proposta).subscribe(resultado => {
    //     this.propostas.unshift(this.proposta);
    //     this.cancelar();
    //   }); 
    // }

  }

  alterarEstado(proposta: Proposta) {
    this.proposta = proposta;
    console.log("Os Dados da Proposta: "+JSON.stringify(this.proposta));
    this.confirmationService.confirm({
      message: "Deseja Aceitar o Tema?",
      accept: () => {
        console.log("Tema Aceita com Sucesso!");
        console.log("Os Dados da Proposta: "+JSON.stringify(this.proposta));
        if (proposta) {
          if (this.isRole("Estudante")) {
            this.proposta.respostaEstudante = true;
            this.proposta.idEstudante = Number(this.authenticationService.getDecodedToken().id);
            this.estudanteService.procurarEstudantePorId(this.proposta.idEstudante).subscribe((estudante)=> {
              this.proposta.estudante = estudante;
            })
          } else if (this.isRole("Professor")) {
            this.proposta.respostaProfessor = true;
            this.proposta.idProfessor = Number(this.authenticationService.getDecodedToken().id);
            this.propfessorServico.procurarProfessorPorId(this.proposta.idProfessor).subscribe((professor)=> {
              this.proposta.professor = professor;
            })
          }
          if (proposta.respostaEstudante==true && proposta.respostaProfessor==true) {
            proposta.estado = EstadoProposta.Aprovado;
          }
          console.log("O estado foi alterado: "+JSON.stringify(this.proposta));
          this.salvar();
          this.notificacaoMsg("success", "Alteração de Estado", "O estado Tema foi aceite com Sucesso!");
        }
      },
      reject: () => {
        this.notificacaoMsg("error", "Alteração de Estado", "O estado do Tema não foi alterado!");
        if (proposta) {
          if (this.isRole("Estudante")) {
            this.proposta.respostaEstudante = true;
            this.proposta.idEstudante = Number(this.authenticationService.getDecodedToken().id);
          } else if (this.isRole("Professor")) {
            this.proposta.respostaProfessor = true;
            this.proposta.idProfessor = Number(this.authenticationService.getDecodedToken().id);
          }
          if (proposta.respostaEstudante==true && proposta.respostaProfessor==true) {
            proposta.estado = EstadoProposta.Aprovado;
          }
          console.log("O estado foi alterado: "+JSON.stringify(this.proposta));
          this.salvar();
          this.notificacaoMsg("success", "Alteração de Estado", "O estado Tema foi aceite com Sucesso!");
        }
        console.log("Os Dados da Proposta Após Ser Rejeitada: "+JSON.stringify(this.proposta));
      }
    });
  }

  isRole(role: string): boolean {
    return this.authenticationService.isRole(role);
  }

  getInfoUser() {
    this.userInfo = this.authenticationService.getDecodedToken();
  }

  temTarefa(idTarefa: number): boolean {
    // this.proposta
    return idTarefa>=1 ? true : false;
  }

  limpar(tabela: Table) {
    tabela.clear();
  }

  modalDetalhes(proposta: Proposta): void {
    this.proposta = proposta;
    this.exibirDetalhes = true;
  }

  findEstadoProposta(estadoProposta: EstadoProposta): string  {
    switch (estadoProposta) {
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

}
