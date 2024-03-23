import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Usuario } from '../modelo/entidades/usuario';
import { UserToken } from '../modelo/entidades/userToken';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationRepositorio {
  baseUrl: string;

  constructor(private http: HttpClient) {
    this.baseUrl = `${environment.predefinidaUrl}`;
  }

  //--- Marcacão
  /* listarUsuarios(): Observable<Array<Usuario>> {
    const path = `Usuario`;
    return this.http.get<Array<Usuario>>(`${this.baseUrl}${path}`);
  } */

  /* procurarUsuarioPorId(id: number): Observable<Usuario> {
    const path = `Usuario/${id}`;
    return this.http.get<Usuario>(`${this.baseUrl}${path}`);
  } */

  login(usuario: Usuario): Observable<UserToken> {
    const path = `Autenticacao/Login`;
    return this.http.post<UserToken>(`${this.baseUrl}${path}`, usuario);
  }

  /* actualizarUsuario(id: number, usuario: Usuario): Observable<Usuario> {
    const path = `Usuario/${id}`;
    return this.http.put<Usuario>(`${this.baseUrl}${path}`, usuario);
  }

  eliminarUsuario(id: number): Observable<Usuario> {
    const path = `Usuario/${id}`;
    return this.http.delete<Usuario>(`${this.baseUrl}${path}`);
  } */


}
