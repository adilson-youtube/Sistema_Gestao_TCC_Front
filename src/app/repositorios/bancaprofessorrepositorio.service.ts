
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import { BancaProfessor } from '../modelo/entidades/bancaprofessor';

@Injectable({
  providedIn: 'root'
})
export class BancaProfessorRepositorio {
  baseUrl: string;

  constructor(private http: HttpClient) {
    this.baseUrl = `${environment.predefinidaUrl}`;
  }

  //--- Marcacão
  listarBancasProfessores(): Observable<Array<BancaProfessor>> {
    const path = `BancaProfessor`;
    return this.http.get<Array<BancaProfessor>>(`${this.baseUrl}${path}`);
  }

  procurarBancaProfessorPorId(id: number): Observable<BancaProfessor> {
    const path = `BancaProfessor/${id}`;
    return this.http.get<BancaProfessor>(`${this.baseUrl}${path}`);
  }

  salvarBancaProfessor(bancaProfessor: BancaProfessor): Observable<BancaProfessor> {
    const path = `BancaProfessor`;
    return this.http.post<BancaProfessor>(`${this.baseUrl}${path}`, bancaProfessor);
  }

  actualizarBancaProfessor(id: number, bancaProfessor: BancaProfessor): Observable<BancaProfessor> {
    const path = `BancaProfessor/${id}`;
    return this.http.put<BancaProfessor>(`${this.baseUrl}${path}`, bancaProfessor);
  }

  eliminarBancaProfessor(id: number): Observable<BancaProfessor> {
    const path = `BancaProfessor/${id}`;
    return this.http.delete<BancaProfessor>(`${this.baseUrl}${path}`);
  }


}
