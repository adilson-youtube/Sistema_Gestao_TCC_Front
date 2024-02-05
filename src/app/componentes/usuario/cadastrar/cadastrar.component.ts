import { Component, OnInit } from '@angular/core';
import { MenuItem, MessageService } from 'primeng/api';
import { Proprietario } from 'src/app/modelo/entidades/prorietario';
import { Usuario } from 'src/app/modelo/entidades/usuario';
import { ProprietarioservicoService } from 'src/app/servicos/proprietarioservico.service';
import { UsuarioServico } from 'src/app/servicos/usuario.service';
import { VeterinarioStep } from 'src/app/servicos/veterinariostep.service';

@Component({
  selector: 'app-cadastrar',
  templateUrl: './cadastrar.component.html',
  providers: [MessageService],
  styleUrls: ['./cadastrar.component.css']
})
export class CadastrarComponent implements OnInit {

  items: MenuItem[] = [];

  constructor(public veterinarioStep: VeterinarioStep) {  }

  ngOnInit(): void {
    this.items = [
      {
        label: 'Informações de Acesso',
        routerLink: 'usuario'
      },
      {
        label: 'Informações Pessoais',
        routerLink: 'proprietario'
      } ,
      {
        label: 'Informações do Animal',
        routerLink: 'animal'
      },
      {
        label: 'Confirmação',
        routerLink: 'confirmacao'
      }
    ];
   
  }

}
