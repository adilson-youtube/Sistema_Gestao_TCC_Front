import { AuthenticationService } from 'src/app/servicos/authentication.service';
import { Router } from '@angular/router';
import { Component, OnInit, Input, EventEmitter, Output, ViewChild } from '@angular/core';
import { MatAccordion } from '@angular/material/expansion';
import { Observable } from 'rxjs';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { map, shareReplay } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
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
  showNotifications: boolean = false;

  notificacoes: any[];
  notificacao: any;
  notificacoesSelecionadas: any[];

  changePassword: boolean = false;

  constructor(private authenticationService: AuthenticationService, private router: Router) {
    this.notificacoes = [
      { id: 1, assunto: "esadgfdsgfds aedsegfdsfdsf edsafdsaf", descricao: "dsf DSICS dsagfdfdsfdfds fdsbvfcxbv esadgfdsgfds aedsegfdsfdsf edsafdsaf" },
      { id: 2, assunto: "esadgfdsgfds aedsegfdsfdsf edsafdsaf", descricao: "dsf DSICS dsagfdfdsfdfds fdsbvfcxbv esadgfdsgfds aedsegfdsfdsf edsafdsaf" },
      { id: 3, assunto: "esadgfdsgfds aedsegfdsfdsf edsafdsaf", descricao: "dsf DSICS dsagfdfdsfdfds fdsbvfcxbv esadgfdsgfds aedsegfdsfdsf edsafdsaf" },
      { id: 4, assunto: "esadgfdsgfds aedsegfdsfdsf edsafdsaf", descricao: "dsf DSICS dsagfdfdsfdfds fdsbvfcxbv esadgfdsgfds aedsegfdsfdsf edsafdsaf" }
    ];

    this.notificacoesSelecionadas = [
      { id: 1, assunto: "esadgfdsgfds aedsegfdsfdsf edsafdsaf", descricao: "dsf DSICS dsagfdfdsfdfds fdsbvfcxbv esadgfdsgfds aedsegfdsfdsf edsafdsaf" },
      { id: 4, assunto: "esadgfdsgfds aedsegfdsfdsf edsafdsaf", descricao: "dsf DSICS dsagfdfdsfdfds fdsbvfcxbv esadgfdsgfds aedsegfdsfdsf edsafdsaf" },
    ];

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
    return this.showNotifications;
  }

  activeOrDesativePasswordInput(){
    this.changePassword = !this.changePassword;
  }


}
