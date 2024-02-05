import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem, MessageService } from 'primeng/api';
import { Cirurgia } from 'src/app/modelo/entidades/cirurgia';
import { Consulta } from 'src/app/modelo/entidades/consulta';
import { Exame } from 'src/app/modelo/entidades/exame';
import { Marcacao } from 'src/app/modelo/entidades/marcacao';
import { Servico } from 'src/app/modelo/entidades/servico';
import { Vacina } from 'src/app/modelo/entidades/vacina';
import { TipoPagamento } from 'src/app/modelo/enumerados/tipopagamento';
import { ServicosService } from 'src/app/servicos/servicos.service';

@Component({
  selector: 'app-servicos',
  templateUrl: './servicos.component.html',
  styleUrls: ['./servicos.component.css'],
  providers: [MessageService]
})
export class ServicosComponent implements OnInit {

  nova = true;
  exibir = false;
  validar: boolean = false;

  servicos: Servico[];

  listaServicos: Array<Servico> = new Array<Servico>();

  tiposServicos: any[] = [
    { name: "Consulta", code: "Consulta" },
    { name: 'Cirurgia', code: 'Cirurgia' },
    { name: 'Exame', code: 'Exame' },
    { name: 'Vacina', code: 'Vacina' }
  ];
  servico: Servico = new Consulta();
  // animal = new Animal();


  cirurgia: Servico = new Cirurgia();
  exame: Servico = new Exame();
  consulta: Servico = new Consulta();
  vacina: Servico = new Vacina();

  tipoPagamentoSelecionado: TipoPagamento;
  servicoSelecionado: any = {};

  dateValue: Date = new Date;

  tiposPagamentos: any[] = [
    { name: 'Cash', code: 0 },
    { name: 'Cartão', code: 1 },
    { name: 'Carteira Digital', code: 2 }
  ];

  // generos: any[] = [
  //     {name: 'Macho', code: 'Macho'},
  //     {name: 'Femia', code: 'Femia'}
  // ];

  items: MenuItem[] = [];


  constructor(
    private router: Router,
    private servicosService: ServicosService,
    private messageService: MessageService
  ) {
    // this.cirurgia.preco = 94000; this.cirurgia.tipoServico = "Cirurgia Abdominal";
    // this.exame.preco = 49000; this.exame.tipoServico = "Exame Geral";
    // this.consulta.preco = 34000; this.consulta.tipoServico = "Consulta Externa";
    // this.vacina.preco = 11000; this.vacina.tipoServico = "Vacina Periodica";

    // this.servicos = [
    //   this.cirurgia, this.exame, this.consulta, this.vacina
    // ];
  }

  ngOnInit(): void {
    this.servicosService.listarServicos().subscribe(servicos => {
      this.servicos = servicos;
      console.log(this.servicos);
    });
  }

  get cabecario(): string {
    return (this.nova ? 'Registar' : 'Editar') + ' Serviço';
  }

  salvarServico() {
    this.servicosService.salvarConsulta(this.consulta).subscribe(res => {
      console.log("Consulta salva com Sucesso: " + res);
    });
  }

  modal(servico?: Servico): void {
    this.nova = servico ? false : true;
    this.servico = this.nova ? new Consulta() : servico ?? new Consulta();
    this.exibir = true;
    this.validar = false;
    console.log("Dados da Consulta: " + JSON.stringify(this.servico));
  }

  cancelar(): void {
    this.exibir = false;
    this.validar = false;
    this.servico = null;
    // this.animal = new Animal();
  }

  salvar(): void {
    this.validar = true;

    // this.servico.tipoServico = servicoDialogo.;
    this.servico.tipoPagamento = this.tipoPagamentoSelecionado;
    let lista = this.servicos.find(a => a.tipoServico?.toUpperCase() === this.servico.tipoServico?.toUpperCase())?.tipoServico;
    // let lista = this.servicos.find(a => console.log("Dados da Consulta: "+JSON.stringify(a)));
    // console.log("Dados da Consulta: "+JSON.stringify(this.servico));
    // console.log("Lista de Consulta: "+JSON.stringify(lista));

    // this.listaServicos.unshift(this.servico);

    
    // this.servicosService.salvarServicoLista(this.listaServicos).subscribe(res => {
    //   console.log("Serviço salvo com Sucesso: " + res);
    //   this.limparCampos();
    //   this.mensagem('success', 'Serviço registado com sucesso');
    //   this.timeOut();
    //   this.refresh();
    // });

    if (this.nova) {
      if (!lista) {
        switch (this.servicoSelecionado) {
          case 'Consulta': {
            this.servicosService.salvarConsulta(this.servico).subscribe(res => {
              console.log("Consulta salva com Sucesso: " + res);
              this.limparCampos();
              this.mensagem('success', 'Serviço registado com sucesso');
              this.timeOut();
              this.refresh();
            });

            break;
          }
          case 'Cirurgia': {
            this.servicosService.salvarCirurgia(this.servico).subscribe(res => {
              console.log("Consulta salva com Sucesso: " + res);
              this.limparCampos();
              this.mensagem('success', 'Serviço registado com sucesso');
              this.timeOut();
              this.refresh();
            });

            break;
          }
          case 'Exame': {
            this.servicosService.salvarExame(this.servico).subscribe(res => {
              console.log("Consulta salva com Sucesso: " + res);
              this.limparCampos();
              this.mensagem('success', 'Serviço registado com sucesso');
              this.timeOut();
              this.refresh();
            });

            break;
          }
          case 'Vacina': {
            this.servicosService.salvarVacina(this.servico).subscribe(res => {
              console.log("Consulta salva com Sucesso: " + res);
              this.limparCampos();
              this.mensagem('success', 'Serviço registado com sucesso');
              this.timeOut();
              this.refresh();
            });

            break;
          }
          default:
            break;
        }
      } else {
        this.mensagem('warn', 'Serviço já encontra-se registado');
        this.timeOut();
      }
    }

  }

  timeOut() {
    setTimeout(() => { this.messageService.clear(); }, 30000);
  }

  mensagem(tipo: string, msg: string) {
    this.messageService.add({ severity: tipo, detail: msg });
  }

  limparCampos() {
    this.validar = false;
    this.servico = null;
    // this.animal = new Animal();
  }

  refresh(): void {
    window.location.reload();
  }

}
