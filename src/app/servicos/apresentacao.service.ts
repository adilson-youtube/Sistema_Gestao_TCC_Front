import { Injectable } from '@angular/core';
import { ApresentacaoRepositorio } from '../repositorios/apresentacaorepositorio.service';
import { Apresentacao } from '../modelo/entidades/apresentacao';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApresentacaoService {

  constructor(private repositorio: ApresentacaoRepositorio) { }

  //-- Apresentacao
  listarApresentacoes(): Observable<Array<Apresentacao>> {
        return this.repositorio.listarApresentacoes();
    }

    procurarApresentacaoPorId(codigo: number): Observable<Apresentacao> {
        return this.repositorio.procurarApresentacaoPorId(codigo);
    }
  
    salvarApresentacao(apresentacao: Apresentacao): Observable<Apresentacao> {
        return this.repositorio.salvarApresentacao(apresentacao);
    }
  
    actualizarApresentacao(id: number, apresentacao: Apresentacao): Observable<Apresentacao> {
        return this.repositorio.actualizarApresentacao(id, apresentacao);
    }
  
    eliminarApresentacao(id: number): Observable<Apresentacao> {
        return this.repositorio.eliminarApresentacao(id);
    }

}
