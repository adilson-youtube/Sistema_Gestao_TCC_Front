import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from '../modelo/entidades/usuario';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsuarioRepositorioService {
  baseUrl: string;

  constructor(private http: HttpClient) {
      this.baseUrl = `${environment.predefinidaUrl}/`;
  }


//--- candidato -----
  listarUsuarios(): Observable<Array<Usuario>> {
      const path = `usuarios`;
      return this.http.get<Array<Usuario>>(`${this.baseUrl}${path}`);
  }

  salvarUsuario(usuario: Usuario): Observable<Usuario> {
      const path = `usuario`;
      return this.http.post<Usuario>(`${this.baseUrl}${path}`, usuario, { headers : new HttpHeaders({
        'Content-Type': 'application/json' })});
  }

  procurarUsuarioPorId(codigo: number): Observable<Usuario> {
      const path = `usuario/${codigo}`;
      return this.http.get<Usuario>(`${this.baseUrl}${path}`);
  }

  procurarUsuarioPorCodigo(codigo: string): Observable<Usuario> {
      const path = `usuario/${codigo}`;
      return this.http.get<Usuario>(`${this.baseUrl}${path}`);
  }

//------
}
