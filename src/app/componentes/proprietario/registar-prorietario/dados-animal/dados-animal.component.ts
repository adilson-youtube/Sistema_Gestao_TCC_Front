import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem, MessageService } from 'primeng/api';
import { Animal } from 'src/app/modelo/entidades/animal';
import { Proprietario } from 'src/app/modelo/entidades/prorietario';
import { ProprietarioservicoService } from 'src/app/servicos/proprietarioservico.service';
import { ProprietarioStep } from 'src/app/servicos/proprietariostep.service';

@Component({
  selector: 'app-dados-animal',
  templateUrl: './dados-animal.component.html',
  styleUrls: ['./dados-animal.component.css'],
  providers: [MessageService]
})
export class DadosAnimalComponent implements OnInit {

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
    private proprietarioServico: ProprietarioservicoService,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    // this.proprietario.animais
    this.proprietario = this.proprietarioStep.getProprietario();
  }

  proximo(): void {
    this.proprietarioStep.setProprietario(this.proprietario);
    this.router.navigate(['registarProrietario/confirmacao']);
  }


  retroceder(): void {
    this.proprietarioStep.setProprietario(this.proprietario);
    this.router.navigate(['registarProrietario/pessoais']);
  }

  get cabecario(): string {
    return (this.nova ? 'Registar' : 'Editar') + ' Animal';
  }

  modal(animal?: Animal): void  {
    this.nova = animal ? false : true;
    this.animal = this.nova ? new Animal() : animal ?? new Animal();
    this.exibir = true;
    this.validar = false;
  }

  cancelar(): void  {
    this.exibir = false;
    this.validar = false;
    this.animal = new Animal();
  }

  salvar(): void  {
    this.validar = true;
    // this.filiacao.riId = this.ri.id;
    let lista = this.proprietario.animais.find(a => a.nome?.toUpperCase() === this.animal.nome?.toUpperCase())?.nome;

    if (this.nova) {
      if (!lista) {
        this.animal.sexo = this.generos[0].name;
        this.proprietario.animais.unshift(this.animal); 
        this.limparCampos();
        this.mensagem('success', 'Animal registado com sucesso');
        // this.timeOut();
      } else {
        this. mensagem('warn', 'Animal já encontra-se registado');
        // this.timeOut();
      }
    }

    // if (this.filiacao.denominacao && this.filiacao.riId) {
    //   if (this.nova) {
    //     if (!lista) {
    //       this.riServico.salvarFiliacao(this.filiacao).subscribe( novafiliacao => {
    //         this.filiacoes.unshift(novafiliacao); 
    //         this.limparCampos();
    //         this.mensagem('success', 'Filiação registada com sucesso');
    //         this.timeOut();
    //       });
    //     } else {
    //       this. mensagem('warn', 'Filiação já encontra-se registada');
    //       this.timeOut();
    //     }
    //   } else {
    //     this.riServico.salvarFiliacao(this.filiacao).subscribe( editarfiliacao => {
    //       this.limparCampos(); this.exibir = false;
    //     });
    //   }
    // }
    
  }

  timeOut(){
    setTimeout(() =>{ this.messageService.clear(); }, 30000);
  }

  mensagem(tipo: string, msg: string){
    this.messageService.add({severity: tipo, detail: msg});
  }

  limparCampos() {
    this.validar = false;
    this.animal = new Animal();
  }

}
