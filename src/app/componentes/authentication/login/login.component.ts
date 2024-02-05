import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/servicos/authentication.service';
import { trigger, transition, style, animate } from '@angular/animations';
import { MessageService, ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers:[ConfirmationService, MessageService],
  animations: [
    trigger('fade', [
      transition('void => *', [
        style({ opacity: 0 }),
        animate(1000)
      ]),
      transition('* => void', [
        style({ opacity: 0 }),
        animate(1000)
      ])
    ])
  ]
})
export class LoginComponent implements OnInit {

  usuario: string;
  senha: string;


  constructor(private authenticationService: AuthenticationService, private messageService: MessageService) {
    this.authenticationService.showMenuEmitter.emit(false);
    this.authenticationService.showAllMenu.emit(false);
    this.authenticationService.showNav.emit(false);
    this.authenticationService.showLoginEmitter.emit(true);
   }

  ngOnInit(): void {

  }

  login(){
    if (this.usuario==='DSICS' && this.senha==='Sinse.2021') {
      this.authenticationService.isAuthenticated = true;
      this.authenticationService.login();
    } else {
      this.mostraMsg();
    }
    // this.router.navigate(['login']);
    // this.authenticationService.viewRouta = false;
    // this.authenticationService.isAuthenticated = true;
  }

  register(){
    this.authenticationService.register();
  }

  mostraMsg() {
    this.messageService.add({severity:'error', summary:'Erro de Login', detail:'O Usuário ou Senha está errado!'});
  }

}
