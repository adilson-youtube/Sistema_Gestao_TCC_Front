
import { Component, Input, OnInit } from '@angular/core';
import { MediaChange, MediaObserver } from '@angular/flex-layout';
import { Router } from '@angular/router';
import { DeviceDetectorService } from 'ngx-device-detector';
// import { Message, PrimeNGConfig } from 'primeng/api';
import { PrimeNGConfig } from 'primeng/api';
import { Subscription } from 'rxjs';
import { Traducao } from 'src/app/modelo/traducoes/traducao';
import { AuthenticationService } from 'src/app/servicos/authentication.service';
import { NotificacaoService } from 'src/app/servicos/notificacao.service';
import { Message } from 'src/app/modelo/entidades/notificacao';

@Component({
  selector: 'app-enviar-notificacao',
  templateUrl: './enviar-notificacao.component.html',
  styleUrls: ['./enviar-notificacao.component.css']
})
export class EnviarNotificacaoComponent implements OnInit {

  nova = true;
  exibir = false;
  validar: boolean;
  parametro: string;
  exibirDetalhes = false;
  infUser: any;
  mensagem: Message = new Message();
  tituto: string;
  msg: string;

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
    private notificationService: NotificacaoService
  ) { }

  ngOnInit(): void {
    this.parametro = this.router.url.substring(1, 12);

    const deviceInfo = this.deviceService.getDeviceInfo();

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

    this.infUser = this.authenticationService.getDecodedToken();

  }

  get cabecario(): string {
    const texto = this.mensagem ? 'Adiconar Proposta' : 'Editar Proposta';
    return texto;
  }

  salvar(): void {

    this.mensagem.severity = 'info';
    this.mensagem.summary = this.tituto;
    this.mensagem.detail = this.msg;
    // this.mensagem.icon = 'info';
    
    this.notificationService.enviarMessage(this.mensagem).subscribe(resultado => {
      this.limpar();
      console.log('A mensagem foi enviada com sucesso!')
    }); 

  }

  limpar() {
    this.mensagem = new Message();
  }

  isRole(role: string): boolean {
    return this.authenticationService.isRole(role);
  }

}
