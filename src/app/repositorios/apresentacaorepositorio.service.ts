
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import { Apresentacao } from '../modelo/entidades/apresentacao';

@Injectable({
  providedIn: 'root'
})
export class ApresentacaoRepositorio {
  baseUrl: string;

  constructor(private http: HttpClient) {
    this.baseUrl = `${environment.predefinidaUrl}`;
  }

  //--- Marcacão
  listarApresentacoes(): Observable<Array<Apresentacao>> {
    const path = `Apresentacao`;
    return this.http.get<Array<Apresentacao>>(`${this.baseUrl}${path}`);
  }

  procurarApresentacaoPorId(id: number): Observable<Apresentacao> {
    const path = `Apresentacao/${id}`;
    return this.http.get<Apresentacao>(`${this.baseUrl}${path}`);
  }

  salvarApresentacao(anexo: Apresentacao): Observable<Apresentacao> {
    const path = `Apresentacao`;
    return this.http.post<Apresentacao>(`${this.baseUrl}${path}`, anexo);
  }

  actualizarApresentacao(id: number, anexo: Apresentacao): Observable<Apresentacao> {
    const path = `Apresentacao/${id}`;
    return this.http.put<Apresentacao>(`${this.baseUrl}${path}`, anexo);
  }

  eliminarApresentacao(id: number): Observable<Apresentacao> {
    const path = `Apresentacao/${id}`;
    return this.http.delete<Apresentacao>(`${this.baseUrl}${path}`);
  }


}
