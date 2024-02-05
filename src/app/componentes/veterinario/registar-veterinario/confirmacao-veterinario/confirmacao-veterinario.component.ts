import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { Veterinario } from 'src/app/modelo/entidades/veterinario';
import { VeterinarioservicoService } from 'src/app/servicos/veterinarioservico.service';
import { VeterinarioStep } from 'src/app/servicos/veterinariostep.service';

@Component({
  selector: 'app-confirmacao-veterinario',
  templateUrl: './confirmacao-veterinario.component.html',
  styleUrls: ['./confirmacao-veterinario.component.css']
})
export class ConfirmacaoVeterinarioComponent implements OnInit {

  veterinario = new Veterinario();

  generoSelecionado: any = {};

  dateValue: Date = new Date;

  generos: any[] = [
      {name: 'Masculino', code: 'Masculino'},
      {name: 'Femenino', code: 'Femenino'}
  ];

  items: MenuItem[] = [];

  
  constructor(
    public veterinarioStep: VeterinarioStep,
    private router: Router,
    private veterinarioServico: VeterinarioservicoService
  ) { }

  ngOnInit(): void {
    this.veterinario = this.veterinarioStep.getVeterinario();
  }


  retroceder(): void {
    this.veterinarioStep.setVeterinario(this.veterinario);
    this.router.navigate(['registarVeterinario/pessoais-veterinario']);
  }

  salvar(): void {
    this.veterinario.genero = this.generoSelecionado.code;
    console.log("Os dados do Veterinario: "+JSON.stringify(this.veterinario));
    this.veterinarioServico.salvarVeterinario(this.veterinario).subscribe( novo => {
      console.log("Novo Veterinario Inserido! "+ novo);
    },
    error => {console.log("Erro "+error.message);});
  }

  
}
