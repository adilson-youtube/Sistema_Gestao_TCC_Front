
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import { Banca } from '../modelo/entidades/banca';

@Injectable({
  providedIn: 'root'
})
export class BancaRepositorio {
  baseUrl: string;

  constructor(private http: HttpClient) {
    this.baseUrl = `${environment.predefinidaUrl}`;
  }

  //--- Marcacão
  listarBancas(): Observable<Array<Banca>> {
    const path = `Banca`;
    return this.http.get<Array<Banca>>(`${this.baseUrl}${path}`);
  }

  listarBancasPorIdEstudante(id: number): Observable<Array<Banca>> {
    const path = `Banca/BancasPorIdEstudante/${id}`;
    return this.http.get<Array<Banca>>(`${this.baseUrl}${path}`);
  }

  listarBancasPorIdProfessor(id: number): Observable<Array<Banca>> {
    const path = `Banca/BancasPorIdProfessor/${id}`;
    return this.http.get<Array<Banca>>(`${this.baseUrl}${path}`);
  }

  procurarBancaPorId(id: number): Observable<Banca> {
    const path = `Banca/${id}`;
    return this.http.get<Banca>(`${this.baseUrl}${path}`);
  }

  salvarBanca(banca: Banca): Observable<Banca> {
    const path = `Banca`;
    return this.http.post<Banca>(`${this.baseUrl}${path}`, banca);
  }

  actualizarBanca(id: number, banca: Banca): Observable<Banca> {
    const path = `Banca/${id}`;
    return this.http.put<Banca>(`${this.baseUrl}${path}`, banca);
  }

  eliminarBanca(id: number): Observable<Banca> {
    const path = `Banca/${id}`;
    return this.http.delete<Banca>(`${this.baseUrl}${path}`);
  }


}
