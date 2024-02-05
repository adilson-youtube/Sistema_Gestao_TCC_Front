import { Injectable } from '@angular/core';
import { UsuarioRepositorioService } from '../repositorios/usuariorepositorio.service';
import { Usuario } from '../modelo/entidades/usuario';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioServico {

  constructor(private repositorio: UsuarioRepositorioService) { }

//-- Órgão
  listarUsuarios(): Observable<Array<Usuario>> {
      return this.repositorio.listarUsuarios();
  }

  procurarUsuarioPorId(id: number): Observable<Usuario> {
      return this.repositorio.procurarUsuarioPorId(id);
  }

//-- Área
  procurarAreaPorId(codigo: string): Observable<Usuario> {
      return this.repositorio.procurarUsuarioPorCodigo(codigo);
  }

  salvarUsuario(usuario: Usuario): Observable<Usuario> {
      return this.repositorio.salvarUsuario(usuario);
  }
}
