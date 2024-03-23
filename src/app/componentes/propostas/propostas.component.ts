import { Component, Input, OnInit } from '@angular/core';
import { MediaObserver, MediaChange } from '@angular/flex-layout';
import { Router } from '@angular/router';
import { DeviceDetectorService } from 'ngx-device-detector';
import { ConfirmationService, MessageService, PrimeNGConfig } from 'primeng/api';
import { Table } from 'primeng/table';
import { Subscription } from 'rxjs';
import { Area } from 'src/app/modelo/entidades/area';
import { Candidato } from 'src/app/modelo/entidades/candidato';
import { Funcionario } from 'src/app/modelo/entidades/funcionario';
import { Orgao } from 'src/app/modelo/entidades/orgao';
import { Professor } from 'src/app/modelo/entidades/professor';
import { Proposta } from 'src/app/modelo/entidades/proposta';
import { Estado } from 'src/app/modelo/enumerados/Estado';
import { EstadoProposta } from 'src/app/modelo/enumerados/estadoProposta';
import { Traducao } from 'src/app/modelo/traducoes/traducao';
import { AreaService } from 'src/app/servicos/area.service';
import { AuthenticationService } from 'src/app/servicos/authentication.service';
import { CandidatoServico } from 'src/app/servicos/candidatoservico.service';
import { FuncionarioServico } from 'src/app/servicos/funcionarioservico.service';
import { OrgaoServico } from 'src/app/servicos/orgaoservico.service';
import { ProfessorService } from 'src/app/servicos/professor.service';
import { PropostaService } from 'src/app/servicos/proposta.service';

@Component({
  selector: 'app-propostas',
  templateUrl: './propostas.component.html',
  styleUrls: ['./propostas.component.css'],
  providers:[ConfirmationService, MessageService],
})
export class PropostasComponent implements OnInit {

  nova = true;
  exibir = false;
  validar: boolean;
  parametro: string;
  areas: Array<Area>;
  orgaos: Array<Orgao>; 
  //dadosDeUso: DadosDeUso;
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
    private propostaServico: PropostaService,
    private confirmationService: ConfirmationService, 
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.parametro = this.router.url.substring(1, 12);

    const deviceInfo = this.deviceService.getDeviceInfo();

    // this.orgaoServico.listarAreas().subscribe(resultados => { this.areas = resultados; });

    // this.orgaoServico.listarOrgaos().subscribe( resultados => { this.orgaos = resultados; }); 

    // this.candidatoServico.listarCandidatos().subscribe( resultados => { this.candidatos = resultados; }); 

    // this.areaService.listarAreas().subscribe( resultados => { 
    //   this.areas = resultados; 
    // });  

    // this.propfessorServico.listarProfessores().subscribe( resultados => { 
    //   this.professores = resultados; 
    // }); 

    this.propostaServico.listarPropostas().subscribe( resultados => { 
      this.propostas = resultados; 
    });

    
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
    this.confirmationService.confirm({
      message: "Deseja Aceita o Tema?",
      accept: () => {
        console.log("Tema Aceita com Sucesso!");
        if (proposta) {
          this.proposta.respostaEstudante = true;
          if (proposta.respostaEstudante && proposta.respostaProfessor) {
            proposta.estado = EstadoProposta.Aprovado;
          }
          console.log("O estado foi alterado: "+JSON.stringify(this.proposta));
          this.salvar();
          this.notificacaoMsg("success", "Alteração de Estado", "O Tema foi aceite com Sucesso!");
        }
      },
      reject: () => {
        this.notificacaoMsg("error", "Alteração de Estado", "O Tema não foi aceite!");
      }
    });
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
        return "Pendente"
        break;
      case 1:
        return "Activo";
        break;
      
      case 2:
        return "Inativo";
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
        return "Pendente";
        break;
    }
  }

  notificacaoMsg(tipoNotificacao?: string, cabecario?: string, msg?: string) {
    this.messageService.add({severity: tipoNotificacao, summary:cabecario, detail: msg});
  }

  // findArea(id: number): string  {
  //   const area = this.areas ? this.areas.find(o => o.id === id) : null;
  //   return area ? area.descricao : 'Não Definida';
  // }

  // findProfessor(id: number): string  {
  //   const professor = this.professores ? this.professores.find(o => o.id === id) : null;
  //   return professor ? professor.nome : 'Não Definida';
  // }

  // findVoip(id: number): string  {
  //   const area = this.areas ? this.areas.find(o => o.id === id) : null;
  //   return area ? (area.voip ? area.voip: 'Não Definida') : 'Não Definida';
  // }

  // findTelefone(codigo: String): string  {
  //   const candidato = this.candidatos ? this.candidatos.find(c => c.codigo === codigo) : null;
  //   return candidato ? candidato.contactos.telefone1 : 'Não Definida';
  // }

//----- 
}

