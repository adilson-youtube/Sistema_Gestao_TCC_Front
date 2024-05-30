import { Component, Input, OnInit } from '@angular/core';
import { MediaObserver, MediaChange } from '@angular/flex-layout';
import { Router } from '@angular/router';
import { DeviceDetectorService } from 'ngx-device-detector';
import { ConfirmationService, MessageService, PrimeNGConfig } from 'primeng/api';
import { Table } from 'primeng/table';
import { Subscription } from 'rxjs';
import { Area } from 'src/app/modelo/entidades/area';
import { Estudante } from 'src/app/modelo/entidades/estudante';
import { Professor } from 'src/app/modelo/entidades/professor';
import { TFC } from 'src/app/modelo/entidades/tfc';
import { Traducao } from 'src/app/modelo/traducoes/traducao';
import { AreaService } from 'src/app/servicos/area.service';
import { AuthenticationService } from 'src/app/servicos/authentication.service';
import { EstudanteService } from 'src/app/servicos/estudante.service';
import { ProfessorService } from 'src/app/servicos/professor.service';
import { TFCService } from 'src/app/servicos/tfc.service';

@Component({
  selector: 'app-enviar',
  templateUrl: './enviar.component.html',
  styleUrls: ['./enviar.component.css'],
  providers:[ConfirmationService, MessageService],
})
export class EnviarComponent implements OnInit {

  nova = true;
  exibir = false;
  validar: boolean;
  parametro: string;
  exibirDetalhes = false;
  tfc: TFC;
  tfcs: Array<TFC>;
  professores: Array<Professor>;
  professorSelecionado: Professor;
  areas: Array<Area>;
  areaSelecionado: Area;
  estudante: Estudante = new Estudante();
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
    private config: PrimeNGConfig,
    public mediaObserver: MediaObserver,
    private deviceService: DeviceDetectorService,
    //private confirmationService: ConfirmationService,
    private authenticationService: AuthenticationService,
    private tfcServico: TFCService,
    private areaServico: AreaService,
    private professorServico: ProfessorService,
    private estudanteService: EstudanteService, 
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.parametro = this.router.url.substring(1, 12);

    const deviceInfo = this.deviceService.getDeviceInfo();
    
    this.areaServico.listarAreas().subscribe( resultados => { this.areas = resultados; });
    this.professorServico.listarProfessores().subscribe( resultados => { this.professores = resultados; });

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
    this.tfc = new TFC();

    this.config.setTranslation(this.translation.translation);

    this.userInfo = this.authenticationService.getDecodedToken();

  }
  

  get cabecario(): string {
    const texto = this.tfc ? 'Adiconar Proposta' : 'Editar Proposta';
    return texto;
  }


  modal(tfc?: TFC): void {
    this.tfc = tfc;
    this.exibir = true;
    this.validar = false;
  }

  cancelar(): void {
    this.exibir = false;
    this.validar = false;
    this.areaSelecionado = new Area();
    this.professorSelecionado = new Professor();
    this.tfc = new TFC();
  }

  salvar(): void {
    this.tfc;
    this.validar = true;
    var auxTfcs = new Array<TFC>();

    if (this?.tfc?.titulo && this?.tfc?.descricao && this?.areaSelecionado?.id && this?.professorSelecionado?.id) {
      if (this.isRole("Estudante")) {
        this.tfc.idEstudante = Number(this.userInfo.id);
        this.tfc.idProfessor = this.professorSelecionado.id;
        this.tfc.professor = this.professorSelecionado;
        // this.tfc.respostaEstudante = true;
        this.estudanteService.procurarEstudantePorId(Number(this.userInfo.id)).subscribe( resultado => {
          this.tfc.estudante = resultado;
        });
      }
      
      if (this.isRole("Professor")) {
        this.tfc.idProfessor = Number(this.userInfo.id);
        // this.tfc.respostaProfessor = true;
        this.professorServico.procurarProfessorPorId(Number(this.userInfo.id)).subscribe( resultado => {
          this.tfc.professor = resultado;
        });
      }
      
      this.tfc.idArea = this.areaSelecionado.id;
      this.tfc.area = this.areaSelecionado;
      
      this.tfcServico.TFCEstudante(this.userInfo.id).subscribe(tfcs => {
        auxTfcs = tfcs;

        if (auxTfcs.length>=1) {
          this.notificacaoMsg("warn", "Proposta de TFC", "Não pode enviar mais de uma Proposta!");
        } else {
  
          if (this.tfc) {
            this.tfcServico.salvarTFC(this.tfc).subscribe(resultado => {
              this.notificacaoMsg("success", "Proposta de TFC", "A Proposta foi enviada com sucesso!");
              this.cancelar();
            }); 
          }
          console.log("TFC pronto para defender!");
        }
      });
      
    } else {
      console.log("Os dados devem ser preenchidos.");
      
    }

  }

  limpar(tabela: Table) {
    tabela.clear();
  }

  modalDetalhes(tfc: TFC): void {
    this.tfc = tfc;
    this.exibirDetalhes = true;
  }

  isRole(role: string): boolean {
    return this.authenticationService.isRole(role);
  }

  getInfoUser() {
    this.userInfo = this.authenticationService.getDecodedToken();
  }

  notificacaoMsg(tipoNotificacao?: string, cabecario?: string, msg?: string) {
    this.messageService.add({severity: tipoNotificacao, summary:cabecario, detail: msg});
  }
  
}
