import { Injectable } from '@angular/core';
import { RegulamentoRepositorio } from '../repositorios/regulamentorepositorio.service';
import { Regulamento } from '../modelo/entidades/regulamento';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegulamentoService {

  constructor(private repositorio: RegulamentoRepositorio) { }

  //-- Regulamento
  listarRegulamentos(): Observable<Array<Regulamento>> {
        return this.repositorio.listarRegulamentos();
    }

    procurarRegulamentoPorId(codigo: number): Observable<Regulamento> {
        return this.repositorio.procurarRegulamentoPorId(codigo);
    }
  
    salvarRegulamento(regulamento: Regulamento): Observable<Regulamento> {
        return this.repositorio.salvarRegulamento(regulamento);
    }
  
    actualizarRegulamento(id: number, regulamento: Regulamento): Observable<Regulamento> {
        return this.repositorio.actualizarRegulamento(id, regulamento);
    }
  
    eliminarRegulamento(id: number): Observable<Regulamento> {
        return this.repositorio.eliminarRegulamento(id);
    }

}
