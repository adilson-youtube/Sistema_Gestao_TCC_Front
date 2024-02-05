import { Subscription } from 'rxjs';
import { Table } from 'primeng/table';
import { Router } from '@angular/router';
import { Component, OnInit, Input } from '@angular/core';
import { DeviceDetectorService } from 'ngx-device-detector';
import { ConfirmationService, ConfirmEventType, PrimeNGConfig } from 'primeng/api';

import { Orgao } from 'src/app/modelo/entidades/orgao';
//import { Servico } from 'src/app/servicos/servico.service';
import { Traducao } from 'src/app/modelo/traducoes/traducao';
import { Candidato } from 'src/app/modelo/entidades/candidato';
import { MediaChange, MediaObserver } from '@angular/flex-layout';
import { Funcionario } from 'src/app/modelo/entidades/funcionario';
import { OrgaoServico } from 'src/app/servicos/orgaoservico.service';
import { CandidatoServico } from 'src/app/servicos/candidatoservico.service';
import { AuthenticationService } from 'src/app/servicos/authentication.service';
import { FuncionarioServico } from 'src/app/servicos/funcionarioservico.service';


@Component({
  selector: 'app-contactos',
  templateUrl: './contactos.component.html',
  styleUrls: ['./contactos.component.css']
})
export class ContactosComponent implements OnInit {

  nova = true;
  exibir = false;
  validar: boolean;
  parametro: string;
  areas: Array<any>;
  orgaos: Array<Orgao>; 
  //dadosDeUso: DadosDeUso;
  exibirDetalhes = false;
  candidato = new Candidato;
  candidatos: Array<Candidato>;
  funcionario = new Funcionario;
  funcionarios: Array<Funcionario>;

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
    private funcionarioServico: FuncionarioServico,
    //private confirmationService: ConfirmationService,
    private authenticationService: AuthenticationService
  ) { }

  ngOnInit(): void {
    this.parametro = this.router.url.substring(1, 12);

    const deviceInfo = this.deviceService.getDeviceInfo();

    this.orgaoServico.listarAreas().subscribe(resultados => { this.areas = resultados; });

    this.orgaoServico.listarOrgaos().subscribe( resultados => { this.orgaos = resultados; }); 

    this.candidatoServico.listarCandidatos().subscribe( resultados => { this.candidatos = resultados; }); 

    this.funcionarioServico.listarFuncionarios().subscribe( resultados => { this.funcionarios = resultados; });

    
    /*this.dadosDeUso = new DadosDeUso();
    this.dadosDeUso.os = deviceInfo.os;
    this.dadosDeUso.browser = deviceInfo.browser;
    this.dadosDeUso.type = this.deviceService.isMobile ? 'Telefone' :
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
    return 'Editar Contacto - Funcionário';
  }


  modal(funcionario?: Funcionario): void {
    this.candidatoServico.procurarCandidatoPorCodigo(funcionario.codigoDoCandidato).subscribe( resultado => { this.candidato = resultado; }); 
    this.exibir = true;
    this.validar = false;
  }

  cancelar(): void {
    this.exibir = false;
    this.validar = false;
    this.candidato = new Candidato();
  }

  salvar(): void {
    this.validar = true;

    if (this.candidato.contactos.telefone1) {
      this.candidatoServico.salvarCandidato(this.candidato).subscribe(resultado => {
        this.cancelar();
      }); 
    }

  }

  limpar(tabela: Table) {
    tabela.clear();
  }

  modalDetalhes(funcionario: Funcionario): void {
    this.funcionario = funcionario;
    this.exibirDetalhes = true;
  }

  findArea(id: number): string  {
    const area = this.areas ? this.areas.find(o => o.id === id) : null;
    return area ? area.denominacao : 'Não Definida';
  }

  findVoip(id: number): string  {
    const area = this.areas ? this.areas.find(o => o.id === id) : null;
    return area ? (area.voip ? area.voip: 'Não Definida') : 'Não Definida';
  }

  findOrgao(id: number): string  {
    const orgao = this.orgaos ? this.orgaos.find(o => o.id === id) : null;
    return orgao ? orgao.sigla : 'Não Definida';
  }

  findTelefone(codigo: String): string  {
    const candidato = this.candidatos ? this.candidatos.find(c => c.codigo === codigo) : null;
    return candidato ? candidato.contactos.telefone1 : 'Não Definida';
  }

  findBigAnt(codigo: String): string  {
    const candidato = this.candidatos ? this.candidatos.find(c => c.codigo === codigo) : null;
    return candidato ? candidato.contactos.bigAnt : 'Não Definida';
  }

  findNomeCompleto(codigo: String): string  {
    const candidato = this.candidatos ? this.candidatos.find(c => c.codigo === codigo) : null;
    return candidato ? candidato.dadosPessoais.nomeCompleto : 'Não Definida';
  }

//----- 
}
