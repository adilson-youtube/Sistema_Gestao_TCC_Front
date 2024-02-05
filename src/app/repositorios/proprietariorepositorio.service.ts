import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Proprietario } from '../modelo/entidades/prorietario';

@Injectable({
  providedIn: 'root'
})
export class ProprietariorepositorioService {
  baseUrl: string;

  constructor(private http: HttpClient) {
      this.baseUrl = `${environment.predefinidaUrl}`;
  }


//--- candidato -----
  listarProprietarios(): Observable<Array<Proprietario>> {
      const path = `Proprietario`;
      return this.http.get<Array<Proprietario>>(`${this.baseUrl}${path}`);
  }

  procurarProprietarioPorId(id: number): Observable<Proprietario> {
      const path = `Proprietario/${id}`;
      return this.http.get<Proprietario>(`${this.baseUrl}${path}`);
  }

  salvarProprietario(proprietario: Proprietario): Observable<Proprietario> {
      const path = `Proprietario`;
      return this.http.post<Proprietario>(`${this.baseUrl}${path}`, proprietario);
  }

  procurarProprietarioPorCodigo(codigo: string): Observable<Proprietario> {
      const path = `Proprietario/${codigo}`;
      return this.http.get<Proprietario>(`${this.baseUrl}${path}`);
  }

  actualizarProprietario(id: number, proprietario: Proprietario): Observable<Proprietario> {
    const path = `Servico/${id}`;
    return this.http.put<Proprietario>(`${this.baseUrl}${path}`, proprietario);
  }

  eliminarProprietario(id: number): Observable<Proprietario> {
    const path = `Servico/${id}`;
    return this.http.delete<Proprietario>(`${this.baseUrl}${path}`);
  }

//------
}
