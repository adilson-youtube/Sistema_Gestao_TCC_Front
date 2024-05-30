import { Component, Input, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Encontro } from 'src/app/modelo/entidades/encontro';
import { AuthenticationService } from 'src/app/servicos/authentication.service';
import { EncontroService } from 'src/app/servicos/encontro.service';
import { TFCService } from 'src/app/servicos/tfc.service';

@Component({
  selector: 'app-detalhes-encontro',
  templateUrl: './detalhes-encontro.component.html',
  styleUrls: ['./detalhes-encontro.component.css']
})
export class DetalhesEncontroComponent implements OnInit {

  private _encontro: Encontro;
  
  userInfo: any;
  confirmacaoEstudante: boolean = false;
  confirmacaoProfessor: boolean = false;

  constructor(
    private encontroServico: EncontroService,
    private confirmationService: ConfirmationService,
    private tfcServico: TFCService,
    private authenticationService: AuthenticationService, 
    private messageService: MessageService

  ) { }

  ngOnInit(): void {
    
    this.getInfoUser();
  
    if(this.isRole("Coordenador")) {
      const id = Number(this.userInfo.id);
      this.tfcServico.TFCProfessor(id).subscribe( resultados => { 
        // this.tfcs = resultados; 
        // console.log("TFCs: "+JSON.stringify(this.tfcs));
        // this.tfcs.forEach(tfc => {
        //   this.estudantes.push(tfc.estudante);
        // });
      });
    } 

  }

  get encontro(): Encontro {
    return this._encontro;
  }

  @Input()
  set encontro(encontro: Encontro) {
    this._encontro = encontro; 
  }

  salvar(): void {
    
    const dataHoje = new Date(Date.now());
    const dataEncontro = new Date(this.encontro.data);
    
    if (this.encontro.id>=1) {
      if (dataHoje>=dataEncontro) {
        this.encontroServico.actualizarEncontro(this.encontro.id, this.encontro).subscribe(resultado => {
          this.notificacaoMsg("success", "Encontro", "O Encontro foi confirmado com Sucesso!");
          console.log("Entrou na função para actualizar Encontro!");
        });
      } else {
        this.notificacaoMsg("warn", "Encontro", "Só podes confirmar o Encontro na data que ocorreu ou posterior!");
      }
    }

  }

  getInfoUser() {
    this.userInfo = this.authenticationService.getDecodedToken();
  }

  isRole(role: string): boolean {
    return this.authenticationService.isRole(role);
  }

  notificacaoMsg(tipoNotificacao?: string, cabecario?: string, msg?: string) {
    this.messageService.add({severity: tipoNotificacao, summary:cabecario, detail: msg});
  }

  cancelar(): void {
  }

  isConfirmacaoEstudante(): boolean {
    return this.encontro.confirmacaoEstudante;
  }


//----- 
}
