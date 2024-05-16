
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import { Correcao } from '../modelo/entidades/correcao';

@Injectable({
  providedIn: 'root'
})
export class CorrecaoRepositorio {
  baseUrl: string;

  constructor(private http: HttpClient) {
    this.baseUrl = `${environment.predefinidaUrl}`;
  }

  //--- Correção
  listarCorrecoes(): Observable<Array<Correcao>> {
    const path = `Correcao`;
    return this.http.get<Array<Correcao>>(`${this.baseUrl}${path}`);
  }

  ListarCorrecoesBanca(idBanca: number): Observable<Array<Correcao>> {
    const path = `Correcao/CorrecoesBanca/${idBanca}`;
    return this.http.get<Array<Correcao>>(`${this.baseUrl}${path}`);
  }

  procurarCorrecaoPorId(id: number): Observable<Correcao> {
    const path = `Correcao/${id}`;
    return this.http.get<Correcao>(`${this.baseUrl}${path}`);
  }

  salvarCorrecao(correcao: Correcao): Observable<Correcao> {
    const path = `Correcao`;
    return this.http.post<Correcao>(`${this.baseUrl}${path}`, correcao);
  }

  actualizarCorrecao(id: number, correcao: Correcao): Observable<Correcao> {
    const path = `Correcao/${id}`;
    return this.http.put<Correcao>(`${this.baseUrl}${path}`, correcao);
  }

  eliminarCorrecao(id: number): Observable<Correcao> {
    const path = `Correcao/${id}`;
    return this.http.delete<Correcao>(`${this.baseUrl}${path}`);
  }


}