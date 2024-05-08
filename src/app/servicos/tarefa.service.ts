import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Tarefa } from '../modelo/entidades/tarefa';
import { TarefaRepositorio } from '../repositorios/tarefarepositorio.service';

@Injectable({
    providedIn: 'root'
})
export class TarefaService {

    constructor(private repositorio: TarefaRepositorio) { }

    //-- Tarefa
    listarTarefas(): Observable<Array<Tarefa>> {
        return this.repositorio.listarTarefas();
    }

    listarTarefasEstudante(id: number): Observable<Array<Tarefa>> {
        return this.repositorio.listarTarefasEstudante(id);
    }

    listarTarefasTFC(id: number): Observable<Array<Tarefa>> {
        return this.repositorio.listarTarefasTFC(id);
    }

    procurarTarefaPorId(codigo: number): Observable<Tarefa> {
        return this.repositorio.procurarTarefaPorId(codigo);
    }

    salvarTarefa(tarefa: Tarefa): Observable<Tarefa> {
        return this.repositorio.salvarTarefa(tarefa);
    }

    actualizarTarefa(id: number, tarefa: Tarefa): Observable<Tarefa> {
        return this.repositorio.actualizarTarefa(id, tarefa);
    }

    eliminarTarefa(id: number): Observable<Tarefa> {
        return this.repositorio.eliminarTarefa(id);
    }

}
