import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CorrecaoRepositorio } from '../repositorios/correcaorepositorio.service';
import { Correcao } from '../modelo/entidades/correcao';

@Injectable({
  providedIn: 'root'
})
export class CorrecaoService {

  constructor(private repositorio: CorrecaoRepositorio) { }

  //-- Correcao
  listarCorrecoes(): Observable<Array<Correcao>> {
        return this.repositorio.listarCorrecoes();
    }

    ListarCorrecoesBanca(idBanca: number): Observable<Array<Correcao>> {
          return this.repositorio.ListarCorrecoesBanca(idBanca);
      }

    procurarCorrecaoPorId(codigo: number): Observable<Correcao> {
        return this.repositorio.procurarCorrecaoPorId(codigo);
    }
  
    salvarCorrecao(correcao: Correcao): Observable<Correcao> {
        return this.repositorio.salvarCorrecao(correcao);
    }
  
    actualizarCorrecao(id: number, correcao: Correcao): Observable<Correcao> {
        return this.repositorio.actualizarCorrecao(id, correcao);
    }
  
    eliminarCorrecao(id: number): Observable<Correcao> {
        return this.repositorio.eliminarCorrecao(id);
    }

}
