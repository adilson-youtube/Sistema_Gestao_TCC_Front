import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import { Regulamento } from '../modelo/entidades/regulamento';

@Injectable({
  providedIn: 'root'
})
export class RegulamentoRepositorio {
  baseUrl: string;

  constructor(private http: HttpClient) {
    this.baseUrl = `${environment.predefinidaUrl}`;
  }

  //--- Marcacão
  listarRegulamentos(): Observable<Array<Regulamento>> {
    const path = `Regulamento`;
    return this.http.get<Array<Regulamento>>(`${this.baseUrl}${path}`);
  }

  procurarRegulamentoPorId(id: number): Observable<Regulamento> {
    const path = `Regulamento/${id}`;
    return this.http.get<Regulamento>(`${this.baseUrl}${path}`);
  }

  salvarRegulamento(regulamento: Regulamento): Observable<Regulamento> {
    const path = `Regulamento`;
    return this.http.post<Regulamento>(`${this.baseUrl}${path}`, regulamento);
  }

  actualizarRegulamento(id: number, regulamento: Regulamento): Observable<Regulamento> {
    const path = `Regulamento/${id}`;
    return this.http.put<Regulamento>(`${this.baseUrl}${path}`, regulamento);
  }

  eliminarRegulamento(id: number): Observable<Regulamento> {
    const path = `Regulamento/${id}`;
    return this.http.delete<Regulamento>(`${this.baseUrl}${path}`);
  }


}
