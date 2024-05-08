import { Component, Input, OnInit } from '@angular/core';
import { Tarefa } from 'src/app/modelo/entidades/tarefa';
import { EstadoTarefa } from 'src/app/modelo/enumerados/estadoTarefa';

@Component({
  selector: 'app-detalhes-tarefa',
  templateUrl: './detalhes-tarefa.component.html',
  styleUrls: ['./detalhes-tarefa.component.css']
})
export class DetalhesTarefaComponent implements OnInit {

  private _tarefa: Tarefa;

  estadoTarefaSelecionado: EstadoTarefa;

  constructor() { }

  ngOnInit(): void { }

  get tarefa(): Tarefa {
    return this._tarefa;
  }

  @Input()
  set tarefa(tarefa: Tarefa) {
    this._tarefa = tarefa; 
  }

//----- 
}
