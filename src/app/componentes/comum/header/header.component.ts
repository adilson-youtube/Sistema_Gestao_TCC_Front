import { AuthenticationService } from 'src/app/servicos/authentication.service';
import { Router } from '@angular/router';
import { Component, OnInit, Input, EventEmitter, Output, ViewChild } from '@angular/core';
import { MatAccordion } from '@angular/material/expansion';
import { Observable, Subscription } from 'rxjs';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { map, shareReplay } from 'rxjs/operators';
// import { Notificacao } from 'src/app/modelo/entidades/notificacao';
import { NotificacaoService } from 'src/app/servicos/notificacao.service';
import {Message, MessageService} from 'primeng//api';
import { Messages } from 'primeng/messages';
import { BadgeDirective } from 'primeng/badge';
import { TFCService } from 'src/app/servicos/tfc.service';
import { TFC } from 'src/app/modelo/entidades/tfc';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  providers: [MessageService]
})
export class HeaderComponent implements OnInit {

  @Input()
  deviceXs: boolean;
  @Input()
  deviceSm: boolean;
  @Input()
  deviceMd: boolean;
  @Input()
  deviceLg: boolean;

  showMenu: boolean = true;
  showHamburguerMenu: boolean = false;
  @Output()
  showMenuChanger = new EventEmitter();

  visibleSidebar: boolean = false;
  showPerfil: boolean = false;
  showNotificacoes: boolean = false;
  showNotifications: boolean = false;

  // notificacoes: any[];
  // notificacao: any;
  notificacoesSelecionadas: any[];
  subscription: Subscription;
  // notificacao = new Notificacao();
  notificacoes = new Array<Message>();
  quantNotificacoes = 0;
  msgs: Message[] = [];
  userInfo: any;
  tfcInfo = new TFC();
  tfcs: Array<TFC>;

  changePassword: boolean = false;

  @ViewChild('mensagemComponent') componentMensagem: Messages;
  @ViewChild('mensagemComponent') componentBadge: BadgeDirective;

  constructor(private authenticationService: AuthenticationService, private notificationService: NotificacaoService, 
    private messageService: MessageService, private router: Router, private tfcServico: TFCService) {
    this.subscription = this.notificationService.getNotifications().subscribe(
      (notification) => {
        // console.log("Entrou no serviço de Notificações!"+ JSON.stringify(notification));
        // console.log("O Objecto enviado é "+ notification.Menssagem);
        // let no = JSON.parse(notification);
        // this.notifications.push(notification);
        this.notificacoes.unshift(notification);
        // this.msgs.push(notification);
        console.log("Array de Notificações"+JSON.stringify(this.msgs));
        console.log("Vereficando as notificações!");
        this.quantNotificacoes = this.notificacoes.length;
        this.msgs = this.notificacoes;
        this.componentMensagem.cd.detectChanges();
        // this.componentBadge.el.nativeElement = this.notificacoes;
      },
      (error) => {
        console.error('Erro ao receber notificação:', error);
      }
    );

    this.getInfoUser();

    if(this.isRole("Estudante")) {
      const id = Number(this.userInfo.id);
      this.tfcServico.TFCEstudante(id).subscribe( resultados => { 
        this.tfcs = resultados; 
        this.tfcInfo = resultados.slice().shift();
        console.log("TFCs: "+JSON.stringify(this.tfcs));
      });
    }

  }

  ngOnInit() {
    this.authenticationService.showHamburguerMenu.subscribe(
      show => {
        // this.showHamburguerMenu = !this.showHamburguerMenu;
        if (show===true) {
          this.showHamburguerMenu = true;
          // alert('Valor da variavel show: '+show);
        } else {
          this.showHamburguerMenu = false;
        }
      }
    );
  }

  alternar() {
    this.showMenu = !this.showMenu;
    this.showMenuChanger.emit({ novoValor: this.showMenu });
  }

  hideElement() {
    if (this.deviceXs === true || this.deviceSm === true) {
      return false;
    }
    return true;
  }

  infoUser(): boolean {
    this.showPerfil = true
    return this.showPerfil;
  }

  infoNotifications(): boolean {
    this.showNotifications = true
    this.showViaService();
    return this.showNotifications;
  }

  showViaService() {
      this.messageService.add({severity:'success', summary:'Service Message', detail:'Via MessageService'});
  }

  activeOrDesativePasswordInput(){
    this.changePassword = !this.changePassword;
  }

  logOut() {
    this.authenticationService.logout();
  }

  isRole(role: string): boolean {
    return this.authenticationService.isRole(role);
  }

  getInfoUser() {
    this.userInfo = this.authenticationService.getDecodedToken();
  }


}
