import { Component, Input, OnInit } from '@angular/core';
import { MediaObserver, MediaChange } from '@angular/flex-layout';
import { Router } from '@angular/router';
import { DeviceDetectorService } from 'ngx-device-detector';
import { PrimeNGConfig } from 'primeng/api';
import { Table } from 'primeng/table';
import { Subscription } from 'rxjs';
import { Area } from 'src/app/modelo/entidades/area';
import { Estudante } from 'src/app/modelo/entidades/estudante';
import { Professor } from 'src/app/modelo/entidades/professor';
import { Proposta } from 'src/app/modelo/entidades/proposta';
import { Traducao } from 'src/app/modelo/traducoes/traducao';
import { AreaService } from 'src/app/servicos/area.service';
import { AuthenticationService } from 'src/app/servicos/authentication.service';
import { EstudanteService } from 'src/app/servicos/estudante.service';
import { ProfessorService } from 'src/app/servicos/professor.service';
import { PropostaService } from 'src/app/servicos/proposta.service';

@Component({
  selector: 'app-enviar',
  templateUrl: './enviar.component.html',
  styleUrls: ['./enviar.component.css']
})
export class EnviarComponent implements OnInit {

  nova = true;
  exibir = false;
  validar: boolean;
  parametro: string;
  exibirDetalhes = false;
  proposta = new Proposta();
  propostas: Array<Proposta>;
  professores: Array<Professor>;
  professorSelecionado: Professor;
  areas: Array<Area>;
  areaSelecionado: Area;
  estudante: Estudante;

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
    private propostaServico: PropostaService,
    private areaServico: AreaService,
    private professorServico: ProfessorService,
    private estudanteService: EstudanteService
  ) { }

  ngOnInit(): void {
    this.parametro = this.router.url.substring(1, 12);

    const deviceInfo = this.deviceService.getDeviceInfo();

    // this.orgaoServico.listarAreas().subscribe(resultados => { this.areas = resultados; });

    // this.propostaServico.listarPropostas().subscribe( resultados => { this.propostas = resultados; });
    this.areaServico.listarAreas().subscribe( resultados => { this.areas = resultados; });
    this.professorServico.listarProfessores().subscribe( resultados => { this.professores = resultados; });
    this.estudanteService.listarEstudantes().subscribe( resultado => { 
      this.estudante = resultado.shift();
      console.log("Dados do Usuario: "+this.estudante);
    });

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
    const texto = this.proposta ? 'Adiconar Proposta' : 'Editar Proposta';
    return texto;
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
    this.proposta.idEstudante = this.estudante.id;
    this.proposta.idProfessor = this.professorSelecionado.id;
    this.proposta.idArea = this.areaSelecionado.id;
    this.proposta.estudante = this.estudante;
    this.proposta.professor = this.professorSelecionado;
    this.proposta.area = this.areaSelecionado;
    console.log("Dados do Estudante: "+JSON.stringify(this.proposta.estudante));
    console.log("Dados do Professor: "+ JSON.stringify(this.proposta.professor));
    console.log("Dados do Area: "+ JSON.stringify(this.proposta.area));

    if (this.proposta) {
      this.propostaServico.salvarProposta(this.proposta).subscribe(resultado => {
        this.cancelar();
      }); 
    }

  }

  limpar(tabela: Table) {
    tabela.clear();
  }

  modalDetalhes(proposta: Proposta): void {
    this.proposta = proposta;
    this.exibirDetalhes = true;
  }

  // findArea(id: number): string  {
  //   const area = this.areas ? this.areas.find(o => o.id === id) : null;
  //   return area ? area.denominacao : 'Não Definida';
  // }

  // findVoip(id: number): string  {
  //   const area = this.areas ? this.areas.find(o => o.id === id) : null;
  //   return area ? (area.voip ? area.voip: 'Não Definida') : 'Não Definida';
  // }

  // findOrgao(id: number): string  {
  //   const orgao = this.orgaos ? this.orgaos.find(o => o.id === id) : null;
  //   return orgao ? orgao.sigla : 'Não Definida';
  // }

  // findTelefone(codigo: String): string  {
  //   const candidato = this.candidatos ? this.candidatos.find(c => c.codigo === codigo) : null;
  //   return candidato ? candidato.contactos.telefone1 : 'Não Definida';
  // }

  // findBigAnt(codigo: String): string  {
  //   const candidato = this.candidatos ? this.candidatos.find(c => c.codigo === codigo) : null;
  //   return candidato ? candidato.contactos.bigAnt : 'Não Definida';
  // }
                                                                                                                                                                                                                                                                                                                                                 
  // findNomeCompleto(codigo: String): string  {
  //   const candidato = this.candidatos ? this.candidatos.find(c => c.codigo === codigo) : null;
  //   return candidato ? candidato.dadosPessoais.nomeCompleto : 'Não Definida';
  // }

//----- 
}
