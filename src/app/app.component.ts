import { Component, EventEmitter, Output, Input, OnInit, OnDestroy, HostListener } from '@angular/core';

// import { HeaderComponent } from "./components/template/header/header.component";
// import { NavComponent } from "./components/template/nav/nav.component";
// import { FooterComponent } from "./components/template/footer/footer.component";

import { MediaObserver, MediaChange } from '@angular/flex-layout';
import { Subscription, Observable } from 'rxjs';
import { AuthenticationService } from './servicos/authentication.service';
import { Traducao } from './modelo/traducoes/traducao';

import { PrimeNGConfig, Translation } from 'primeng/api';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Sistema de Gestão de TCC';

  @Input()
  showMenu: boolean = false;

  showAllMenu: boolean = true;
  showlogin: boolean = false;
  showNav: boolean = false;
  showregister: boolean = false;

  mediaSub: Subscription;
  deviceXs: boolean;
  deviceSm: boolean;
  deviceMd: boolean;
  deviceLg: boolean;

  translation = new Traducao;


  constructor(private authenticationService: AuthenticationService, public mediaObserver: MediaObserver, private config: PrimeNGConfig, private route: ActivatedRoute) { }

  ngOnInit() {
    // this.authenticationService.login();
    this.authenticationService.showAllMenu.subscribe(
      show => {
        console.log("Valor Enviado - "+show);
        this.showAllMenu = show;
    }
    );
    this.authenticationService.showMenuEmitter.subscribe(
      show => this.showAllMenu = show
    );
    this.authenticationService.showNav.subscribe(
      show => this.showMenu = show
    );
    this.authenticationService.showRegisterEmitter.subscribe(
      register => this.showregister = register
    );
    this.authenticationService.showLoginEmitter.subscribe(
      login => this.showlogin = login
    );
    this.mediaSub = this.mediaObserver.media$.subscribe(
      (result: MediaChange) => {
      console.log(result.mqAlias);
      this.deviceXs = result.mqAlias === 'xs' ? true : false;
      this.deviceSm = result.mqAlias === 'sm' ? true : false;
      this.deviceMd = result.mqAlias === 'md' ? true : false;
      this.deviceLg = result.mqAlias === 'lg' ? true : false;

    });

    this.config.setTranslation(this.translation.translation);

    this.showAllMenu = this.route.snapshot.params['showAllMenu'];
    // this.showAllMenu = this.route.;

  }

  ngOnDestroy() {
    this.authenticationService.showMenuEmitter.unsubscribe();
    this.authenticationService.showRegisterEmitter.unsubscribe();
    this.authenticationService.showLoginEmitter.unsubscribe();
    this.mediaSub.unsubscribe();
  }


  receberValor(evento) {
    this.showMenu = evento.novoValor;
    // alert('O valor é: '+this.showMenu);
  }

  showLogin(): boolean {
    if (this.showlogin && !this.showAllMenu) {
      return true;
    } else if((this.showlogin && this.showAllMenu)||(!this.showlogin && this.showAllMenu)||(!this.showlogin && !this.showAllMenu)) {
      // this.ngOnDestroy();
      return false;
    }
  }

  mostrarMenu(): boolean {
    if (this.authenticationService.viewRouta) {
      return true;
    } else if((this.showlogin && this.showAllMenu)||(!this.showlogin && this.showAllMenu)||(!this.showlogin && !this.showAllMenu)) {
      // this.ngOnDestroy();
      return false;
    }
  }

  showRegister(): boolean {
    if (this.showregister && !this.showAllMenu) {
      return true;
    } else {
      // this.ngOnDestroy();
      return false;
    }
  }

  @HostListener('keydown.control.0', ['$event'])
  loginAdmin(){
    this.authenticationService.autenticar();
  }

}
