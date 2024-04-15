import { Injectable } from '@angular/core';
import { PropostaRepositorio } from '../repositorios/propostarepositorio.service';
import { Proposta } from '../modelo/entidades/proposta';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PropostaService {

  constructor(private repositorio: PropostaRepositorio) { }

  //-- Proposta
  listarPropostas(): Observable<Array<Proposta>> {
        return this.repositorio.listarPropostas();
    }

  //-- Proposta
  ListarPropostasDisponiveisParaEstudante(): Observable<Array<Proposta>> {
        return this.repositorio.ListarPropostasDisponiveisParaEstudante();
    }

  //-- Proposta
  ListarPropostasDisponiveisParaProfessor(): Observable<Array<Proposta>> {
        return this.repositorio.ListarPropostasDisponiveisParaProfessor();
    }

    //-- Proposta
    PropostaEstudante(id: number): Observable<Array<Proposta>> {
          return this.repositorio.PropostaEstudante(id);
      }
  
    //-- Proposta
    PropostaProfessor(id: number): Observable<Array<Proposta>> {
          return this.repositorio.PropostaProfessor(id);
      }

    procurarPropostaPorId(codigo: number): Observable<Proposta> {
        return this.repositorio.procurarPropostaPorId(codigo);
    }
  
    salvarProposta(proposta: Proposta): Observable<Proposta> {
        return this.repositorio.salvarProposta(proposta);
    }
  
    actualizarProposta(id: number, proposta: Proposta): Observable<Proposta> {
        return this.repositorio.actualizarProposta(id, proposta);
    }
  
    eliminarProposta(id: number): Observable<Proposta> {
        return this.repositorio.eliminarProposta(id);
    }

}
