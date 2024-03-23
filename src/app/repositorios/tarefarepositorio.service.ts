import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Tarefa } from '../modelo/entidades/tarefa';

@Injectable({
  providedIn: 'root'
})
export class TarefaRepositorio {
  baseUrl: string;

  constructor(private http: HttpClient) {
    this.baseUrl = `${environment.predefinidaUrl}`;
  }

  //--- Marcacão
  listarTarefas(): Observable<Array<Tarefa>> {
    const path = `Tarefa`;
    return this.http.get<Array<Tarefa>>(`${this.baseUrl}${path}`);
  }

  procurarTarefaPorId(id: number): Observable<Tarefa> {
    const path = `Tarefa/${id}`;
    return this.http.get<Tarefa>(`${this.baseUrl}${path}`);
  }

  salvarTarefa(tarefa: Tarefa): Observable<Tarefa> {
    const path = `Tarefa`;
    return this.http.post<Tarefa>(`${this.baseUrl}${path}`, tarefa);
  }

  actualizarTarefa(id: number, tarefa: Tarefa): Observable<Tarefa> {
    const path = `Tarefa/${id}`;
    return this.http.put<Tarefa>(`${this.baseUrl}${path}`, tarefa);
  }

  eliminarTarefa(id: number): Observable<Tarefa> {
    const path = `Tarefa/${id}`;
    return this.http.delete<Tarefa>(`${this.baseUrl}${path}`);
  }


}
