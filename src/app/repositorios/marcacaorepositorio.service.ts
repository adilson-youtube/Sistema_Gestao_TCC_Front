import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Marcacao } from '../modelo/entidades/marcacao';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MarcacaorepositorioService {
  baseUrl: string;

  constructor(private http: HttpClient) {
    this.baseUrl = `${environment.predefinidaUrl}`;
  }

  //--- Marcacão
  listarMarcacoes(): Observable<Array<Marcacao>> {
    const path = `Servico`;
    return this.http.get<Array<Marcacao>>(`${this.baseUrl}${path}`);
  }

  procurarMarcacaoPorId(id: number): Observable<Marcacao> {
    const path = `Marcacao/${id}`;
    return this.http.get<Marcacao>(`${this.baseUrl}${path}`);
  }

  salvarMarcacao(marcacao: Marcacao): Observable<Marcacao> {
    const path = `Marcacao`;
    return this.http.post<Marcacao>(`${this.baseUrl}${path}`, marcacao);
  }

  actualizarMarcacao(id: number, marcacao: Marcacao): Observable<Marcacao> {
    const path = `Servico/${id}`;
    return this.http.put<Marcacao>(`${this.baseUrl}${path}`, marcacao);
  }

  eliminarMarcacao(id: number): Observable<Marcacao> {
    const path = `Servico/${id}`;
    return this.http.delete<Marcacao>(`${this.baseUrl}${path}`);
  }


}
