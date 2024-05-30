
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import { Estudante } from '../modelo/entidades/estudante';

@Injectable({
  providedIn: 'root'
})
export class EstudanteRepositorio {
  baseUrl: string;

  constructor(private http: HttpClient) {
    this.baseUrl = `${environment.predefinidaUrl}`;
  }

  //--- Marcacão
  listarEstudantes(): Observable<Array<Estudante>> {
    const path = `Estudante`;
    return this.http.get<Array<Estudante>>(`${this.baseUrl}${path}`);
  }

  //--- Marcacão
  ListarEstudantesTFCsFinalizados(): Observable<Array<Estudante>> {
    const path = `Estudante/EstudantesTFCsFinalizados`;
    return this.http.get<Array<Estudante>>(`${this.baseUrl}${path}`);
  }

  procurarEstudantePorId(id: number): Observable<Estudante> {
    const path = `Estudante/${id}`;
    return this.http.get<Estudante>(`${this.baseUrl}${path}`);
  }

  salvarEstudante(estudante: Estudante): Observable<Estudante> {
    const path = `Estudante`;
    return this.http.post<Estudante>(`${this.baseUrl}${path}`, estudante);
  }

  actualizarEstudante(id: number, estudante: Estudante): Observable<Estudante> {
    const path = `Estudante/${id}`;
    return this.http.put<Estudante>(`${this.baseUrl}${path}`, estudante);
  }

  eliminarEstudante(id: number): Observable<Estudante> {
    const path = `Estudante/${id}`;
    return this.http.delete<Estudante>(`${this.baseUrl}${path}`);
  }


}
