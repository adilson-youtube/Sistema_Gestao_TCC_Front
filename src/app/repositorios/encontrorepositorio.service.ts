import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Encontro } from '../modelo/entidades/encontro';

@Injectable({
  providedIn: 'root'
})
export class EncontroRepositorio {
  baseUrl: string;

  constructor(private http: HttpClient) {
    this.baseUrl = `${environment.predefinidaUrl}`;
  }

  //--- Marcacão
  listarEncontros(): Observable<Array<Encontro>> {
    const path = `Encontro`;
    return this.http.get<Array<Encontro>>(`${this.baseUrl}${path}`);
  }

  procurarEncontroPorId(id: number): Observable<Encontro> {
    const path = `Encontro/${id}`;
    return this.http.get<Encontro>(`${this.baseUrl}${path}`);
  }

  salvarEncontro(estudante: Encontro): Observable<Encontro> {
    const path = `Encontro`;
    return this.http.post<Encontro>(`${this.baseUrl}${path}`, estudante);
  }

  actualizarEncontro(id: number, estudante: Encontro): Observable<Encontro> {
    const path = `Encontro/${id}`;
    return this.http.put<Encontro>(`${this.baseUrl}${path}`, estudante);
  }

  eliminarEncontro(id: number): Observable<Encontro> {
    const path = `Encontro/${id}`;
    return this.http.delete<Encontro>(`${this.baseUrl}${path}`);
  }


}
