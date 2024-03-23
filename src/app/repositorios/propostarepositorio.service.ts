import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Proposta } from '../modelo/entidades/proposta';

@Injectable({
  providedIn: 'root'
})
export class PropostaRepositorio {
  baseUrl: string;

  constructor(private http: HttpClient) {
    this.baseUrl = `${environment.predefinidaUrl}`;
  }

  //--- Marcacão
  listarPropostas(): Observable<Array<Proposta>> {
    const path = `Proposta`;
    return this.http.get<Array<Proposta>>(`${this.baseUrl}${path}`);
  }

  procurarPropostaPorId(id: number): Observable<Proposta> {
    const path = `Proposta/${id}`;
    return this.http.get<Proposta>(`${this.baseUrl}${path}`);
  }

  salvarProposta(proposta: Proposta): Observable<Proposta> {
    const path = `Proposta`;
    return this.http.post<Proposta>(`${this.baseUrl}${path}`, proposta);
  }

  actualizarProposta(id: number, proposta: Proposta): Observable<Proposta> {
    const path = `Proposta/${id}`;
    return this.http.put<Proposta>(`${this.baseUrl}${path}`, proposta);
  }

  eliminarProposta(id: number): Observable<Proposta> {
    const path = `Proposta/${id}`;
    return this.http.delete<Proposta>(`${this.baseUrl}${path}`);
  }


}
