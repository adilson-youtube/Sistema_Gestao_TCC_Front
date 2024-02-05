import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { ProprietarioStep } from 'src/app/servicos/proprietariostep.service';

@Component({
  selector: 'app-registar-prorietario',
  templateUrl: './registar-prorietario.component.html',
  styleUrls: ['./registar-prorietario.component.css']
})
export class RegistarProrietarioComponent implements OnInit {

  items: MenuItem[] = [];

  constructor(public proprietarioStep: ProprietarioStep) { }

  ngOnInit(): void {
    this.items = [
      {
        label: 'Informações de Acesso',
        routerLink: 'acesso'
      },
      {
        label: 'Informações Pessoais',
        routerLink: 'pessoais'
      },
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