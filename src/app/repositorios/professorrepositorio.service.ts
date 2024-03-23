import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import { Professor } from '../modelo/entidades/professor';

@Injectable({
  providedIn: 'root'
})
export class ProfessorRepositorio {
  baseUrl: string;

  constructor(private http: HttpClient) {
    this.baseUrl = `${environment.predefinidaUrl}`;
  }

  //--- Marcacão
  listarProfessores(): Observable<Array<Professor>> {
    const path = `Professor`;
    return this.http.get<Array<Professor>>(`${this.baseUrl}${path}`);
  }

  procurarProfessorPorId(id: number): Observable<Professor> {
    const path = `Professor/${id}`;
    return this.http.get<Professor>(`${this.baseUrl}${path}`);
  }

  salvarProfessor(estudante: Professor): Observable<Professor> {
    const path = `Professor`;
    return this.http.post<Professor>(`${this.baseUrl}${path}`, estudante);
  }

  actualizarProfessor(id: number, estudante: Professor): Observable<Professor> {
    const path = `Professor/${id}`;
    return this.http.put<Professor>(`${this.baseUrl}${path}`, estudante);
  }

  eliminarProfessor(id: number): Observable<Professor> {
    const path = `Professor/${id}`;
    return this.http.delete<Professor>(`${this.baseUrl}${path}`);
  }


}
