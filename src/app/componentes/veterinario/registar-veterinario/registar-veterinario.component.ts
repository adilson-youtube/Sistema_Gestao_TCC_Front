import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { VeterinarioStep } from 'src/app/servicos/veterinariostep.service';

@Component({
  selector: 'app-registar-veterinario',
  templateUrl: './registar-veterinario.component.html',
  styleUrls: ['./registar-veterinario.component.css']
})
export class RegistarVeterinarioComponent implements OnInit {

  items: MenuItem[] = [];

  constructor(public veterinarioStep: VeterinarioStep) { }

  ngOnInit(): void {
    this.items = [
      {
        label: 'Informações de Acesso',
        routerLink: 'acesso-veterinario'
      },
      {
        label: 'Informações Pessoais',
        routerLink: 'pessoais-veterinario'
      },
      {
        label: 'Confirmação',
        routerLink: 'confirmacao-veterinario'
      }
    ];

  }

}
