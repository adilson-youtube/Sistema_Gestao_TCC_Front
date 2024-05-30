import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { TFC } from '../modelo/entidades/tfc';

@Injectable({
  providedIn: 'root'
})
export class TFCRepositorio {
  baseUrl: string;

  constructor(private http: HttpClient) {
    this.baseUrl = `${environment.predefinidaUrl}`;
  }

  //--- TFC 
  reportTFCs(): Observable<Blob> {
    const path = `TFC/TFCsReport`;
    return this.http.get<Blob>(`${this.baseUrl}${path}`);
  }

  //--- TFC 
  listarTFCs(): Observable<Array<TFC>> {
    const path = `TFC`;
    return this.http.get<Array<TFC>>(`${this.baseUrl}${path}`);
  }

  //--- TFC 
  ListarTFCsDefendidos(): Observable<Array<TFC>> {
    const path = `TFC/TFCsDefendidos`;
    return this.http.get<Array<TFC>>(`${this.baseUrl}${path}`);
  }

  //--- TFC
  ListarTFCsDisponiveisParaEstudante(): Observable<Array<TFC>> {
    const path = `TFC/TFCEstudante`;
    return this.http.get<Array<TFC>>(`${this.baseUrl}${path}`);
  }

  //--- TFC
  ListarTFCsDisponiveisParaProfessor(): Observable<Array<TFC>> {
    const path = `TFC/TFCProfessor`;
    return this.http.get<Array<TFC>>(`${this.baseUrl}${path}`);
  }

  //--- TFC
  TFCEstudante(id: number): Observable<Array<TFC>> {
    const path = `TFC/ParaEstudante/${id}`;
    return this.http.get<Array<TFC>>(`${this.baseUrl}${path}`);
  }

  //--- TFC
  TFCProfessor(id: number): Observable<Array<TFC>> {
    const path = `TFC/ParaProfessor/${id}`;
    return this.http.get<Array<TFC>>(`${this.baseUrl}${path}`);
  }

  procurarTFCPorId(id: number): Observable<TFC> {
    const path = `TFC/${id}`;
    return this.http.get<TFC>(`${this.baseUrl}${path}`);
  }

  salvarTFC(tfc: TFC): Observable<TFC> {
    const path = `TFC`;
    return this.http.post<TFC>(`${this.baseUrl}${path}`, tfc);
  }

  actualizarTFC(id: number, tfc: TFC): Observable<TFC> {
    const path = `TFC/${id}`;
    return this.http.put<TFC>(`${this.baseUrl}${path}`, tfc);
  }

  eliminarTFC(id: number): Observable<TFC> {
    const path = `TFC/${id}`;
    return this.http.delete<TFC>(`${this.baseUrl}${path}`);
  }


}
