import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/servicos/authentication.service';
import { trigger, transition, style, animate } from '@angular/animations';
import { MessageService, ConfirmationService } from 'primeng/api';
import { Usuario } from 'src/app/modelo/entidades/usuario';
import { HttpErrorResponse } from '@angular/common/http';

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

  // usuario: string;
  // senha: string;
  usuario: Usuario = new Usuario;


  constructor(private authenticationService: AuthenticationService, private messageService: MessageService) {
    this.authenticationService.showMenuEmitter.emit(false);
    this.authenticationService.showAllMenu.emit(false);
    this.authenticationService.showNav.emit(false);
    this.authenticationService.showLoginEmitter.emit(true);
   }

  ngOnInit(): void {

  }

  login(){
    this.authenticationService.login(this.usuario).subscribe((userToken) => {
      this.authenticationService.userToken = userToken;
      if (this.authenticationService.userToken!=null || this.authenticationService.userToken?.token!='') {
        this.authenticationService.isAuthenticated = true;
        localStorage.setItem("jwt", this.authenticationService.userToken.token)
        this.authenticationService.router.navigate(['']);
        // return true;
      } else {
        this.mostraMsg("Erro de violação do sistema!");
        // return false;
      }
    }, 
    (Erro: HttpErrorResponse) => {
      // console.log("Inicio do Erro: "+Erro.error+" Fim do Erro!");
      this.mostraMsg(Erro.error);
    })

    
    
    
    // if (this.usuario==='adilson' && this.senha==='Adilson.2024') {
    //   this.authenticationService.isAuthenticated = true;
    //   this.authenticationService.login();
    // } else {
    //   this.mostraMsg();
    // }
    // this.router.navigate(['login']);
    // this.authenticationService.viewRouta = false;
    // this.authenticationService.isAuthenticated = true;
  }

  register(){
    this.authenticationService.register();
  }

  mostraMsg(msg: string) {
    this.messageService.add({severity:'error', summary:'Erro de Login', detail: msg});
  }

}
