import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { Proprietario } from 'src/app/modelo/entidades/prorietario';
import { ProprietarioservicoService } from 'src/app/servicos/proprietarioservico.service';
import { ProprietarioStep } from 'src/app/servicos/proprietariostep.service';

@Component({
  selector: 'app-dados-pessoais',
  templateUrl: './dados-pessoais.component.html',
  styleUrls: ['./dados-pessoais.component.css']
})
export class DadosPessoaisComponent implements OnInit {

  proprietario = new Proprietario();

  generoSelecionado: any = {};

  dateValue: Date = new Date;

  generos: any[] = [
      {name: 'Masculino', code: 'Masculino'},
      {name: 'Femenino', code: 'Femenino'}
  ];

  items: MenuItem[] = [];

  
  constructor(
    public proprietarioStep: ProprietarioStep,
    private router: Router,
    private proprietarioServico: ProprietarioservicoService
  ) { }

  ngOnInit(): void {
    this.proprietario = this.proprietarioStep.getProprietario();
  }

  proximo(): void {
    this.proprietario.genero = this.generoSelecionado.name;
    console.log(this.proprietario.genero)
    this.proprietarioStep.setProprietario(this.proprietario);
    this.router.navigate(['registarProrietario/animal']);
  }


  retroceder(): void {
    this.proprietarioStep.setProprietario(this.proprietario);
    this.router.navigate(['registarProrietario/acesso']);
  }

}
