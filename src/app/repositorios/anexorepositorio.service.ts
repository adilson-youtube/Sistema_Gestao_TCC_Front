
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import { Anexo } from '../modelo/entidades/Anexo';

@Injectable({
  providedIn: 'root'
})
export class AnexoRepositorio {
  baseUrl: string;

  constructor(private http: HttpClient) {
    this.baseUrl = `${environment.predefinidaUrl}`;
  }

  //--- Marcacão
  listarAnexos(): Observable<Array<Anexo>> {
    const path = `Anexo`;
    return this.http.get<Array<Anexo>>(`${this.baseUrl}${path}`);
  }

  procurarAnexoPorId(id: number): Observable<Anexo> {
    const path = `Anexo/${id}`;
    return this.http.get<Anexo>(`${this.baseUrl}${path}`);
  }

  salvarAnexo(anexo: Anexo): Observable<Anexo> {
    const path = `Anexo`;
    return this.http.post<Anexo>(`${this.baseUrl}${path}`, anexo);
  }

  actualizarAnexo(id: number, anexo: Anexo): Observable<Anexo> {
    const path = `Anexo/${id}`;
    return this.http.put<Anexo>(`${this.baseUrl}${path}`, anexo);
  }

  eliminarAnexo(id: number): Observable<Anexo> {
    const path = `Anexo/${id}`;
    return this.http.delete<Anexo>(`${this.baseUrl}${path}`);
  }


}