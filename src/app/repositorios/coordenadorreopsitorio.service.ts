import { Injectable } from '@angular/core';
import { Coordenador } from '../modelo/entidades/coordenador';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CoordenadorReopsitorio {
  baseUrl: string;

  constructor(private http: HttpClient) {
    this.baseUrl = `${environment.predefinidaUrl}`;
  }

  //--- Marcacão
  listarCoordenadores(): Observable<Array<Coordenador>> {
    const path = `Coordenador`;
    return this.http.get<Array<Coordenador>>(`${this.baseUrl}${path}`);
  }

  procurarCoordenadorPorId(id: number): Observable<Coordenador> {
    const path = `Coordenador/${id}`;
    return this.http.get<Coordenador>(`${this.baseUrl}${path}`);
  }

  salvarCoordenador(estudante: Coordenador): Observable<Coordenador> {
    const path = `Coordenador`;
    return this.http.post<Coordenador>(`${this.baseUrl}${path}`, estudante);
  }

  actualizarCoordenador(id: number, estudante: Coordenador): Observable<Coordenador> {
    const path = `Coordenador/${id}`;
    return this.http.put<Coordenador>(`${this.baseUrl}${path}`, estudante);
  }

  eliminarCoordenador(id: number): Observable<Coordenador> {
    const path = `Coordenador/${id}`;
    return this.http.delete<Coordenador>(`${this.baseUrl}${path}`);
  }


}
