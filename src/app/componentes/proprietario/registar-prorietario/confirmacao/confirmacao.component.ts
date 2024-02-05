import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem, MessageService } from 'primeng/api';
import { Animal } from 'src/app/modelo/entidades/animal';
import { Proprietario } from 'src/app/modelo/entidades/prorietario';
import { ProprietarioservicoService } from 'src/app/servicos/proprietarioservico.service';
import { ProprietarioStep } from 'src/app/servicos/proprietariostep.service';

@Component({
  selector: 'app-confirmacao',
  templateUrl: './confirmacao.component.html',
  styleUrls: ['./confirmacao.component.css'],
  providers: [MessageService]
})
export class ConfirmacaoComponent implements OnInit {

  nova = true;
  exibir = false;
  validar: boolean = false;

  proprietario = new Proprietario();
  animal = new Animal();

  generoSelecionado: any = {};

  dateValue: Date = new Date;

  generos: any[] = [
      {name: 'Macho', code: 'Macho'},
      {name: 'Femia', code: 'Femia'}
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

  // proximo(): void {
  //   this.proprietarioStep.setProprietario(this.proprietario);
  //   this.router.navigate(['registarUsuario/confirmacao']);
  // }


  retroceder(): void {
    this.proprietarioStep.setProprietario(this.proprietario);
    this.router.navigate(['registarProrietario/animal']);
  }

  get cabecario(): string {
    return (this.nova ? 'Registar' : 'Editar') + ' Animal';
  }

  salvar(): void {
    this.proprietario.genero = this.generoSelecionado.code;
    console.log("Os dados do Proprietario: "+JSON.stringify(this.proprietario));
    this.proprietarioServico.salvarProprietario(this.proprietario).subscribe( novo => {
      console.log("Novo Usuario Inserido! "+ novo);
    },
    error => {console.log("Erro "+error.message);});
  }

}
