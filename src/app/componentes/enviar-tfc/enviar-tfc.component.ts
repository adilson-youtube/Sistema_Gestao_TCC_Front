import { Component, Input, OnInit } from '@angular/core';
import { MediaObserver, MediaChange } from '@angular/flex-layout';
import { Router } from '@angular/router';
import { DeviceDetectorService } from 'ngx-device-detector';
import { PrimeNGConfig, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { Subscription } from 'rxjs';
import { Anexo } from 'src/app/modelo/entidades/Anexo';
import { Area } from 'src/app/modelo/entidades/area';
import { Estudante } from 'src/app/modelo/entidades/estudante';
import { Professor } from 'src/app/modelo/entidades/professor';
import { TFC } from 'src/app/modelo/entidades/tfc';
import { Traducao } from 'src/app/modelo/traducoes/traducao';
import { AnexoService } from 'src/app/servicos/anexo.service';
import { AreaService } from 'src/app/servicos/area.service';
import { AuthenticationService } from 'src/app/servicos/authentication.service';
import { EstudanteService } from 'src/app/servicos/estudante.service';
import { GridfsService } from 'src/app/servicos/gridfs.service';
import { ProfessorService } from 'src/app/servicos/professor.service';
import { TFCService } from 'src/app/servicos/tfc.service';

@Component({
  selector: 'app-enviar-tfc',
  templateUrl: './enviar-tfc.component.html',
  styleUrls: ['./enviar-tfc.component.css']
})
export class EnviarTfcComponent implements OnInit {

  nova = true;
  exibir = false;
  validar: boolean;
  parametro: string;
  exibirDetalhes = false;
  tfc = new TFC();
  tfcs: Array<TFC>;
  areas: Array<Area>;
  anexo: Anexo = new Anexo();
  estudante: Estudante;
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
    private gridfsService: GridfsService,
    private anexoService: AnexoService, 
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.getInfoUser();

    this.parametro = this.router.url.substring(1, 12);

    const deviceInfo = this.deviceService.getDeviceInfo();

    if(this.isRole("Estudante")) {
      const id = Number(this.userInfo.id);
      this.tfcServico.TFCEstudante(id).subscribe( resultados => { 
        this.tfcs = resultados;
        this.tfc = this.tfcs.slice().shift(); 
        console.log("TFCs: "+JSON.stringify(this.tfcs));
      });
    }

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
    const texto = 'Enviar TFC';
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
    this.anexo = new Anexo();
    this.tfc = new TFC();
  }

  salvar(): void {
    this.validar = true;
    if (this.anexo) {
      this.anexo.idTFC = this.tfc.id;
      this.anexoService.salvarAnexo(this.anexo).subscribe(resultado => {
        this.notificacaoMsg("success", "Proposta de TFC", "A Proposta foi enviada com sucesso!");
        this.cancelar();
      });
    }

    // if (this.tfc) {
    //   this.tfcServico.salvarTFC(this.tfc).subscribe(resultado => {
    //     this.notificacaoMsg("success", "Proposta de TFC", "A Proposta foi enviada com sucesso!");
    //     this.cancelar();
    //   }); 
    // }

  }

  uploadFile(event: any) {
    const file = event.target.files[0];
    // const input: HTMLInputElement | null = document.getElementById('file') as HTMLInputElement;
    const fileNameSpan: HTMLSpanElement | null = document.getElementById('file-name') as HTMLSpanElement;
    fileNameSpan.textContent = file.name;
    this.gridfsService.uploadFile(file).subscribe(
      response => {
        console.log('Ficheiro enviado com sucesso:', response);
      },
      error => {
        this.anexo.idFicheiro = error.error.text;
        // this.anexouFicheiro = true;
        console.error('Id do Ficheiro:', this.anexo.idFicheiro);
        console.error('Erro ao enviar o ficheiro:', error);
      }
    );
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
