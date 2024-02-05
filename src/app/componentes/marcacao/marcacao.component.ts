import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Animal } from 'src/app/modelo/entidades/animal';
import { Cirurgia } from 'src/app/modelo/entidades/cirurgia';
import { Consulta } from 'src/app/modelo/entidades/consulta';
import { Exame } from 'src/app/modelo/entidades/exame';
import { Marcacao } from 'src/app/modelo/entidades/marcacao';
import { Proprietario } from 'src/app/modelo/entidades/prorietario';
import { Servico } from 'src/app/modelo/entidades/servico';
import { Vacina } from 'src/app/modelo/entidades/vacina';
import { TipoPagamento } from 'src/app/modelo/enumerados/tipopagamento';
import { MarcacaoservicoService } from 'src/app/servicos/marcacaoservico.service';
import { ProprietarioservicoService } from 'src/app/servicos/proprietarioservico.service';
import { ServicosService } from 'src/app/servicos/servicos.service';

@Component({
  selector: 'app-marcacao',
  templateUrl: './marcacao.component.html',
  styleUrls: ['./marcacao.component.css'],
  providers: [MessageService]
})
export class MarcacaoComponent implements OnInit {

  servicos: Servico[];
  animais: Animal[];
  marcacao: Marcacao = new Marcacao();

  nova = true;
  exibir = false;
  validar: boolean = false;

  servicosSelecionados: Servico[];
  auxServicosSelecionados: Servico[];

  animalSelecionado: Animal;

  dataMarcacao: Date = new Date;


  constructor(
    private router: Router,
    private servicosService: ServicosService,
    private marcacaoServico: MarcacaoservicoService,
    private proprietarioService: ProprietarioservicoService,
    private messageService: MessageService) {
  }

  ngOnInit(): void {
    this.servicosService.listarServicos().subscribe(servicos => {
      this.servicos = servicos;
      console.log(this.servicos);
    });
    this.proprietarioService.listarProprietarios().subscribe(proprietario => {
      this.animais = proprietario[0]?.animais;
      console.log("Dados dos Animais: " + JSON.stringify(this.animais));
      console.log("Animal Selecionado: "+JSON.stringify(this?.animais[0].proprietario));
    });
  }

  testar() {
    this.servicosSelecionados.forEach(e => {

      console.log("O objecto: "+(e instanceof Consulta));



      // console.log("Serviços Selecionados "+JSON.stringify(e));

      console.log("Entrou no For: ");
      if (e instanceof Consulta) {
        this.auxServicosSelecionados.push(<Consulta>e);
        console.log("Entrou em Consulta!!!");
      } 
      else if(e instanceof Cirurgia) {
        this.auxServicosSelecionados.push(<Cirurgia>e);
        console.log("Entrou em Cirurgia!!!");

      } 
      else if(e instanceof Exame) {
        this.auxServicosSelecionados.push(<Exame>e);
        console.log("Entrou em Exame!!!");
        
      } 
      else if(e instanceof Vacina) {
        this.auxServicosSelecionados.push(<Vacina>e);
        console.log("Entrou em Vacina!!!");
      }
    });

    // console.log("Serviços Selecionados "+JSON.stringify(this.servicosSelecionados));

  }

  agendarServico() {
    this.marcacao.diaSemana = this.dataMarcacao;
    this.marcacao.diaMes = this.dataMarcacao;
    this.marcacao.ano = this.dataMarcacao;
    this.marcacao.animal = this.animalSelecionado;
    this.marcacao.servicos = this.servicosSelecionados;
    // this.marcacao.servicos = this.auxServicosSelecionados;


    this.marcacaoServico.salvarMarcacao(this.marcacao).subscribe(marcacao => {
      console.log("Marcação salva com Sucesso: " + marcacao);
    });
    
    //this.timeOut();
    //this.refresh();

  }

  timeOut() {
    setTimeout(() => { this.messageService.clear(); }, 30000);
  }

  mensagem(tipo: string, msg: string) {
    this.messageService.add({ severity: tipo, detail: msg });
  }

  limparCampos() {
    this.validar = false;
    //this.servico = null;
    // this.animal = new Animal();
  }

  refresh(): void {
    window.location.reload();
  }



}
